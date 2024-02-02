const express = require('express') 
const app=express()
const port= 5000
const bodyParser = require('body-parser') 
const mongoose = require('mongoose') 
const config=require('./config/db') 
const cors = require('cors') 
const multer=require('multer') 
const path = require('path') 
const Event = require('./api/models/Event')

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage, limits: { files: 8 } });

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.post('/createEvent', upload.array('images', 10), async (req, res) => {
  try {
    
    const filenames = req.files.map(file => file.filename);

    const event = new Event({
      name: req.body.name,
      location: req.body.location,
      city: req.body.city,
      organizer: req.body.organizer,
      eventType: req.body.eventType,
      eventStartDate: req.body.eventStartDate,
      eventEndDate: req.body.eventEndDate,
      description: req.body.description,
      rating:0,
      eventStatus: req.body.eventStatus,
      contactInformation: req.body.contactInformation,
      eventCapacity: req.body.eventCapacity,
      usefulLinks: JSON.parse(req.body.usefulLinks),
      tickets: JSON.parse(req.body.tickets),
      images: filenames, 
    });

    const savedEvent = await event.save();

    res.json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/events',  require('./api/routes/events'))
app.use('/reviews',  require('./api/routes/reviews'))
app.use('/users',  require('./api/routes/users'))

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});



