import React from 'react'
import {useAppContext} from "../store";
import {Route, Redirect} from "react-router-dom"

export default function LoginRequiredRoute({component : Component, ...kwargs}) {
    const {store: {isAuthenticated}} = useAppContext()

    console.log(isAuthenticated)
    if (isAuthenticated) {

    } else {

    }

    return (
        <Route {...kwargs} render={props => {
            if (isAuthenticated) {
                return <Component {...props}/>
            } else {
                return <Redirect to={{
                    pathname : "/accounts/login",
                    state : {from : props.location}
                }}/>
            }
        }}/>
    )
}