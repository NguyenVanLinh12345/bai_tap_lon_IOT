import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';

import Login from './components/base/login/Login';
import Employees from './pages/Employees';
import Machines from './pages/Machines';
import TypeEggs from './pages/TypeEggs';
import Loading from './components/base/loading/Loading';
import Home from './pages/Home';
import EmployeeMachinePage from './pages/EmployeeMachinePage';

import Context from './myContext/Context';
function App() {
  const [state, dispatch] = useContext(Context);
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/employee' element={<Employees />} />
        <Route path='/machine' element={<Machines />} />
        <Route path='/type-egg' element={<TypeEggs />} />
        <Route path='/employee-machine' element={<EmployeeMachinePage />} />
      </Routes>

      {
        state.loading
          ?
          <Loading></Loading>
          :
          null
      }
    </div>
  );
}

export default App;
