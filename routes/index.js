const router = require("express").Router();
// Import all of the API routes from /api/index.js (no need for index.js though since it's implied)

const apiRoutes = require("./api");

// const userRoutes = require('./api/user-routes');
// const thoughtRoutes = require('./api/thought-routes');

// add prefix of `/api` to all of the api routes imported from the `api` directory
router.use("/api", apiRoutes);

// router.use('./users', userRoutes);
// router.use('/thoughts', thoughtRoutes);

router.use((req, res) => {
  res.status(404).send("<h1> hello</h1>");
});

module.exports = router;
