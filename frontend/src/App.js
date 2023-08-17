import "./App.css";
import Login from "./Components/Authentication/Login/Login";
import Signup from "./Components/Authentication/Signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Profilepage from "./Components/Profilepage/Profilepage";
import ForgotPassword from "./Components/Authentication/ForgotPassword/ForgotPassword";
import OtpPage from "./Components/Authentication/OtpPage/OtpPage";
import OthersProfile from "./Components/OthersProfile/OthersProfile";
import Search from "./Components/Search/Search";
import Bookmarks from "./Components/Bookmarks/Bookmarks";
import Logout from "./Components/Logout/Logout";
import Notification from "./Components/Notifications/Notifications";
import EditProfile from "./Components/Profilepage/EditProfile";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/homePage" exact element={<Homepage />} />
          <Route path="/profile" exact element={<Profilepage />} />
          <Route path="/forgotPassword" exact element={<ForgotPassword />} />
          <Route path="/verifyOTP" exact element={<OtpPage />} />
          <Route
            path="/otherProfile/:username"
            exact
            element={<OthersProfile />}
          />
          <Route path="/search" exact element={<Search />} />
          <Route path="/logout" exact element={<Logout />} />
          <Route path="/notifications" exact element={<Notification />} />
          <Route path="/editProfile" exact element={<EditProfile />} />

          <Route path="/bookmarks" exact element={<Bookmarks />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
