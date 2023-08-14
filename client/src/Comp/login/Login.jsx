import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import axios from "axios";
import "./login.css";
import { UserContext } from "../../context/UserContext";

function Login(){
  const [userName , setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const{setUserInfo, userInfo} = useContext(UserContext);
  
  const login = async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:5000/login",
        {
          userName: userName,
          password: password,
        },
        { withCredentials: "include" }
    ).then((res) => {
        setUserInfo(res);
        setRedirect(true);
    }).catch((e) => {
        console.log(e);
        alert("wrong credentials");
    });
    
  }
  if(redirect){
    return <Navigate to = {'/'}/>
  }
  return (
    <div>
      <div className="container">
        <form className="login" onSubmit={login}>
        <h1>Login</h1>
          <input type="text" placeholder="Username" value={userName} onChange={(e)=>{setUserName(e.target.value)}}></input>
          <input type="passsword" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
