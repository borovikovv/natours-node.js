const express = require('express');
const { getAllTours, getTour, setNewTour, updateTour, deleteTour, aliasTopTours } = require('./../controllers/tourControllers');

const router = express.Router();

router.route('top-5-cheap')
    .get(aliasTopTours, getAllTours);

// router.param('id', checkId)

router.route('/')
    .get(getAllTours)
    .post(setNewTour);

router.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

module.exports = router;