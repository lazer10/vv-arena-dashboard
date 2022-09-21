export type vendorType = {
    phone: string
    sales: number
    statusid: number
    vendorid: number
    vendorname: string
};

export type salesTransactionType = {
    amount: number
    debitaccount: string
    payref: string
    reply: string
    salesdate: string
    tid: string
    vendorid: number
}

export type newVendorObject = {
    vendorname: string
    phone: string
    sales: string
    statusid: number
}
