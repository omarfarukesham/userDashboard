import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Users from './Components/Users';
import Analysis from './Components/Analysis';
import CustomiseUser from './Components/CustomiseUser';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='user' element={<Users></Users>}></Route>
          <Route path='analysis' element={<Analysis></Analysis>}></Route>
          <Route path='customizeData' element={<CustomiseUser></CustomiseUser>}></Route>
      </Routes>
    </div>
  );
}

export default App;
