const Review = require('../models/Review.js');
const Event = require('../models/Event.js');
exports.createReview = async (req, res) => {
    console.log(req.body);
    const newReview = new Review({
        event: req.body.event,
        user: req.body.user,
        username: req.body.username,
        rating: req.body.rating,
        review: req.body.review,
    });

    try {
        await newReview.save();
    
        const reviews = await Review.find({ event: req.body.event });
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
    
        const event = await Event.findById(req.body.event);
        event.rating = averageRating;
        await event.save();
        
        return res.status(200).json({
            title: 'Review created',
        });
    } catch (error) {
        return res.status(400).json({
            title: 'Error',
            error: error,
        });
    }
}

exports.getAllReviews = async (req, res) => {
    try{
        const reviews = await Review.find();
        return res.status(200).json({
            title: 'All reviews',
            reviews: reviews
        });
    }catch(error){
        return res.status(400).json({
            title: 'error',
            error: error
        });
    }
}

exports.getUserReviews = async (req, res) => {
    try {
        const userId = req.query.userId; 
        const userReviews = await Review.find({ user: userId });

        return res.status(200).json({
            title: 'All reviews',
            reviews: userReviews
        });
    } catch (error) {
        return res.status(400).json({
            title: 'error',
            error: error
        });
    }
}
