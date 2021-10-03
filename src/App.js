import React, { Suspense, lazy } from "react";
import "./style/style.css";
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { CookiesProvider } from "react-cookie";
import RingLoader from "react-spinners/RingLoader";

const Design1 = lazy(() => import('./components/Design1'))
const EmailForForgetPass = lazy(() => import('./components/EmailForForgotPass'))
const AdminUI = lazy(() => import('./components/AdminUI'))
const Landingpage = lazy(() => import('./components/Landingpage'))
const Registration = lazy(() => import('./components/Registration'))
const Login = lazy(() => import('./components/Login'))
const GeneratedWebRegistration = lazy(() => import('./components/GeneratedWebRegistration'))
const PrayerWall = lazy(() => import('./components/PrayerWall'))
const GeneratedWebLogin = lazy(() => import('./components/GeneratedWebLogin'))
const ServiceUser = lazy(() => import('./components/ServiceUser'))
const UserSettings = lazy(() => import('./components/UserSettings'))
const Donate = lazy(() => import('./components/Donate'))
const UserPodcast = lazy(() => import('./components/UserPodcast'))

function App() {

  return (

    <CookiesProvider>
      <Router>
        <AuthProvider>

          <Switch>
            <Suspense fallback={
              <div className="middle-fix" >
                <div className="flex-default-center-xy">
                  <RingLoader color={"#533c9f"} loading={true} size={80} speedMultiplier="1.4" /><br />
                </div>
                <div className="pad-y-sm"><p><b>To God be the Glory</b></p></div></div>}>
              <Route path="/design1" exact >
                <Design1 />
              </Route>
              <Route path="/" exact >
                <Landingpage />
              </Route>
              <Route path="/registration" exact >
                <Registration />
              </Route>
              <PrivateRoute path="/adminUI" exact component={AdminUI} />

              <Route path="/login" exact >
                <Login />
              </Route>
              <Route path="/emailForgetPass" exact >
                <EmailForForgetPass />
              </Route>

              <Route path="/genWebLogin" exact >
                <GeneratedWebLogin />
              </Route>
              <Route path="/genWebRegistration" exact >
                <GeneratedWebRegistration />
              </Route>
              <Route path="/prayerWall" exact >
                <PrayerWall />
              </Route>
              <Route path="/userService" exact >
                <ServiceUser />
              </Route>
              <Route path="/userSettings" exact >
                <UserSettings />
              </Route>
              <Route path="/donationPage" exact >
                <Donate />
              </Route>
              <Route path="/userPodcast" exact >
                <UserPodcast />
              </Route>
            </Suspense>

          </Switch>
        </AuthProvider>

      </Router>
    </CookiesProvider>

  );

}

export default App;
