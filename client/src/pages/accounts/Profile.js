import React from 'react'
import {Button, Card, Col, Form, Input, Row, Typography} from "antd";
import styled from "styled-components";

const {Text} = Typography;

const Container = styled.div`
    display:grid;
    grid-template-columns:repeat(1, 1fr);
    gap:1rem;
	width:1024px;
	max-width:100%;
	margin:10px auto;
`;

export default function Profile() {
    const onFinish = () => {

    }
    return (
        <Container>
            <Card align="center" title={<Text strong>Profile</Text>}>
                <Form
                    onFinish={onFinish}
                >
                    <Row align="center">
                        <Col span={12}>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                    {
                                        min: 5,
                                        message: '5글자를 입력해주세요. ',
                                    }
                                ]}
                                hasFeedback
                                align="center"
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row align="center">
                        <Col span={12}>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                align="center"
                            >
                                <Input.Password/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
}