import logo from './logo.svg';
import './App.css';
import {SingleBookDisplay} from "./components/bookList/singleBookDisplay/SingleBookDisplay"
import {BookList} from "./components/bookList/bookListDisplay/BookList"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BookList/>
      </header>

    </div>
  );
}

export default App;
