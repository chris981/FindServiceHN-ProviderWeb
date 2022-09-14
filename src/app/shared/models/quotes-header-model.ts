export interface QuotesHeaderModel {
    idQuoteHeader: number;
    idQuoteDetail: number;
    idCustomer: number;
    idProvider: number;
    idClientAddres: number;
    description: string;
    idCategory: number;
    idSubcategory: number;
    creationDate: Date;
    assigmentDate: Date;
    idStatus: number;
    customerObservation: string;
    providerObservation: string;
    idStatusCreationDate: number;
}
