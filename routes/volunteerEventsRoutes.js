const mongoose = require('mongoose');

const Event = mongoose.model('events');

module.exports = app => {
  app.get('/api/get/all', async (req, res) => {
    const allEvents = await Event.find({});
    res.send(allEvents);
  });

  app.get('/api/get/all_active', async (req, res) => {
    const allEvents = await Event.find({ dateOfEvent: { $gt: new Date() } });
    res.send(allEvents);
  });

  app.post('/api/post/event', async (req, res) => {
    const { title, hostName, hostEmail, location, description } = req.query;
    const dateOfEvent = new Date(req.query.dateOfEvent);
    const dateSubmitted = new Date();
    const event = new Event({
      title,
      hostName,
      hostEmail,
      location,
      description,
      dateOfEvent,
      dateSubmitted
    });
    const saved = await event.save();
    res.send('Made event!');
  });
};
