import React from 'react'
import {UserOutlined} from '@ant-design/icons';
import {Button} from "antd";
import styled from 'styled-components';

const Container = styled.div`
    display:grid;
    grid-template-columns:32px 2fr 1fr;
    align-items:center;
    margin-bottom:0.5rem;
    
`
const Avator = styled.div`
    justify-self:center;
     
`
const UserName = styled.div`
`
const Action = styled.div`
    justify-self:right;
`

export default function Suggestion() {
    return (
        <Container>
            <Avator>
                <UserOutlined/>
            </Avator>
            <UserName>
                username
            </UserName>
            <Action>
                <Button size="small"> Follow </Button>
            </Action>
        </Container>
    )
}