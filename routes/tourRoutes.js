const express = require('express');
const { getAllTours, getTour, setNewTour, updateTour, deleteTour } = require('./../controllers/tourControllers');

const router = express.Router();



router.route('/')
    .get(getAllTours)
    .post(setNewTour);

router.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

module.exports = router;