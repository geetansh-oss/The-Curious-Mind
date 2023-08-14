import { useState } from "react";
import axios from 'axios';
import "./register.css";

function Register() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const register = async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:5000/register",{
        userName: userName,
        password: password
      }
    ).then((res)=>{
      console.log(res.data)
      alert("Registered");
    }).catch((e)=>{
      console.log(e)
      alert("Registration failed!")
    });
  } 
  return (  
    <div>
      <div className="container">
        <form className="register" onSubmit={register}>
          <h1>Register</h1>
          <input type="text" placeholder="Username" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
          <input type="passsword" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
