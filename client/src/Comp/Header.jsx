import { Link } from "react-router-dom";
import { useContext, useEffect} from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const {setUserInfo, userInfo} = useContext(UserContext);
  useEffect(() => {
    axios.get("http://localhost:5000/profile", {
        withCredentials: "include",
      })
      .then((userInfo) => {
        setUserInfo(userInfo);
      });
  }, []);

  const logout = ()=>{
    axios.post("http://localhost:5000/logout",{
        withCredentials : 'include'
    });
    setUserInfo(null);
  }
  const UserName = userInfo?.data?.userName;
  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {UserName&& (
          <>
            <Link to="/create">create</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!UserName && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
