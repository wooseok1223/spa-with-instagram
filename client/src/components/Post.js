import React from 'react'
import { Avatar, Card } from 'antd'
import { HeartOutlined, HeartFilled , UserOutlined } from '@ant-design/icons';

export default function Post({post}) {
    const {author, photo, caption, location, tag_set, like_user_set} = post;
    const {username, name, avatar_url} = author
    return (
        <div>
            <Card
                hoverable
                cover={<img src={photo} alt={caption}/>}
                actions={[<HeartFilled/>]}
            >
                 <Card.Meta
                     avatar={<Avatar size="large" icon={<img src={"http://localhost:8000" + avatar_url} alt={`${username}'s Avatar`}/>}/>}
                     title={location}
                     description={caption}>
                 </Card.Meta>
            </Card>
            {/*<img src={photo} alt={caption} style={{width: "100px"}}/>*/}
        </div>
    )
}