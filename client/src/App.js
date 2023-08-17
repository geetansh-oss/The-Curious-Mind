import "./styles/App.css";
import Login from "./Comp/login/Login";
import Register from "./Comp/register/Register";
import Layout from "./Comp/Layout";
import IndexPage from "./Comp/IndexPage";
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import CreatePost from "./Comp/CreatePost";
import PostFull from "./Comp/PostFull";


function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/CreatePost" element={<CreatePost/>}/>
          <Route path="/post/:id" element={<PostFull/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
