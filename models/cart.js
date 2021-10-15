const mongoose = require('mongoose');

const cartProductSchema = mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    qty: { type: Number, default: 0 }
});


exports.CartProduct = mongoose.model('CartProduct', cartProductSchema);

