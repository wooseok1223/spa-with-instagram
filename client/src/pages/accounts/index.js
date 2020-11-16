import React from 'react'
import { Route } from 'react-router-dom'
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import LoginRequiredRoute from "../../utils/LoginRequiredRoute";
import ProfileEdit from "./ProfileEdit";
import AppLayout from "../../components/AppLayout";

const ProfileM = () => {
    return (
        <AppLayout>
            <Profile/>
        </AppLayout>
    )
}

const ProfileE = () => {
    return (
        <AppLayout>
            <ProfileEdit/>
        </AppLayout>
    )
}

export default function Routes({match}) {
    return (
        <>
            <LoginRequiredRoute exact path={match.url + "/profile"} component={ProfileM}/>
            <LoginRequiredRoute exact path={match.url + "/profileEdit"} component={ProfileE}/>
            <Route exact path={match.url + "/login"} component={Login}/>
            <Route exact path={match.url + "/signup"} component={Signup}/>
        </>
    )
}