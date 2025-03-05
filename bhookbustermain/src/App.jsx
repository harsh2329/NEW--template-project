import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Usersidebar from './components/user/UserSidebar';
import UserSignup from './components/common/UserSignup';
import Login from './components/common/UserLogin';
import Rsidebar from './components/Restuarant/Rsidebar';
import Adminsidebar from './components/Admin/Adminsidebar';
import './assets/css/adminlte.css';
import './assets/css/adminlte.min.css';
import Rlogin from './components/Restuarant/Rlogin';
import Alogin from './components/Admin/Alogin';
import axios from 'axios';

function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  return (
    <div className="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded">
      <div className="app-wrapper">
        <Routes>
          <Route path='/' element={<Usersidebar />} />
          <Route path='/user' element={<Usersidebar />}>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<UserSignup />} />
          </Route>
          <Route path='/restaurant' element={<Rsidebar />}>
            <Route path='rlogin' element={<Rlogin />} />
            <Route path='rsignup' element={<UserSignup />} />
          </Route>
          <Route path='/admin' element={<Adminsidebar />}>
            <Route path='alogin' element={<Alogin />} />
            <Route path='asignup' element={<UserSignup />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
