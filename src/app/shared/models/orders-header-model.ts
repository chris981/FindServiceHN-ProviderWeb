export interface OrdersHeaderModel {
    IdOrder: number;
    IdCustomer: number;
    IdProvider: number;
    IdClienteAddress: number;
    Description: string;
    IdCategory: number;
    IdSubcategory: number;
    CreationDate: Date;
    Executiondate: Date;
    ClosingDate: Date;
    IdStatus: number;
    SatisfactionLever: string;
    CustomerObservation: string; 
}
