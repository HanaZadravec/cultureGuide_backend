const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
    username: {
        type: String,
        required: true,
    },  
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Review', ReviewSchema);
