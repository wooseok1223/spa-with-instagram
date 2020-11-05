import React from 'react'
import {Route} from 'react-router-dom'
import Profile from "./Profile";
import Login from "./Login";

export default function Routes({match}) {
    return (
        <>
            <Route exact path={match.url + "/profile"} component={Profile}> </Route>
            <Route exact path={match.url + "/login"} component={Login}> </Route>
        </>
    )
}