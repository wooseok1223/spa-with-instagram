import React, {useEffect, useState} from 'react'
import {Avatar, Card, Button, Col, Row, Typography, Input} from "antd";
import styled from "styled-components";
import {useAppContext} from "../../store";
import {useAxios} from "../../api";
import {Link} from "react-router-dom";

const {Text, Title} = Typography;


const Container = styled.div`
	width:1000px;
	max-width:100%;
`;

const NameTitle = styled.div`
    display:grid;
    grid-template-columns:repeat(2, 1fr);
    gap:1rem;
	margin:10px auto;
`;


const apiUrl = "/accounts/profile/"

export default function Profile() {
    const {store: {jwtToken}} = useAppContext()
    const headers = {'Authorization': `JWT ${jwtToken}`}

    const [author, setAuthor] = useState({})

    const [{data: originAuthor, loading, error}, refetch] = useAxios({
        url: apiUrl,
        headers
    })

    useEffect(() => {
        const data = {}
        if (originAuthor) {

            originAuthor.forEach((iter) => {
                Object.assign(data, iter);
            })

            setAuthor(data)
        }
    }, [originAuthor])

    return (
        <Container>
            <Card align="center">
                <Row align="center">
                    <Col span={18} push={6}>
                        <Card>
                            <Col span={12} align="left">
                                <NameTitle>
                                    <Title level={2}>{author.username}</Title>
                                    <Link
                                        to={{
                                            pathname: "/accounts/profileEdit",
                                        }}
                                        style={{marginTop: "10px"}}
                                    >
                                            <span>
                                                프로필 수정으로 이동
                                            </span>
                                    </Link>
                                </NameTitle>
                            </Col>
                            <Col span={12} align="left">
                                <Text>{author.email}</Text>
                            </Col>
                            <Col span={12} align="left">
                                <Text>{author.first_name}{author.last_name}</Text>
                            </Col>
                            <Col span={12} align="left">
                                <Text mark>게시물 : 0 팔로워 : {author.follower_set ? author.follower_set.length : 0} 팔로우 : {author.follower_set ? author.following_set.length : 0}</Text>
                            </Col>
                        </Card>
                    </Col>
                    <Col span={6} pull={18}>
                        <Avatar size={200} icon={<img src={author.avatar_url} alt="user_profile"/>}/>
                    </Col>
                </Row>
                <Row align="center">

                </Row>
            </Card>
        </Container>
    )
}