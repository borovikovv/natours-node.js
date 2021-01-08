const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'A tour has have a name'],
        unique: true
    },
    slug: String,
    duration: {
        type: Number,
        require: [true, 'A tour must have a durations']
    },
    maxGroupSize: {
        type: Number,
        require: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        require: [true, 'A tour must have a difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        require: [true, 'A tour has have a price']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        require: [true, 'A tour must have a summary']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        require: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    secretTour: {
        type: Boolean,
        default: false
    },
    startDates: [Date]
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

tourSchema.virtual('durationWeek').get(function() {
    return this.duration / 7;
})

tourSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true});
    next();
})

tourSchema.pre( /^find/, function(next) {
    this.find({ secretTour: { $ne: true }});
    next();
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;