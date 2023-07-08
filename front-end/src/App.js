import React from 'react';
import './App.css';

import UserComponents from './components/All components/UserComponents';
import AdminComponents from './components/All components/AdminComponents';

function App() {
  return (
    <div className="App">
      <UserComponents />
      <AdminComponents />
    </div>
  );
}

export default App;
