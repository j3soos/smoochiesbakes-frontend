const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  status: { type: String, enum:{values:['in progress', 'completed'], message:'this value is not supported'}, required: true },
  payment_phone: { type: String, required: true },
  receipient_number: { type: Number, required: true },
  receipient_name: { type: Number, required: true },
  receipient_email: { type: Number, required: false },
  sender_number: { type: String, required: true },
  sender_name: { type: String, required: true },
  sender_email: { type: String, required: true },
  products: { type: Array, required: true },
  delivery_location: { type: String, required: true },
  total_price: { type: String, required: true },
  delivery_cost: { type: Number, required: true },
});

module.exports = mongoose.model('Order', OrderSchema)
