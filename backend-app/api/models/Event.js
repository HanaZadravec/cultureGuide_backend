const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema({
    ticketType: {
        type: String,
        enum: ["Child", "Adult", "Senior", "Student", "Free Entry"],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const EventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    organizer: {
        type: String,
        required: true,
    },
    eventType: {
        type: String,
        enum: [
            "Concert",
            "Exhibition",
            "Sports Event",
            "Festival",
            "Cooking Class",
            "Theater Show",
            "Conference",
            "Art Workshop",
            "Film Screening",
            "Other",
        ],
        required: true,
    },
    eventStartDate: {
        type: String,
        required: true,
    },
    eventEndDate: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    contactInformation: {
        type: String,
        required: true,
    },
    eventStatus: {
        type: String,
        enum: ["Upcoming", "In Progress", "Completed"],
        required: true,
    },
    registeredUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    eventCapacity: {
        type: Number,
        required: true,
    },
    tickets: [TicketSchema], 
    images: [String], 
    usefulLinks: [String],
});

module.exports = mongoose.model("Event", EventSchema);
