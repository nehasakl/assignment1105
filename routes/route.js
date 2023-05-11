module.exports = (app) => {
    const order = require('../controllers/order.js');

    // Create a new Order
    app.post('/orders/create', order.create);

    // Retrieve all Orders
    app.get('/orders/list', order.findAll);

    // Retrieve a single Order with orderId
    app.get('/orders/search', order.findOne);

    // Update a Order with orderId
    app.put('/orders/update', order.update);

    // Delete a Order with orderId
    app.delete('/orders/delete/:order_id', order.delete);
}