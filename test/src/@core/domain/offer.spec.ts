import { Offer } from "src/@core/domain/offer.entity";

describe ('offer test', () => {
	let today: Date;

	beforeEach(() => {
		today = new Date();
	});
	it('should create a offer', () => {
		const offer = new Offer(1, 10, true, today, new Date('09-20-2029'), today);
		expect(offer.id).toBe(1);
		expect(offer.discountPercentage).toBe(10);
		expect(offer.enabled).toBe(true);
		expect(offer.createdAt).toBeInstanceOf(Date);
		expect(offer.endDate).toBeInstanceOf(Date);
		expect(offer.endDate).toEqual(new Date('09-20-2029'));
		expect(offer.updatedAt).toBeInstanceOf(Date);
	});


	it('should disable the offer', () => {
		const offer = new Offer(1, 10, true, today, new Date('09-20-2029'), today);
		offer.disable();
		expect(offer.enabled).toBe(false);
		expect(offer.endDate).toEqual(today);
	});
})