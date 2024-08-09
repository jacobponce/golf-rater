import { User } from '../types/User';
import styles from './Home.module.css';
import npc from '../assets/npc.png';
import goat from '../assets/goat.png';

interface HomeProps {
    user: User;
  }

  const Home: React.FC<HomeProps> = ({ user }) => {
    return (
        <div className={styles.page}>
            <div className={styles.backgroundImageContainer}>
                <h1 className={styles.welcomeText}>Welcome, {user.username}!</h1>
            </div>
            <div className={styles.descriptionContainer}>
                <div className={styles.descriptionText}>
                    <h2>About golf @:</h2>
                    <p>Whether you're a seasoned 
                        golfer or just starting out, golf @ helps you find the perfect courses, 
                        connect with fellow golfers, and share your experiences! 
                        </p>
                    <p>Leave reviews, rate courses, and explore new places to play—all while enjoying 
                        a website designed specifically with college students in mind. 
                        </p>
                    <p>Get out and play with golf @ today! ⛳🏌️</p>
                </div>
                    <img src={goat} alt="Description" className={styles.sideImage} />
            </div>
        </div>
    );
}

export default Home;