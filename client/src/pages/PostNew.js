import React, {useState} from 'react'
import styled from 'styled-components';
import PostNewForm from "../components/PostNewForm";
import {Card} from "antd";

const Container = styled.div`
   width:768px;
   margin:20px auto;
   
`;

export default function PostNew() {
    return (
        <Container>
            <Card title="새포스팅 쓰기">
                <PostNewForm/>
            </Card>
        </Container>
    )
}