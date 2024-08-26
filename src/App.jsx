
import { useAuthContext } from "./store/auth";
import { useNavigate, Outlet } from "react-router-dom";

import { useEffect } from "react";

function App() {

  const navigate = useNavigate()
  const { isLoggedIn } = useAuthContext()
  console.log(isLoggedIn)


  useEffect(() => {

    if (!isLoggedIn) {
      navigate('/auth')
    } else {
      navigate('/meals/all')

    }
  }, [isLoggedIn])

  return (
    <Outlet />
  );
}

export default App;
