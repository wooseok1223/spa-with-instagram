import React from 'react'
import {Avatar, Card } from 'antd'
import {HeartOutlined, HeartTwoTone} from '@ant-design/icons';
import CommentList from "./CommentList";
import styled from "styled-components";



const Box = styled.span`
    margin:300px 100px 100px 100px;
`


export default function Post({post, handleLike}) {
    const {author, photo, caption, location, tag_set, is_like} = post;
    const {username, name, avatar_url} = author

    return (
        <div>
            <Card
                hoverable
                cover={<img src={photo} alt={caption}/>}

                actions={[
                    is_like ? (
                        <HeartTwoTone
                            twoToneColor="#eb2f96"
                            onClick={() => handleLike({post, isLike: false})}
                        />
                    ) : (
                        <HeartOutlined onClick={() => handleLike({post, isLike: true})}/>
                    )
                ]}
            >
                <Card.Meta
                    avatar={<Avatar size="large" icon={<img src={avatar_url}
                                                            alt={`${username}'s Avatar`}/>}/>}
                    title={location}
                    description={caption}>
                    style={{marginBottom:"1em"}}
                </Card.Meta>

                <Box/>

                <CommentList post={post}/>

            </Card>
            {/*<img src={photo} alt={caption} style={{width: "100px"}}/>*/}
        </div>
    )
}