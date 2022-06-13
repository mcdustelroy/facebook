import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";
import Home from "./components/pages/Home";
import EditProfileForm from "./components/pages/EditProfileForm";
import EditBackgroundImage from "./components/pages/EditBackgroundImage";
import About from "./components/pages/About";
import PublicProfilePage from "./components/pages/PublicProfilePage";
import Register from "./components/auth/Register";
import EditProfilePic from "./components/pages/EditProfilePic";
import Login from "./components/auth/Login";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import UsersState from "./context/users/UsersState";
import CommentState from "./context/comment/CommentState";
import ProfileState from "./context/profile/ProfileState";
import PostState from "./context/post/PostState";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}


const App = () => {
	return (
    <AlertState>
		  <AuthState>		
          <UsersState>
            <PostState>
              <CommentState>
                <ProfileState>
                  <Router>
                    <Fragment>
                      <br></br>
                      <br></br>
                      <br></br>
                      <Navbar />
                      <div className="container">
                        <Alerts />
                        <Routes>
                          <Route exact path="/" element={<PrivateRoute redirect="/login" element={<Home />} />} />
                          <Route exact path="/edit/profile" element={<EditProfileForm />} />
                          <Route exact path="/edit/profilepic" element={<EditProfilePic />} />
                          <Route exact path="/edit/background-image" element={<EditBackgroundImage />} />
                          <Route exact path="/:id" element={<PublicProfilePage />} />
                          <Route exact path="/about" element={<About />} />
                          <Route exact path="/register" element={<Register />} />
                          <Route exact path="/login" element={<Login />} />
                        </Routes>
                      </div>
                    </Fragment>
                  </Router>
                </ProfileState>
              </CommentState>
            </PostState>
          </UsersState>
		  </AuthState>
    </AlertState>
  )};

export default App;
