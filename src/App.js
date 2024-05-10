import './App.css';
import Navbarr from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import About from './components/About';
import HomeView from './components/HomeView';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <div className="container">
            <Navbarr/>
            <Routes>
              <Route exact  path="/" element={<HomeView/>}></Route>
              <Route exact path='/about' element={<About/>}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>

    </>
  );
}

export default App;
