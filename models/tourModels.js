const mongoose = require('mongoose');
const slugify = require('slugify');

const MIN_NAME_LENGTH = 10;
const MAX_NAME_LENGTH = 40;
const MIN_RATINGS_AVAREGE = 1.0;
const MAX_RATINGS_AVARAGE = 5.0;

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'A tour has have a name'],
        unique: true,
        maxlength: [MAX_NAME_LENGTH, `A tour name must have less or equal ${MAX_NAME_LENGTH} characters`],
        minlength: [MIN_NAME_LENGTH, `A tour name must have lmore ${MIN_NAME_LENGTH} characters`]
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
        require: [true, 'A tour must have a difficulty'],
        // only for strings
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty is either: easy, medium or difficult'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [MIN_RATINGS_AVAREGE, `Ratings must be above ${MIN_RATINGS_AVAREGE}`],
        max: [MAX_RATINGS_AVARAGE, `Ratings must be below ${MAX_RATINGS_AVARAGE}`]
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

tourSchema.pre(/^find/, function(next) {
    this.find({ secretTour: { $ne: true }});
    next();
})

tourSchema.pre('aggregate', function(next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true }}});

    next();
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;