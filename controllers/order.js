const Order = require('../models/order.js');

// Create and Save a new Order
exports.create = (req, res) => {
    try {
        var currentDate = new Date();
    // Validate request
    if (!req.body.order_id) {
        return res.status(400).send({
            message: "Order order_id can not be empty"
        });
    }

    // Create a Order
    const order = new Order({
        order_id: req.body.order_id,
        item_name:req.body.item_name,
        cost:req.body.cost,
        order_date: currentDate.toISOString(),
        delivery_date:req.body.delivery_date
    });

    // Save Order in the database
    order.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the order."
            });
        });
    } catch (error) {
        res.status(500).send({
            message:error.message || "Some error occurred while creating the order."
        });
    }
};

// find all Order from the database.
exports.findAll = async (req, res) => {
    var start = new Date(req.query.date);
    start.setHours(0,0,0,0);
    
    var end = new Date(req.query.date);
    end.setHours(23,59,59,999);
    try {
    const orders = await Order.find({order_date: {$gte: start, $lt: end}});
    if(!orders){
        res.status(404).send({
            message: "order not found"
        })
    }
    else{
        res.send({
            data :orders,
            message:"order found"
        })
    }
} catch (error) {
    res.status(500).send({
        message:error.message || "Some error occurred while getting the order."
    });
}
};

// Find a single Order with a OrderId
exports.findOne = (req, res) => {
    try {
        Order.findById({order_id:req.query.orderId})
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "order not found with id " + req.query.orderId
            });            
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "order not found with id " + req.query.orderId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving order with id " + req.query.orderId
        });
    });
} catch (error) {
     res.status(500).send({
        message:error.message || "Some error occurred while getting the order."
    });    
}
};

// Update a Order identified by the OrderId in the request
exports.update = (req, res) => {
    if(!req.body.delivery_date) {
        return res.status(400).send({
            message: "delivery_date can not be empty"
        });
    }

    // Find order and update it with the request body
    Order.findByIdAndUpdate(req.query.order_id, {
        delivery_date: req.body.delivery_date
    }, {new: true})
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "order not found with id " + req.query.order_id
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "order not found with id " + req.query.order_id
            });                
        }
        return res.status(500).send({
            message: "Error updating order with id " + req.query.order_id
        });
    });
};

// Delete a Order with the specified OrderId in the request
exports.delete = (req, res) => {
    Order.findByIdAndRemove(req.params.order_id)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "order not found with id " + req.params.order_id
            });
        }
        res.send({message: "order deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "order not found with id " + req.params.order_id
            });                
        }
        return res.status(500).send({
            message: "Could not delete order with id " + req.params.order_id
        });
    });
};