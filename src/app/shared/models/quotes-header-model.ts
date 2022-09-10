export interface QuotesHeaderModel {
    idQuoteHeader: number;
    idQuoteDetail: number;
    idCustomer: number;
    idProvder: number;
    idClienteAddress: number;
    description: string;
    idCategory: number;
    idSubCategory: number;
    creationDate: Date;
    assignmentDate: Date;
    idStatus: number;
    customerObservation: string;
    providerObervation: string;
    idStatusCreationdate: number;
}
