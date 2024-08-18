import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Courses.module.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/cplogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faGolfBallTee } from '@fortawesome/free-solid-svg-icons';


interface Review {
  review_id: number;
  review_text: string;
  rating: number;
  created_at: string;
  user_id: number;
  username?: string; // Add optional username field
}

interface Course {
  course_id: number;
  course_name: string;
  course_city: string;
  course_state: string;
  course_address: string;
  reviews: Review[];
  course_address_link: string;
  course_distance2poly: number;
  course_tee_time_link: string;
}

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [expandedCourseId, setExpandedCourseId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsername = async (userId: number) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/returnUser/${userId}`);
        console.log(response.data[0].username);
        return response.data[0].username;
      } catch (error) {
        console.error(`Error fetching username for user ID ${userId}:`, error);
        return 'Unknown User';
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/courses');
        const coursesData: Course[] = response.data;
        console.log(coursesData);

        // Fetch usernames for each review
        const coursesWithUsernames = await Promise.all(
          coursesData.map(async (course) => {
            // Filter out reviews with null user_id
            const validReviews = course.reviews.filter(review => review.user_id !== null);

            const reviewsWithUsernames = await Promise.all(
              validReviews.map(async (review) => {
                const username = await fetchUsername(review.user_id);
                console.log(review.user_id);
                console.log(username);
                return { ...review, username };

              })
            );

            // If no valid reviews, return a course with an empty reviews array
            return { ...course, reviews: reviewsWithUsernames.length > 0 ? reviewsWithUsernames : [] };
          })
        );

        setCourses(coursesWithUsernames);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleExpand = (courseId: number) => {
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  };
  const navigate = useNavigate();

  const handleNavigateToReviewForm = (courseId: number) => {
    navigate(`/${courseId}/review`);
  };

  return (
    <div className={styles['page']}>
        <h1 className={styles['courses-title']}>Courses</h1>
        {courses.map(course => (
            <div key={course.course_id} className={styles['course-container']} onClick={() => handleExpand(course.course_id)}>
                <div className={styles['course-info']}>
                    <h2 className={styles['course-name']}>{course.course_name}</h2>
                    <div className={styles['course-description']}>
                        <a href={course.course_address_link} target="_blank" rel="noopener noreferrer">
                            Directions
                        </a>
                        <p>&nbsp;</p>
                        <p className={styles["course-title-info"]}>{course.course_distance2poly} miles away from</p>
                        <img className={styles['cplogo']}src={logo} />
                    </div>
                </div>
                {expandedCourseId === course.course_id && (
                    <>
                        <div className={styles['buttons-container']}>
                          <button onClick={() => handleNavigateToReviewForm(course.course_id)}>
                            Add Review&nbsp;
                            <FontAwesomeIcon icon={faComments} />  
                          </button>
                          <a href={course.course_tee_time_link} target="_blank" rel="noopener noreferrer">
                            <button>
                              Book A Tee Time&nbsp;
                              <FontAwesomeIcon icon={faGolfBallTee} />                            </button>
                          </a>
                        </div>
                        <h3 className={styles['review-title']}>Reviews:</h3>
                        <div className={styles['reviews-container']}>
                          <div className={styles['scrollable-reviews']}>
                              {course.reviews.length > 0 ? (
                                  course.reviews.map(review => (
                                      <div key={review.review_id} className={styles["review"]}>
                                          <p className={styles["review-name"]}>{review.username} - {review.rating}/5 stars</p>
                                          <p>{review.review_text}</p>
                                      </div>
                                  ))
                              ) : (
                                  <p className={styles["review-name"]}>No reviews yet.</p>
                              )}
                          </div>
                        </div>
                    </>
                )}
            </div>
        ))}
    </div>
);
}

export default CoursesPage;