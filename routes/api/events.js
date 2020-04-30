const express = require("express");
const router = express.Router();

const Event = require("../../models/Event");
const User= require("../../models/User");

router.route('/:id').get((req, res) => {

    Event.find({user: req.params.id})
      .then(events => res.json(events))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/add').post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const date = req.body.date;
    const user=req.body.user;
    const newEvent = new Event({title,description,date,user});
  
    newEvent.save()
      .then(() => res.json('Event added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
      .then(() => res.json('Event deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').post((req, res) => {
    Event.findById(req.params.id)
      .then(event => {
        event.title = req.body.title;
        event.description = req.body.description;
        event.date = Date.parse(req.body.date);
        event.user=req.body.user;
        event.save()
          .then(() => res.json('Event updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;