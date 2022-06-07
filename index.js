const { ConfigTokenMp, createPayment, getPayment, cancelPayment } = require('./app');

const TokenMP = 'TEST-asdasjkbe-ada2121asdef';

async function main() {
	ConfigTokenMp(TokenMP);

	const create = await createPayment({
		title: 'Balao de chocolate',
		price: 1.80,
		phone: '5511999999999',
		email: 'test@gmail.com'
	});
	console.log(create);


	const get = await getPayment(create.id);
	console.log(get);

	
	const cancel = await cancelPayment(create.id);
	console.log(cancel);
}
main();