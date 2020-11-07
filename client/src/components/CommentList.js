import React, {useState} from 'react'
import {Input, Button} from "antd";
import {useAppContext} from "../store";
import Comment from "./Comment";
import { useAxios, axiosInstance} from "api";

export default function CommentList({post}) {
    const {
        store: {jwtToken}
    } = useAppContext();

    const [commentContent, setCommentComment] = useState("");

    const headers = {Authorization: `JWT ${jwtToken}`};

    const [{data: commentList, loading, error}, refetch] = useAxios({
        url: `/api/posts/${post.id}/comments/`,
        headers
    });

    const handleCommentSave = async () => {
        const apiUrl = `/api/posts/${post.id}/comments/`;

        try {
            const response = await axiosInstance.post(
                apiUrl,
                {message: commentContent},
                {headers}
            );
            console.log(response)
            setCommentComment("")
            refetch()
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div>
            {commentList &&
            commentList.map(comment => (
                <Comment key={comment.id} comment={comment}/>
            ))}

            <Input.TextArea
                style={{marginBottom: ".5em"}}
                value={commentContent}
                onChange={e => setCommentComment(e.target.value)}
            />
            <Button
                block
                type="primary"
                disabled={commentContent.length === 0}
                onClick={handleCommentSave}
            >
                댓글 쓰기
            </Button>
        </div>
    )
}