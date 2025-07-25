export class Offer {
    id: number;
    discountPercentage: number;
    enabled: boolean | null;
    createdAt: Date;
    endDate: Date;
    updatedAt: Date;
    
    constructor(id: number, discountPercentage: number, enabled: boolean | null, createdAt: Date, endDate: Date, updatedAt: Date) {
        this.id = id;
        this.discountPercentage = discountPercentage;
        this.enabled = enabled;
        this.createdAt = createdAt;
        this.endDate = endDate;
        this.updatedAt = updatedAt;
    }
    
    disable(): void {
        this.endDate = new Date();
        this.enabled = false;
    }
}