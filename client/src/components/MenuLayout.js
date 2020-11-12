import React from 'react'
import {Avatar, Menu, notification, Button} from "antd";
import {Link} from "react-router-dom";
import {deleteToken, useAppContext} from "../store";
import {useHistory} from 'react-router-dom'
import {SmileOutlined} from "@ant-design/icons";

const {SubMenu} = Menu;

export default function MenuLayout({author}) {
    const {store: {isAuthenticated}, dispatch} = useAppContext()
    const history = useHistory()

    const Logout = () => {
        async function fn() {
            try {
                dispatch(deleteToken(""))
                notification.open({
                    message: "로그아웃 성공",
                    icon: <SmileOutlined style={{color: "#108ee9"}}/>
                })

                history.push('/')
            } catch (error) {
                console.log(error.response)
            }
        }

        fn()
    }

    return (
        <>
            {isAuthenticated}
            <Menu mode="horizontal">
                <Menu.Item>
                    Test
                </Menu.Item>
                <Menu.Item>
                    Test
                </Menu.Item>
                <SubMenu key="sub1" icon={<Avatar size="large" icon={<img src={author.avatar_url}
                                                                          alt={`${author.username}'s Avatar`}/>}/>}>
                    <Menu.Item key="1">
                        <Link
                            to={{
                                pathname: "/accounts/profile",
                            }}
                        >
                            <span>Profile</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => {
                        Logout()
                    }}>
                        <span>Logout</span>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </>
    )
}