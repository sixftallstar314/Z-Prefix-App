import React from 'react'
import Auth from './components/Auth'
import Inventory from './components/Inventory'

const App = () => {
  const token = localStorage.getItem('token');
  return (
    <div>
      {token ? (
        <Inventory />
      ) : (
        <Auth /> 
      )}
    </div>
  );
};
export default App
