const Pool = require('pg').Pool
const config = require('../config/config');
const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
})

const getCourses = (request, response) => {
  const query = `
    SELECT 
      courses.id AS course_id, 
      courses.name AS course_name, 
      courses.city AS course_city, 
      courses.state AS course_state, 
      courses.address AS course_address,
      courses.address_link AS course_address_link,
      courses.distance2poly AS course_distance2poly,
      courses.tee_time_link AS course_tee_time_link,
      json_agg(
        json_build_object(
          'review_id', reviews.id, 
          'review_text', reviews.review_text, 
          'rating', reviews.rating, 
          'created_at', reviews.created_at,
          'user_id', reviews.user_id
        )
      ) AS reviews
    FROM courses
    LEFT JOIN reviews ON courses.id = reviews.course_id
    LEFT JOIN users ON reviews.user_id = users.id
    GROUP BY courses.id
    ORDER BY courses.id ASC
  `;
  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

  const getCourseById = (request, response) => {
    const id = parseInt(request.params.id) // Checks for id within the current url
  
    pool.query('SELECT * FROM courses WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const addReview = (request, response) => {
    const course_id = parseInt(request.params.id);
    const { review_text, rating, user_id } = request.body;
  
    pool.query(
      'INSERT INTO reviews (course_id, review_text, rating, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [course_id, review_text, rating, user_id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).json(results.rows[0]);
      }
    );
  };

  const deleteReview = (request, response) => {
    const review_id = parseInt(request.params.review_id);
    
    pool.query(
      'DELETE FROM reviews where id = $1', [review_id],
      (error, results) => {
        if (error){
          throw error
        }
        response.status(200).send(`Review deleted with ID: ${review_id}`)
      }
    )
  }

  const getUsernameById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT username FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getCourses,
    getCourseById,
    addReview,
    getUsernameById,
    deleteReview
  }

