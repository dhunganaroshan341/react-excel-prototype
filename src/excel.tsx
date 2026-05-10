import { useState } from "react";

type Row = {
  title: string;
  link: string;
  total_cost: string;
  total_price: string;
};

export default function App() {
  const [rows, setRows] = useState<Row[]>([
    { title: "", link: "", total_cost: "", total_price: "" },
  ]);

  const handleChange = (
    index: number,
    field: keyof Row,
    value: string
  ) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { title: "", link: "", total_cost: "", total_price: "" },
    ]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">BOQ Sheet</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Link</th>
              <th className="border p-2">Cost</th>
              <th className="border p-2">Price</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {Object.keys(row).map((field) => (
                  <td key={field} className="border p-1">
                    <input
                      value={row[field as keyof Row]}
                      onChange={(e) =>
                        handleChange(
                          i,
                          field as keyof Row,
                          e.target.value
                        )
                      }
                      className="w-full p-1 outline-none"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addRow}
        className="mt-4 bg-green-600 text-white px-4 py-2"
      >
        + Add Row
      </button>
    </div>
  );
}