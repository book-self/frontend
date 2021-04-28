import logo from './logo.svg';
import './App.css';
import { Counter } from './components/counter/Counter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
        <Counter />
        <p>
          <a
          className="App-link"
          href="https://redux.js.org/introduction/getting-started"
          target="_blank"
          rel="noopener noreferrer"
          >
            Learn Redux
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
