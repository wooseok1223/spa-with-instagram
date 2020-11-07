import React from 'react'
import PostList from "../components/PostList";
import AppLayout from "../components/AppLayout";
import StoryList from "../components/StoryList";
import SuggestionList from "../components/SuggestionList";
import {Button} from 'antd'
import {useHistory} from 'react-router-dom'

export default function Home() {
    const history = useHistory()
    const HandleClick = () => {
        history.push("/posts/new")
    }
    const sidebar = (
        <>
            <Button type="primary"
                    block style={{ marginBottom : "1rem"}}
                    onClick={HandleClick}
            >
                새포스팅 쓰기
            </Button>
            <StoryList style={{marginBottom: "1rem"}}/>
            <SuggestionList style={{marginBottom: "1rem"}}/>
        </>
    )
    return (
        <AppLayout sidebar={sidebar}>
            <PostList/>
        </AppLayout>
    )
}