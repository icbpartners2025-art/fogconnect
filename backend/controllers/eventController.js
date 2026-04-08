const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");

// @desc    Get all events
// @route   GET /api/events
// @access  Private
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).populate("church").populate("attendees");
  res.json(events);
});

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const {
    title,
    date,
    location,
    church,
    topic,
    verses,
    adults_count,
    children_count,
    offering_amount,
    attendees,
  } = req.body;

  const event = await Event.create({
    title,
    date,
    location,
    church,
    topic,
    verses,
    adults_count,
    children_count,
    offering_amount,
    attendees,
  });

  if (event) {
    res.status(201).json(event);
  } else {
    res.status(400);
    throw new Error("Invalid event data");
  }
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  const {
    title,
    date,
    location,
    church,
    topic,
    verses,
    adults_count,
    children_count,
    offering_amount,
    attendees,
  } = req.body;

  const event = await Event.findById(req.params.id);

  if (event) {
    event.title = title || event.title;
    event.date = date || event.date;
    event.location = location || event.location;
    event.church = church || event.church;
    event.topic = topic || event.topic;
    event.verses = verses || event.verses;
    event.adults_count = adults_count || event.adults_count;
    event.children_count = children_count || event.children_count;
    event.offering_amount = offering_amount || event.offering_amount;
    event.attendees = attendees || event.attendees;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    await event.remove();
    res.json({ message: "Event removed" });
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
