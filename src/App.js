import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Employees from './pages/Employees';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/*' element={<Employees />}/>
        <Route path='/employees' element={<Employees />}/>
      </Routes>
    </div>
  );
}

export default App;
