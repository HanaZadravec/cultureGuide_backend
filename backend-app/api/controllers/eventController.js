const Event = require('../models/Event');
const User = require('../models/User');
const moment = require('moment');


exports.getAllEvents = async (req, res) => {
  try {
    const allEvents = await Event.find();

    res.status(200).json({ events: allEvents });
  } catch (error) {
    console.error('Failed to fetch events', error);
    res.status(500).json({
      title: 'Error',
      error: error,
    });
  }
}


exports.registerForEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.eventId);
      const { userId } = req.body;
  
      if (!event) {
        return res.status(404).json({
            title: 'Event not found',
        });
      }
  
      if (event.eventCapacity > 0) {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                title: 'User not found',
            });
        }
  
        if (event.registeredUsers.includes(user._id)) {
            return res.status(400).json({
                title: 'User already registered for this event',
            });
        }
  
        event.registeredUsers.push(user._id);
        event.eventCapacity--;
  
        await event.save();
  
        const updatedEvent = await Event.findById(req.params.eventId); 
        return res.status(200).json({
            title: 'Registered for event',
            event: updatedEvent, 
        });
      } else {
        return res.status(400).json({
            title: 'Event is already full',
        });
      }
    } catch (error) {
      return res.status(400).json({
        title: 'error',
        error: error,
      });
    }
  };

exports.updateStatus = async (req, res) => {
  try {
    const events = await Event.find();

    const currentDate = new Date();

    for (const event of events) {
      const eventStartDate = new Date(event.eventStartDate);
      const eventEndDate = new Date(event.eventEndDate);
      let status = 'Upcoming';

      if (currentDate < eventStartDate) {
        status = 'Upcoming';
      } else if (currentDate >= eventStartDate && currentDate <= eventEndDate) {
        status = 'In Progress';
      } else {
        status = 'Completed';
      }

      await Event.updateOne({ _id: event._id }, { eventStatus: status });
    }

    res.status(200).json({ message: 'Event statuses updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating event statuses' });
  }
  };


  