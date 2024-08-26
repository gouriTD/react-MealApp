import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'
import MealContextProvider from './store/store.jsx'
import AuthContextProvider from './store/auth.jsx'
import ModalProgressProvider from './store/modalProgress.jsx'


import Login from "./components/Login";
import Meals from "./components/Meals.jsx";
import FavouriteMeals from "./components/FavouriteMeals";
import RootLayout from "./components/RootLayout";

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/Error";

// Lets start defining our browser router here.

const routingDefinition = createRoutesFromElements(
  <Route path='/react-MealApp/' errorElement={<ErrorPage />} element={<App />}>
    <Route path='auth' element={<Login />} />
    <Route path='meals' element={<RootLayout />}>
      <Route path="all" element={<Meals />} />
      <Route path="favMeals" element={<FavouriteMeals />} />
    </Route>
  </Route>
)

const router = createBrowserRouter(routingDefinition)



ReactDOM.createRoot(document.getElementById('root')).render(

  <MealContextProvider>
    <AuthContextProvider>
      <ModalProgressProvider>
        <RouterProvider router={router} />
      </ModalProgressProvider>
    </AuthContextProvider>
  </MealContextProvider>
)
