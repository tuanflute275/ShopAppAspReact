import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import { adminRoutes, clientRoutes } from "./routes/Routes";
import { useSelector } from "react-redux";
import { selectUserData } from "./redux/reducers/user";

function App() {
  const userData = useSelector(selectUserData);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {
        adminRoutes.map((route, index) => {
          return (
            <Route
              exact
              key={index}
              path={route.path}
              element={route.element}
            />
          );
        })}
        
      {clientRoutes.map((route, index) => {
        return (
          <Route exact key={index} path={route.path} element={route.element} />
        );
      })}
    </Routes>
  );
}

export default App;
