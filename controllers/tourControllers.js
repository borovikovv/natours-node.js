const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
}

exports.getTour = (req, res) => {

    const id = Number(req.params.id);
    const tour = tours.find(tour => tour.id === id);

    if(!tour) {
        return res.status(404).json({
            status: 'fail',
            message: "ID not found"
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
}

exports.setNewTour = (req, res) => {

    const newTourId = tours[tours.length - 1].id + 1;
    console.log(newTourId);
    const newTour = Object.assign({id: newTourId},  req.body)

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
}

exports.updateTour = (req, res) => {

    if(Number(req.params.id) > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: "ID not found"
        })
    }

    res.status(200).json({
        status: "success"
    })
}

exports.deleteTour = (req, res) => {

    if(Number(req.params.id) > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: "ID not found"
        })
    }

    res.status(204).json({
        status: "success",
        data: null
    })
}