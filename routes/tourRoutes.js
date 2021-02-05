const express = require('express');
const { getAllTours, getTour, setNewTour, updateTour, deleteTour,
     aliasTopTours, getToursStats, getMonthlyPlan } = require('./../controllers/tourControllers');
const { protect, restrictTo } = require('./../controllers/authControllers');

const router = express.Router();

router.route('/top-5-cheap')
    .get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getToursStats);

router.route('/monthly-plan/:year').get(getMonthlyPlan);
// router.param('id', checkId)

router.route('/')
    .get(protect, getAllTours)
    .post(setNewTour);

router.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;