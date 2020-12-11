const Tour = require('./../models/tourModels');


const error = (message, res) => {
    res.status(400).json({
        status: 'fail',
        message: message
    });
}

exports.getAllTours = async (req, res) => {

    try {
        const tours = await Tour.find();

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours: tours
            }
        });
    } catch(err) {
        error(err, res)
    }
}

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id)

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        error(err, res)
    }

}

exports.setNewTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            }
        })
    } catch (err) {
        error(err, res)
    }
}

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        })
    } catch (err) {
        error(err, res);
    }
}

exports.deleteTour = async (req, res) => {
    try{ 
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            data: null
        })
    } catch(err) {
        error(err, res)
    }
}