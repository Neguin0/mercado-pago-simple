const mercadopago = require('mercadopago');

function ConfigTokenMp(token) {
	mercadopago.configurations.setAccessToken(token);
}

/**
 * Create Payment
 * @param {Object} product {title, price, phone, email}
 * @returns {Object} {id, status, price, name_collector, qr_code, payerId, date_created, date_expiration, qr_code_base64}
 * @returns {Promise<void>}
 * @constructor
*/

async function createPayment(product) {
	const payment_data = {
		transaction_amount: product.price,
		description: product.title,
		payment_method_id: 'pix',
		payer: {
			email: product.email,
			entity_type: 'individual',
			type: 'customer',
			identification: {
				type: "phone",
				number: product.phone,
			},
		}
	};
	return mercadopago.payment.create(payment_data)
		.then((data) => {
			const response = data?.response;
			const result = {
				id: response?.id,
				status: response?.status,
				price: response?.transaction_amount,
				name_collector: response?.point_of_interaction?.transaction_data?.bank_info?.collector?.account_holder_name,
				qr_code: response?.point_of_interaction?.transaction_data?.qr_code,
				payerId: response?.payer?.id,
				date_created: response?.date_created,
				date_expiration: response?.date_of_expiration,
				qr_code_base64: response?.point_of_interaction?.transaction_data?.qr_code_base64,
			}
			return result;
		})
		.catch((error) => {
			throw error;
		});
}

/**
 * Get Payment
 * @param {String} id
 * @returns {Object} {id, status, price, name_collector, qr_code, payerId, date_created, date_expiration, qr_code_base64}
 * @returns {Promise<void>}
 * @constructor
 */

async function getPayment(id) {
	return mercadopago.payment.get(id)
		.then((data) => {
			const response = data?.response;
			const result = {
				id: response?.id,
				status: response?.status,
				price: response?.transaction_amount,
				name_collector: response?.point_of_interaction?.transaction_data?.bank_info?.collector?.account_holder_name,
				qr_code: response?.point_of_interaction?.transaction_data?.qr_code,
				date_created: response?.date_created,
				date_expiration: response?.date_of_expiration,
				qr_code_base64: response?.point_of_interaction?.transaction_data?.qr_code_base64,
				payer: {
					id: response?.payer?.id,
					email: response?.payer?.email,
					number: response?.payer?.identification?.number,
					type: response?.payer?.identification?.type,
				}
			}
			return result;
		})
		.catch((e) => {
			throw error;
		});
}

/**
 * Cancel Payment
 * @param {String} id
 * @returns {Object} {id, status, price, name_collector, qr_code, payerId, date_created, date_expiration, qr_code_base64}
 * @returns {Promise<void>}
 * @constructor
 */

async function cancelPayment(id) {
	return mercadopago.payment.cancel(id)
		.then((data) => {
			const response = data?.response;
			const result = {
				id: response?.id,
				status: response?.status,
				price: response?.transaction_amount,
				name_collector: response?.point_of_interaction?.transaction_data?.bank_info?.collector?.account_holder_name,
				qr_code: response?.point_of_interaction?.transaction_data?.qr_code,
				payerId: response?.payer?.id,
				date_created: response?.date_created,
				date_expiration: response?.date_of_expiration,
				qr_code_base64: response?.point_of_interaction?.transaction_data?.qr_code_base64,
			}
			return result;
		})
		.catch((error) => {
			throw error;
		});
}

module.exports = {
	ConfigTokenMp,
	createPayment,
	getPayment,
	cancelPayment
}
