import React from 'react'
import { Route } from 'react-router-dom'
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import LoginRequiredRoute from "../../utils/LoginRequiredRoute";
import ProfileEdit from "./ProfileEdit";

export default function Routes({match}) {
    return (
        <>
            <LoginRequiredRoute exact path={match.url + "/profile"} component={Profile}/>
            <LoginRequiredRoute exact path={match.url + "/profileEdit"} component={ProfileEdit}/>
            <Route exact path={match.url + "/login"} component={Login}/>
            <Route exact path={match.url + "/signup"} component={Signup}/>
        </>
    )
}