import React from 'react'
import {Avatar, Menu} from "antd";
import {Link} from "react-router-dom";
import {useAppContext} from "../store";

const {SubMenu} = Menu;

export default function MenuLayout({author}) {
    const {store: {isAuthenticated}} = useAppContext()
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
                        </Link></Menu.Item>
                    <Menu.Item key="2">Logout</Menu.Item>
                </SubMenu>
            </Menu>
        </>
    )
}