import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';

import Login from './components/Login';
import Employees from './pages/Employees';
import Machines from './pages/Machines';
import Loading from './components/base/Loading';

import Context from './myContext/Context';
function App() {
  const [state, dispatch] = useContext(Context);
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<Employees />} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/machine' element={<Machines />} />
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
