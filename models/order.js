const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    order_id: {
        type: String,
        unique: true,
        required: true
    },
    item_name: {
        type: String,
        required: true
    },
    cost:{
        type: String,
        required: true
    },
    order_date:{
        type: String,
        required: true
    },
    delivery_date:{
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('order', OrderSchema);