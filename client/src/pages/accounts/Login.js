import React, {useState} from 'react'
import Axios from 'axios'
import {Form, Input, Button, notification, Card} from 'antd'
import {useHistory, useLocation} from 'react-router-dom'
import {SmileOutlined, FrownOutlined} from '@ant-design/icons';
import useLocalStorage from "../../utils/useLocalStorage";
import {setToken, useAppContext} from "../../store";
import {parseErrorMessages} from "../../utils/forms";


const apiUrl = "http://127.0.0.1:8000/accounts/token/"


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
                const response = await Axios.post(apiUrl, data)

                const {data: {token: jwtToken}} = response

                // setJwtToken(jwtToken)
                dispatch(setToken(jwtToken))
                notification.open({
                    message: "로그인 성공",
                    icon: <SmileOutlined style={{color: "#108ee9"}}/>
                })

                history.push(loginRedirectUrl)
            } catch (error) {
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

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    return (
        <Card title="로그인">
            <Form
                {...layout}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
            >
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
                >
                    <Input/>
                </Form.Item>

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
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}