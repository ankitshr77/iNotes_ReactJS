import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
    <NoteState>
      <Router>
          <Navbar/>
          <Alert message="HI THIS IS ALERT"/>

          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/about' element={<About/>}/>
      
          </Routes>
      </Router>
    </NoteState>
    
    </>
  );
}

export default App;
