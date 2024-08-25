const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const db = require('./db/queries');
const coursesDb = require('./db/coursesQueries');
const userDb = require('./common/models');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const port = config.port;

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

userDb.sequelize.sync({ force: false }).then(() => {
    console.log("Sync database");
});

app.use('/api', userRoutes);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/api/users', db.getUsers);
app.get('/api/users/:id', db.getUserById);
app.put('/api/users/:id', db.updateUser);
app.delete('/api/users/:id', db.deleteUser);

app.get('/api/courses', coursesDb.getCourses);
app.get('/api/courses/:id', coursesDb.getCourseById);
app.post('/api/courses/:id/post-review', coursesDb.addReview);
app.delete('/api/reviews/:review_id', coursesDb.deleteReview)
app.get('/api/returnUser/:id', coursesDb.getUsernameById);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});