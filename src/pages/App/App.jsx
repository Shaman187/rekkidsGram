import React, {useState} from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';


function App() {

  const [user, setUser] = useState(userService.getUser()) // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like 
  // this  const token = createJWT(user); // where user was the document we created from mongo

  function handleSignUpOrLogin(){
    setUser(userService.getUser()) // getting the user from localstorage decoding the jwt
  }

  function handleLogout(){
    userService.logout();
    setUser({user: null})
  }

  return (
    <Router>
    <div className="App">
      <ul>
        <li>
          <Link to="/" style={{fontWeight: "bold", color: "purple"}}>Home</Link>
        </li>
        <li>
          <Link to="/login" style={{fontWeight: "bold", color: "purple"}}>Login</Link>
        </li>
        <li>
          <Link to="/signup" style={{fontWeight: "bold", color: "purple"}}>Signup</Link>
        </li>
      </ul>

      <hr/>

      <Switch>
          <Route exact path="/login">
             <LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
          <Route exact path="/signup">
             <SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
          {userService.getUser() ? 
            <> 
             <Switch>
                <Route exact path="/">
                    <h1>rekkidsGram Home Page</h1>
                </Route>
            </Switch>
            </>
            :
            <Redirect to='/login'/>
          }
  
      </Switch>
    </div>
  </Router>
  );
}

export default App;
