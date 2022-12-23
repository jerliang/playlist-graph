import './App.css';
import Login from './Login'
import GetPlaylists from './GetPlaylists';

function App() {
  return (
    <div className="App">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Login />
        <GetPlaylists />
    </div>
  );
}

export default App;
