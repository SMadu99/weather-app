import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";
import { useNavigate,} from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if username and password match
    if (username === "shanilka" && password === "shanilka99") {
        navigate("/Dashboard");
      console.log("Login successful!");
    } else {
      // Display error message
      setErrorMessage("Username or password is not correct");
    }
  };

  return (
    <div className='background-login'>
      <div className='wrapper'>
        <div className='form-box login'>
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className='input-box'>
              <input 
                type='text' 
                placeholder='username' 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
              <FaUser className='icon'/>
            </div>
            <div className='input-box'>
              <input 
                type='password' 
                placeholder='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <FaLock className='icon'/>
            </div>
            <button type='submit'>Login</button>
          </form>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
}

export default Login;
