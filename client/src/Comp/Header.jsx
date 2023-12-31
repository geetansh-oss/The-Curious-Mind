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
      }).catch(()=>{});
  }, []);

  const logout = ()=>{
    axios.post("http://localhost:5000/logout",{
        withCredentials : 'include'
    });
    var allCookies = document.cookie.split(";");
    // The "expire" attribute of every cookie is
    // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
    for (var i = 0; i < allCookies.length; i++)
      document.cookie =
        allCookies[i] + "=;expires=" + new Date(0).toUTCString();
    setUserInfo(null);
  }

  const UserName = userInfo?.data?.userName;

  return (
    <header>
      <Link to="/" className="logo">
        <div className="brandLogo">The Curious Mind</div>
      </Link>
      <nav>
        {UserName && (
          <>
            <Link to="/CreatePost">create</Link>
            <Link to={`/profile/${userInfo.data.id}`}>Profile</Link>
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
