import { ColumnDefTemplate, HeaderContext } from "@tanstack/react-table";
import { utils } from "xlsx";

export const jsonToCsv = <T,>(
  columns: {
    id: string;
    header: ColumnDefTemplate<HeaderContext<T, unknown>> | undefined;
  }[],
  data: Record<string, unknown>[]
): string => {
  const headers = columns.map((col) => col.header);

  const rows = data.map((row) =>
    columns.map((col) => {
      const accessor = col.id;
      const value = row[accessor];
      return value;
    })
  );
  const worksheet = utils.aoa_to_sheet([headers, ...rows]);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const csv = "\uFEFF" + utils.sheet_to_csv(worksheet);
  return csv;
};

export const downloadCsv = <T,>(
  filename: string,
  columns: {
    id: string;
    header: ColumnDefTemplate<HeaderContext<T, unknown>> | undefined;
  }[],
  data: Record<string, unknown>[]
) => {
  const csv = jsonToCsv(columns, data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};