import "./styles/App.css";
import Login from "./Comp/login/Login";
import Register from "./Comp/register/Register";
import Layout from "./Comp/layout";
import IndexPage from "./Comp/indexPage";
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";


function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
