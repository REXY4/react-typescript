import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbars from "./components/Navbars";
import { Api } from "./config/api";
import { UserContext } from "./context/userContext";
import definition from "./routes";
import PrivateRoute from "./routes/PrivateRoute";
import Detail from "./views/DetailView";
import ErrorPage from "./views/Error";
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
          {/* private */}
        <Route  path='/' element={<PrivateRoute/>}>
            {definition.filter(fil=>fil.private === true).map((item)=>
            <Route path={item.path} element={item.element}/>)}
        </Route>
        {/* public  */}
        {definition.filter(fil=>fil.private ===  false).map((item)=><Route path={item.path} element={item.element}/>)}
        <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
