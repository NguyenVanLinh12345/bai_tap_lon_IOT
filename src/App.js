import { Routes, Route, Navigate } from 'react-router-dom';
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

  let token = null;
  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
  }
  return (
    <div className="App">
      <Routes>
        {/* <Route path='/*' element={token ? <Home /> : <Login/>} />
        <Route path='/login' element={token ? <Home/> :<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/employee' element={<Employees />} />
        <Route path='/machine' element={<Machines />} />
        <Route path='/type-egg' element={<TypeEggs />} />
        <Route path='/employee-machine' element={<EmployeeMachinePage />} /> */}
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/employee" element={token ? <Employees /> : <Navigate to="/login" replace />} />
        <Route path="/machine" element={token ? <Machines /> : <Navigate to="/login" replace />} />
        <Route path="/type-egg" element={token ? <TypeEggs /> : <Navigate to="/login" replace />} />
        <Route path="/employee-machine" element={token ? <EmployeeMachinePage /> : <Navigate to="/login" replace />} />
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
