import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong, faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './ReviewForm.module.css';

const ReviewForm = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const [userId, setUserId] = useState<string | null>(null); 
  const [courseName, setCourseName] = useState<string | null>(null); 
  
  useEffect(() => {
    const user_id2 = localStorage.getItem('user_id');
    setUserId(user_id2);
  }, []);

  useEffect(() => {
    const url = `http://143.198.230.147:3000/api/courses/${courseId}`;
    const fetchCourse = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data[0]);
        setCourseName(response.data[0].name);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
    }, [courseId]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const url = `http://143.198.230.147:3000/api/courses/${courseId}/post-review`;    
    try {
      const payload = { 
        rating: rating, 
        review_text: comment, 
        user_id: userId 
    };
      await axios.post(url, payload);
      setRating(null);
      setComment('');
      handleBack();
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleBack = () => {
    navigate('/courses');
  };

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  return (
    <div className={styles.page}>
      <div className={styles.iconContainer}>
          <FontAwesomeIcon onClick={handleBack} icon={faLeftLong} />
      </div>
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Review for {courseName}</h2>
        <div className={styles.formField}>
          <label className={styles.label}>Rating</label>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon
                key={star}
                icon={faStar}
                className={star <= (rating ?? 0) ? styles.filledStar : styles.emptyStar}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
        </div>
        <div className={styles.formField}>
          <label className={styles.label}>Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={styles.textarea}
            maxLength={500}
          />
        </div>
        <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitbutton} >Submit</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default ReviewForm;