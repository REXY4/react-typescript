import React from 'react'
import Home from '../views/HomeView'
import MainView from '../views/MainView'
import Detail from "../views/DetailView"
import PrivateRoute from './PrivateRoute'

interface Definition {
  path: string
  private : boolean,
  element: JSX.Element
}

const definition: Definition[] = [
  {
    path: '/',
    private : false,
    element: <MainView />,
  },
  {
    path: '/home',
    private : true,
    element: <Home/>,
  },
  {
    path: '/detail',
    private : true,
    element: <Detail/>,
  },
]

export default definition
