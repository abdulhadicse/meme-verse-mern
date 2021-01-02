import Axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Notes from './components/Memes';

function App() {
  const[loggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const checkLogin= async() =>{
      const token = localStorage.getItem('tokenStore');
      if(token){
        const  verified = await Axios.get('http://localhost:4000/user/verify',{
          headers:{Authentication: token}
        })
        
        setIsLoggedIn(verified.data);

        if(verified.data === false) return localStorage.clear();
      }
      else{
        setIsLoggedIn(false);
      }
    }
    checkLogin();
  },[])
  
  return (
    <div className="App">

      {
        loggedIn ? <Notes setIsLoggedIn={setIsLoggedIn}></Notes> : <Login setIsLoggedIn={setIsLoggedIn}></Login>
      }

    </div>
  );
}

export default App;
