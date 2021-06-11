const router = require('express').Router();
let Exercise = require('../models/excercise.models');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req, res) => {

    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    console.log(username, description, duration, date);
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(user => res.json('Exercise Added'))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').get((req, res) => {
    Exercise.findById(res.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(res.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/update/:id').put((req, res) => {
    Exercise.findById(res.params.id)
        .then(exercise => {

            const username = req.body.username;
            const description = req.body.description;
            const duration = Number(req.body.duration);
            const date = Date.parse(req.body.date);

            exercise.save()
                .then(user => res.json('Exercise Updated'))
                .catch(err => res.status(400).json('Error:' + err));
        })
        .catch(err => res.status(400).json('Error:' + err));
});


module.exports = router;