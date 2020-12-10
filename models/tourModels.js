const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'A tour has have a name'],
        unique: true
    },
    rating: {
        type: Number
    },
    price: {
        type: Number,
        require: [true, 'A tour has have a price']
    }
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;