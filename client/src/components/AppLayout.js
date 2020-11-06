import React from 'react'
import styled from 'styled-components';
import {Input, Menu} from 'antd'
import StoryList from "./StoryList";
import SuggestionList from "./SuggestionList";
import LogoImage from "../assets/logo.png"

const Container = styled.div`
    display:grid;
    grid-template-columns:repeat(3, 1fr);
    gap:1rem;
	width:1024px;
	max-width:100%;
	margin:10px auto;
	grid-template-areas:
        "Header Header Header"
        "Contents Contents Sidebar"
        "Footer Footer Footer";
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items:center;
    grid-area:Header;
`
const Sidebar = styled.div`
    grid-area:Sidebar;
`
const Contents = styled.div`
    grid-area:Contents;
`
const Footer = styled.div`
    grid-area:Footer;
    justify-self:center;
`

const Title = styled.span`
    align-items:center;
    font-size:24px;
`
export default function AppLayout({children}) {
    return (
        <Container>
            <Header className="Header">
                <Title>
                    {/*<img src={LogoImage} alt="logo" width="103px" height="29px" />*/}
                    LookBook
                </Title>
                <div className="Search">
                    <Input.Search/>
                </div>
                <div className="topnav">
                    <Menu mode="horizontal">
                        <Menu.Item>
                            Menu1
                        </Menu.Item>
                        <Menu.Item>
                            Menu2
                        </Menu.Item>
                        <Menu.Item>
                            Menu3
                        </Menu.Item>
                    </Menu>
                </div>
            </Header>
            <Contents>
                {children}
            </Contents>
            <Sidebar>
                <StoryList style={{ marginBottom:"1rem"}}/>
                <SuggestionList style={{ marginBottom:"1rem"}}/>
            </Sidebar>
            <Footer>
                &copy; 2020. WOOSEOK
            </Footer>


        </Container>
    )
}