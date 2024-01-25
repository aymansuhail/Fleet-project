import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages

import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import Drivers from './pages/Drivers';
import Vehicles from './pages/Vehicles';
import Realtime from './pages/Realtime';
import Maintnence from './pages/Maintnence'
import Events from './pages/Events'
import Effeciency from './pages/Effeciency';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route  path="/" element={<Layout />} > 

        <Route  path="/Dashboard" element={<Dashboard />} /> 
        <Route  path="/drivers" element={<Drivers />} /> 
        <Route  path="/vehicles" element={<Vehicles/>} /> 
        <Route  path="/realtime" element={<Realtime/>} /> 
        <Route  path="/events" element={<Events/>} /> 
        <Route  path="/maintnence" element={<Maintnence/>} /> 
        <Route  path="/Effeciency" element={<Effeciency/>} /> 
        
        
        
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
