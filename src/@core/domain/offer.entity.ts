export class Offer {
    id: number;
    discountPercentage: number;
    enabled: boolean | null;
    createdAt: Date;
    endDate: Date;
    updatedAt: Date;
    
    constructor(discountPercentage: number, createdAt: Date, endDate: Date, updatedAt: Date) {
        this.discountPercentage = discountPercentage;
        this.createdAt = createdAt;
        this.endDate = endDate;
        this.updatedAt = updatedAt;
    }
    
    disable(): void {
        this.endDate = new Date();
        this.enabled = false;
    }
}