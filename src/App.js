import logo from './logo.svg';
import './App.css';
import {SingleBookDisplay} from "./components/bookList/singleBookDisplay/SingleBookDisplay"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SingleBookDisplay/>
      </header>

    </div>
  );
}

export default App;
