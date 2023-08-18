import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState([]);
  const params = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/profile/${params.id}`, {
        withCredentials: "include",
      })
      .then((res) => {
        setProfileData(res.data);
      });
  }, []);

  return <div></div>;
};

export default Profile;
