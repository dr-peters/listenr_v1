// VERY IMPORTANT!!!
// MUST USE HOTSPOT WHEN CONNECTING TO DATABASE ON CAMPUS, OR PAGE WILL NOT RENDER WITH DATA FROM FIRESTORE

import './App.css';
import CrudFuncs from './components/CrudFuncs'
import LoginFuncs from './components/LoginFuncs';

function App() {
  return (
    <div className="App">
      <LoginFuncs/>
      <CrudFuncs/>
    </div>
  );
}

export default App;