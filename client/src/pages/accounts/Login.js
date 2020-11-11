import React, {useState} from 'react'
import {Form, Input, Button, notification, Card, Typography, Row, Col, Menu} from 'antd'
import {useHistory, useLocation} from 'react-router-dom'
import {SmileOutlined, FrownOutlined} from '@ant-design/icons';
import {setToken, useAppContext} from "../../store";
import {parseErrorMessages} from "../../utils/forms";
import {axiosInstance} from "api";
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const apiUrl = "/accounts/token/"
const {Text} = Typography;


const Container = styled.div`
    display:grid;
    grid-template-columns:repeat(1, 1fr);
    gap:1rem;
	width:1024px;
	max-width:100%;
	margin:10px auto;
`;


export default function Login() {
    const {dispatch} = useAppContext()
    const location = useLocation()
    const history = useHistory()
    const [fieldErrors, setFieldErrors] = useState({})
    // const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "")
    const {from: loginRedirectUrl} = location.state || {
        from:
            {pathname: '/'}
    };


    const onFinish = (values) => {
        async function fn() {
            const {username, password} = values
            const data = {username, password}
            setFieldErrors({})

            try {
                const response = await axiosInstance.post(apiUrl, data)
                const {data: {token: jwtToken}} = response

                // setJwtToken(jwtToken)
                dispatch(setToken(jwtToken))
                notification.open({
                    message: "로그인 성공",
                    icon: <SmileOutlined style={{color: "#108ee9"}}/>
                })

                history.push(loginRedirectUrl)
            } catch (error) {
                console.log(error.response)
                if (error.response) {
                    notification.open({
                        message: "로그인 실패",
                        description: "아이디/암호를 확인해주세요.",
                        icon: <FrownOutlined style={{color: "#ff3333"}}/>
                    });

                    const {data: fieldsErrorMessages} = error.response;
                    setFieldErrors(
                        parseErrorMessages(fieldsErrorMessages)
                    );
                }
            }
        }

        fn();
    };


    return (
        <Container>
            <Card align="center" title={<Text strong>Sign In</Text>}>
                <Form
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
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
                                {...fieldErrors.non_field_errors}
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
                                {...fieldErrors.password}
                                align="center"
                            >
                                <Input.Password/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row align="center">
                        <Col span={12}>
                            <Form.Item
                                align="center"
                            >
                                <Button type="primary" htmlType="submit" block>
                                    Login
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row align="center">
                        <Col span={12} align="center"><Text mark>Forgot your password.</Text></Col>
                        <Col span={12} align="center">
                            <Link
                                to={{
                                    pathname: "/accounts/signup",
                                }}
                            >
                                <Text mark>
                                    Don't have an account? Sign Up
                                </Text>
                            </Link>
                        </Col>
                    </Row>

                </Form>
            </Card>
        </Container>
    )
}