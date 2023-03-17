import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbars from "./components/Navbars";
import { Api } from "./config/api";
import { UserContext } from "./context/userContext";
import definition from "./routes";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Detail from "./views/DetailView";
import Home from "./views/HomeView";
import MainView from "./views/MainView";

function App(): JSX.Element {
  const { state, dispatch } = useContext(UserContext) as {
    state: any;
    dispatch: React.Dispatch<any>;
  };

  const loadUser = async () => {
    const response = await Api.get("/user/check", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    if (response.data.statusCode === 200) {
      dispatch({
        type: "CHECK_USER",
        payload: response.data.data,
      });
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
  }, []);

  return (
    <>
      {localStorage.token && <Navbars />}
      <BrowserRouter>
        <Routes>
        <Route  path='/' element={<PrivateRoute/>}>
            <Route path="/home" element={<Home/>}/>
            <Route path="/detail" element={<Detail/>}/>
        </Route>
        <Route path="/login" element={<MainView/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
