/* eslint-disable import/prefer-default-export */
import xlsx from 'json-as-xlsx';
import { salesTransactionType } from '../types';

type dataArrType = {
    sheet: string,
    columns: {
        label: 'Amount'
        | 'Debit Account'
        | 'Pay Ref'
        | 'Reply'
        | 'Sales Date'
        | 'TID'
        | 'Vendor Id'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any
    }[],
    content: salesTransactionType[]
}[]

const returnData = (content: salesTransactionType[]) => {
  let data: dataArrType = [
    {
      sheet: 'Sales Transactions',
      columns: [
        { label: 'Amount', value: (row: salesTransactionType) => row.amount },
        { label: 'Debit Account', value: (row: salesTransactionType) => row.debitaccount },
        { label: 'Pay Ref', value: (row: salesTransactionType) => row.payref },
        { label: 'Sales Date', value: (row: salesTransactionType) => row.salesdate },
        { label: 'TID', value: (row: salesTransactionType) => row.tid },
        { label: 'Reply', value: (row: salesTransactionType) => row.reply },
        { label: 'Vendor Id', value: (row: salesTransactionType) => row.vendorid },
      ],
      content,
    },
  ];
  return data;
};

let settings = {
  fileName: `vvarenasales${new Date()}`, // Name of the resulting spreadsheet
  extraLength: 3, // A bigger number means that columns will be wider
  writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
};

export const proceedDownloadExcel = async (content: salesTransactionType[]) => {
  const data = await returnData(content);
  await xlsx(data, settings); // Will download the excel file
};
