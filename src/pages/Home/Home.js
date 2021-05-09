import styles from './Home.module.css';
import logo from './logo.svg';

export const Home = () => {
  return (
    <div>
      <img src={logo} className={styles['App-logo']} alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload...
      </p>
      <a
        className={styles['App-link']}
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </div>
  );
}
