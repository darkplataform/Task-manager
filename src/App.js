import './App.css';
import Home from './project/ProjectManager'
import { Routes, Route } from "react-router-dom";
import TaskManager from './task/TaskManager'

function App() {
  
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tasks/:id' element={<TaskManager />} />
      </Routes>
      
    </div>
  );
}

export default App;
