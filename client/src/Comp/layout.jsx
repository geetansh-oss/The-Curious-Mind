import Header from "./Header";
import { Outlet } from "react-router-dom";

function layout() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}

export default layout;
