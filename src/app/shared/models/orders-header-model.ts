export interface OrdersHeaderModel {
    idOrder: number;
    idCustomer: number;
    idProvider: number;
    idClienteAddress: number;
    description: string;
    idCategory: number;
    idSubcategory: number;
    creationDate: Date;
    executiondate: Date;
    closingDate: Date;
    idStatus: number;
    satisfactionLever: string;
    customerObservation: string; 
}
