export const getColumnName = (
  index: number
) => {
  let name = "";
  let num = index;

  while (num >= 0) {
    name =
      String.fromCharCode(
        (num % 26) + 65
      ) + name;

    num = Math.floor(num / 26) - 1;
  }

  return name;
};