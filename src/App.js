import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 1500)
  }

  return (
    <>
    <NoteState>
      <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>

          <Routes>
            <Route exact path='/' element={<Home showAlert={showAlert}/>}/>
            <Route exact path='/about' element={<About/>}/>
            <Route exact path='/login' element={<Login showAlert={showAlert}/>}/>
            <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}/>
      
          </Routes>
      </Router>
    </NoteState>
    
    </>
  );
}

export default App;
