import React, {useEffect, useState} from 'react'
import Axios from "axios";
import Post from "./Post";

const apiUrl = "http://127.0.0.1:8000/api/posts/"

export default function PostList() {
    const [postList, setPostList] = useState([])

    useEffect(() => {
        Axios.get(apiUrl)
            .then(response => {
                const {data} = response
                console.log("load", response)
                setPostList(data)
            })
            .catch(error => {
                // error.response
            })
    }, [])

    return (
        <div>
            {postList.map(post => <Post post={post} key={post.id}/>)}
        </div>
    );
}

