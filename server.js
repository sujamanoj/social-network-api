const express = require("express");

const app = express();

const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost:37017/SOCIAL-NETWORK-API",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// const URI = process.env.MONGODB_URL;

// mongoose.connect(
//   URI,
//   {
//     //useCreatendex: true,
//     //useFindAndModify: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
// (err) => {
//   if (err) throw err;
//   console.log("Connected to MongoDB!!!");
// };

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

// // A user has been created already for our activity purposes
// db.User.create({ name: 'Ernest Hemingway' })
//   .then(dbUser => {
//     console.log(dbUser);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });

// // Retrieve all notes
// app.get('/notes', (req, res) => {
//   db.Note.find({})
//     .then(dbNote => {
//       res.json(dbNote);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// // Retrieve all users
// app.get('/user', (req, res) => {
//   db.User.find({})
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// // Create a new note and associate it with user
// app.post('/submit', ({ body }, res) => {
//   db.Note.create(body)
//     .then(({ _id }) =>
//       db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true })
//     )
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get('/populate', (req, res) => {
//   db.User.find({})
//     .populate({
//       path: 'notes',
//       select: '-__v'
//     })
//     .select('-__v')
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

 mongoose.connection.once("open",() => {
app.listen(PORT, () => console.log(`connected on localhost:${PORT}`));
 })
