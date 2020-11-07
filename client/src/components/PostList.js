import React from 'react'
import Axios from "axios";
import Post from "./Post";
import {useAppContext} from "../store";
import {Alert} from 'antd'
import useAxios from 'axios-hooks'

const apiUrl = "http://127.0.0.1:8000/api/posts/"

export default function PostList() {
    const {store: {jwtToken}} = useAppContext()
    const headers = {'Authorization': `JWT ${jwtToken}`}

    const [{data: postList, loading, error}, refetch] = useAxios({
        url: apiUrl,
        headers
    })

    return (
        <div>
            {postList && postList.length === 0 && <Alert type="warning" message='포스팅이 없습니다.'/>}
            {postList && postList.map(post => <Post post={post} key={post.id}/>)}
        </div>
    );
}

