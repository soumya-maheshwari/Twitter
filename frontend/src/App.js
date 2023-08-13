import "./App.css";
import Login from "./Components/Authentication/Login/Login";
import Signup from "./Components/Authentication/Signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Profilepage from "./Components/Profilepage/Profilepage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/homePage" exact element={<Homepage />} />
          <Route path="/profile" exact element={<Profilepage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
