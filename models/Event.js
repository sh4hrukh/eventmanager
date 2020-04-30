const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  user: {type: Schema.Types.ObjectId, ref:'users',required: true}
});

const Event = mongoose.model('events', eventSchema);

module.exports = Event;