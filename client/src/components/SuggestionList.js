import React, {useState, useEffect} from 'react'
import {Card} from "antd";
import Suggestion from "./Suggestion";
import Axios from "axios";
import {useAppContext} from "../store";

const apiUrl = "http://127.0.0.1:8000/accounts/suggestions/"

export default function SuggestionList({style}) {
    const {store: {jwtToken}} = useAppContext()
    const [userList, setUserList] = useState([])

    useEffect(() => {
        async function fetchUserList() {
            const headers = {'Authorization': `JWT ${jwtToken}`}
            try {
                const { data } = await Axios.get(apiUrl, {headers})
                setUserList(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchUserList();

    }, [])

    return (
        <div style={style}>
            <Card title="Stories" size="small">
                {userList.map( (iter) => <Suggestion key={iter.username} suggestionUser={iter}/>)}
            </Card>
        </div>
    )
}