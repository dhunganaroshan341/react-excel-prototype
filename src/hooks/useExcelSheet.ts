import { useState } from "react";
import * as XLSX from "xlsx";

export default function useExcelSheet() {
  const [sheets, setSheets] = useState<any[]>(
    []
  );

  const [activeSheet, setActiveSheet] =
    useState(0);

  const [columnWidths, setColumnWidths] =
    useState<Record<number, number>>({});

  const [rowHeights, setRowHeights] =
    useState<Record<number, number>>({});

  // =========================
  // Upload
  // =========================
  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const buffer = await file.arrayBuffer();

    const workbook = XLSX.read(buffer);

    const parsedSheets =
      workbook.SheetNames.map((name) => {
        const ws = workbook.Sheets[name];

        const rows =
          XLSX.utils.sheet_to_json(ws, {
            header: 1,
            defval: "",
          });

        return {
          name,
          rows,
        };
      });

    setSheets(parsedSheets);
    setActiveSheet(0);
  };

  // =========================
  // Update Cell
  // =========================
  const updateCell = (
    rowIndex: number,
    cellIndex: number,
    value: string
  ) => {
    const updated = [...sheets];

    updated[activeSheet].rows[rowIndex][
      cellIndex
    ] = value;

    setSheets(updated);
  };

  // =========================
  // Insert Row
  // =========================
  const insertRow = (rowIndex: number) => {
    const updated = [...sheets];

    const colCount =
      updated[activeSheet].rows[0]?.length ||
      1;

    updated[activeSheet].rows.splice(
      rowIndex,
      0,
      Array(colCount).fill("")
    );

    setSheets(updated);
  };

  // =========================
  // Insert Column
  // =========================
  const insertColumn = (
    columnIndex: number
  ) => {
    const updated = [...sheets];

    updated[activeSheet].rows =
      updated[activeSheet].rows.map(
        (row: any[]) => {
          const newRow = [...row];

          newRow.splice(columnIndex, 0, "");

          return newRow;
        }
      );

    setSheets(updated);
  };

  // =========================
  // Export
  // =========================
  const exportExcel = () => {
    const workbook = XLSX.utils.book_new();

    sheets.forEach((sheet) => {
      const ws = XLSX.utils.aoa_to_sheet(
        sheet.rows
      );

      XLSX.utils.book_append_sheet(
        workbook,
        ws,
        sheet.name
      );
    });

    XLSX.writeFile(workbook, "edited.xlsx");
  };

  // =========================
  // Resize Column
  // =========================
  const startResizeColumn = (
    e: React.MouseEvent,
    colIndex: number
  ) => {
    e.preventDefault();

    const startX = e.clientX;

    const startWidth =
      columnWidths[colIndex] || 140;

    const onMouseMove = (
      moveEvent: MouseEvent
    ) => {
      const newWidth = Math.max(
        80,
        startWidth +
          (moveEvent.clientX - startX)
      );

      setColumnWidths((prev) => ({
        ...prev,
        [colIndex]: newWidth,
      }));
    };

    const onMouseUp = () => {
      window.removeEventListener(
        "mousemove",
        onMouseMove
      );

      window.removeEventListener(
        "mouseup",
        onMouseUp
      );
    };

    window.addEventListener(
      "mousemove",
      onMouseMove
    );

    window.addEventListener(
      "mouseup",
      onMouseUp
    );
  };

  // =========================
  // Resize Row
  // =========================
  const startResizeRow = (
    e: React.MouseEvent,
    rowIndex: number
  ) => {
    e.preventDefault();

    const startY = e.clientY;

    const startHeight =
      rowHeights[rowIndex] || 40;

    const onMouseMove = (
      moveEvent: MouseEvent
    ) => {
      const newHeight = Math.max(
        30,
        startHeight +
          (moveEvent.clientY - startY)
      );

      setRowHeights((prev) => ({
        ...prev,
        [rowIndex]: newHeight,
      }));
    };

    const onMouseUp = () => {
      window.removeEventListener(
        "mousemove",
        onMouseMove
      );

      window.removeEventListener(
        "mouseup",
        onMouseUp
      );
    };

    window.addEventListener(
      "mousemove",
      onMouseMove
    );

    window.addEventListener(
      "mouseup",
      onMouseUp
    );
  };

  return {
    sheets,
    activeSheet,
    setActiveSheet,
    handleUpload,
    updateCell,
    insertRow,
    insertColumn,
    exportExcel,
    columnWidths,
    rowHeights,
    startResizeColumn,
    startResizeRow,
  };
}