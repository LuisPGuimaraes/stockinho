export type CreateOfferMessage = {

  operationId: number,
  items: [
    {
      name: string,
      level: string,
      shift: string,
      kind: string,
      universityOffers: [
        {
          enrollmentSemester: string,
          fullPrice: number,
          maxPayments: number
        }
      ],
      offers: [
        {
          discountPercentage: number,
          offeredPrice: number,
          start: Date,
          end: Date
        }
      ]
    }
  ]
};