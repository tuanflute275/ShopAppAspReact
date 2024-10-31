import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes, clientRoutes } from "./routes/Routes";
import { useSelector } from "react-redux";
import { selectUserData } from "./redux/reducers/user";
import Login from "./components/admin/pages/login/Index";
import Unauthorized from "./components/admin/pages/UnauthorizedPage";

function App() {
  const userData = useSelector(selectUserData);
  const isAdmin = userData?.user.roleNames?.includes("Admin");
  console.log(isAdmin);
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      {isAdmin ? (
        adminRoutes.map((route, index) => (
          <Route exact key={index} path={route.path} element={route.element} />
        ))
      ) : (
        <Route path="/admin/*" element={<Unauthorized />} />
      )}

      {clientRoutes.map((route, index) => {
        return (
          <Route exact key={index} path={route.path} element={route.element} />
        );
      })}
    </Routes>
  );
}

export default App;
