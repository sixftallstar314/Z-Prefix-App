import React from 'react'
import Auth from './components/Auth'

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
