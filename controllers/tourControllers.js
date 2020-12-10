const Tour = require('./../models/tourModels');


exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: {},
        data: {
        }
    });
}

exports.getTour = (req, res) => {

    res.status(200).json({
        status: 'success',
        data: {
        }
    });
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
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: "success"
    })
}

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: "success",
        data: null
    })
}