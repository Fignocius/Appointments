import { Workbook } from 'exceljs';
import * as Excel from 'exceljs/dist/exceljs.min.js';

export interface Column {
  key: string;
  header: string;
  style?: object;
  width?: number;
  render?: (k: string, i: number, r: object) => string | number | boolean;
}

export function fromTable(
  wsName: string,
  columns: Array<Column>,
  table: Array<{ [k: string]: string | number | boolean | null }>
): Promise<Workbook> {
  return new Promise((resolve, reject) => {
    let workbook = new Excel.Workbook();
    workbook.creator = 'Timeview';
    workbook.created = new Date();
    let worksheet = workbook.addWorksheet(wsName);
    const defaultStyle: object = {};
    worksheet.columns = columns.map((c) => ({ ...c, style: c.style ? c.style : defaultStyle }));

    table.forEach((p, i) => {
      let row = {};
      columns.forEach((c, i) => {
        row[c.key] = p[c.key];
        if (c.render) {
          row[c.key] = c.render(c.key, i, p);
        }
      });
      worksheet.addRow(row);
    });

    let colRow = worksheet.getRow(1);
    colRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF313E51' }
    };
    colRow.font = {
      color: { argb: 'FFFFFFFF' }
    };
    resolve(workbook);
  });
}
