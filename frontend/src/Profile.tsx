import { User } from './types/User';
import styles from './HomePage/Home.module.css';

interface ProfileProps {
    user: User;
    onClick: () => void;
  }

const Profile: React.FC<ProfileProps> = ({user, onClick}) => {
    return (
        <div className={styles.page}>
            <h1>Hi, @{user.username}!</h1>
            <button onClick={onClick}>Logout</button>
        </div>
    );
}

export default Profile;