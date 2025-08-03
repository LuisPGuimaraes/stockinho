export const config = {
	database: {
		type: 'mysql', // ou 'postgres'
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT || 3306),
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		poolSize: Number(process.env.DB_POOL_SIZE || 10),
	},
	kafka: {
		topics: [
			{
				name: 'command.offers.create',
				eventListener: 'OfferCreateListener',
				consumerGroup: 'offer-create-group',
			}
		]
	}
}
