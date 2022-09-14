export interface OrdersHeaderModel {
    idOrder: number;
    idCustomer: number;
    idProvider: number;
    idClientAddress: number;
    description: string;
    idCategory: number;
    idSubCategory: number;
    creationDate: Date;
    executionDate: Date;
    closingDate: Date;
    idStatus: number;
    satisfactionLevel: string;
    customerObservation: string; 
}
