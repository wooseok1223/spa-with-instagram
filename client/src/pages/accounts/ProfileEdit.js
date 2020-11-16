import React, {useEffect, useState} from 'react'
import {Form, Input, Button, notification, Card, Col, Row} from 'antd'
import {SmileOutlined, FrownOutlined} from '@ant-design/icons';
import {axiosInstance, useAxios} from "api";
import styled from "styled-components";
import {useAppContext} from "../../store";

const apiUrl = "/accounts/profile/"


const Container = styled.div`
    display:grid;
    grid-template-columns:repeat(1, 1fr);
    gap:1rem;
	width:1024px;
	max-width:100%;
	margin:10px auto;
`;

export default function ProfileEdit() {
    const {store: {jwtToken}} = useAppContext()
    const headers = {'Authorization': `JWT ${jwtToken}`}
    const [fieldErrors, setFieldErrors] = useState({})
    const [urlNum, setUrlNum] = useState('')
    const [{data: originAuthor, loading, error}, refetch] = useAxios({
        url: apiUrl,
        headers
    })
    const [form] = Form.useForm();
    const urlNumber = ''

    useEffect(() => {
        if (originAuthor) {
            originAuthor.forEach((iter) => {
                form.setFieldsValue({
                    username: iter.username,
                    email: iter.email,
                    first_name: iter.first_name,
                    last_name: iter.last_name
                });
                setUrlNum(iter.pk)
            })
        }
    }, [originAuthor])


    const onFinish = (values) => {
        async function fn() {
            const {username, first_name, last_name, email} = values
            const data = {username, first_name, last_name, email}

            setFieldErrors({})
            try {

                await axiosInstance.put(apiUrl + urlNum + "/edit/", data, {headers})

                notification.open({
                    message: "프로필 수정",
                    description: "프로필 페이지로 이동합니다.",
                    icon: <SmileOutlined style={{color: "#108ee9"}}/>
                })

                window.location.replace("/accounts/profile")
            } catch (error) {
                if (error.response) {
                    notification.open({
                        message: "프로필 수정 실패",
                        description: error.response,
                        icon: <FrownOutlined style={{color: "#ff3333"}}/>
                    });

                    const {data: fieldsErrorMessages} = error.response;
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce(
                            (acc, [fieldName, errors]) => {
                                acc[fieldName] = {
                                    validateStatus: "error",
                                    help: errors.join(" ")
                                };
                                return acc;
                            },
                            {}
                        )
                    );
                }
            }
        }

        fn();
    };

    return (
        <Container>
            <Card align="center" title="Profile Edit">
                <Form
                    onFinish={onFinish}
                    initialValues={{
                        remember: true
                    }}
                    form={form}
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
                                {...fieldErrors.username}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row align="center">
                        <Col span={12}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                                {...fieldErrors.email}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row align="center">
                        <Col span={12}>
                            <Form.Item
                                label="Firstname"
                                name="first_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your firstname!',
                                    },
                                ]}
                                {...fieldErrors.first_name}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row align="center">
                        <Col span={12}>
                            <Form.Item
                                label="Lastname"
                                name="last_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your last_name!',
                                    },
                                ]}
                                {...fieldErrors.last_name}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row align="center">
                        <Col span={12}>
                            <Form.Item
                                align="center"
                            >
                                <Button type="primary" htmlType="submit" block>
                                    SignUp
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
}