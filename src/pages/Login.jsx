import React from 'react'
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";

function Login() {
  return (
    <div className='wrapper'>
        <div className='form-box login'>
            <form action=''>
                <h1>Login</h1>
                <div className='input-box'>
                    <input type='text' placeholder='username' /><FaUser className='icon'/>
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='password' /><FaLock className='icon'/>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login