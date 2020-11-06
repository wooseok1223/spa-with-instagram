import React from 'react'
import { Avatar, Button} from "antd";
import styled from 'styled-components';

const Container = styled.div`
    display:grid;
    grid-template-columns:32px 2fr 1fr;
    align-items:center;
    margin-bottom:0.5rem;
    
`
const People = styled.div`
    justify-self:center;
    margin-right:0.5em;
`
const UserName = styled.div`
`
const Action = styled.div`
    justify-self:right;
`

export default function Suggestion( { suggestionUser} ) {
    const {username, name, avatar_url} = suggestionUser

    return (
        <Container>
            <People>
                <Avatar
                    size="small"
                    icon={<img src={"http://localhost:8000" + avatar_url} alt={`${username}'s Avatar`}/>}/>
            </People>
            <UserName>
                {name.length === 0 ? username : name}
            </UserName>
            <Action>
                <Button size="small"> Follow </Button>
            </Action>
        </Container>
    )
}