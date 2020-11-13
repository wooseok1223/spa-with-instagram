import React, {useState, useEffect} from 'react'
import { Card } from "antd";
import Suggestion from "./Suggestion";
import {useAppContext} from "../store";
import {useAxios, axiosInstance} from "api";


const apiUrl = "/accounts/suggestions/"
const followUrl = "/accounts/follow/"


export default function SuggestionList({style}) {
    const {store: {jwtToken}} = useAppContext()
    const headers = {'Authorization': `JWT ${jwtToken}`}

    const [userList, setUserList] = useState([])

    const [{data: originUserList, loading, error}, refetch] = useAxios({
        url: apiUrl,
        headers
    })

    useEffect(() => {
        if (!originUserList) {
            setUserList([])
        } else {
            setUserList(originUserList.map(user => ({...user, is_follow: false})))
        }
    }, [originUserList])

    const onFollowUser = username => {
        const data = {username}
        const config = {headers}
        axiosInstance.post(followUrl, data, config)
            .then(response => {
                setUserList(prevUserList =>
                    prevUserList.map(user =>
                        (user.username !== username) ? user : {...user, is_follow: true}
                    )
                )
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div style={style}>
            {loading && <div>loading</div>}
            {error && <div>error</div>}

            <Card title="Stories" size="small">
                {userList.map((iter) => <Suggestion
                    key={iter.username}
                    suggestionUser={iter}
                    onFollowUser={onFollowUser}
                />)}
            </Card>
        </div>
    )
}