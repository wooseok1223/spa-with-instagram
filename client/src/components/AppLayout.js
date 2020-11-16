import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import {Input} from 'antd'
import MenuLayout from "./MenuLayout";
import {Link} from "react-router-dom";
import {useAppContext} from "../store";
import {useAxios} from "../api";

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

const AccountsContainer = styled.div`
    display:grid;
    grid-template-columns:repeat(3, 1fr);
    gap:1rem;
	width:1024px;
	max-width:100%;
	margin:10px auto;
	grid-template-areas:
        "Header Header Header"
        "Contents Contents Contents"
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

const apiUrl = "/accounts/profile/"


export default function AppLayout({children, sidebar}) {
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
        <>
            {sidebar ? <Container>
                    <Header className="Header">
                        <Link
                            to={{
                                pathname: "/",
                            }}
                        >
                            <Title>
                                LookBook
                            </Title>
                        </Link>

                        <div className="Search">
                            <Input.Search/>
                        </div>
                        <div className="topnav">
                            <MenuLayout
                                author={author}
                            />
                        </div>
                    </Header>
                    <Contents>
                        {children}
                    </Contents>
                    {sidebar ? <Sidebar>
                        {sidebar}
                    </Sidebar> : <></>}
                    <Footer>
                        &copy; 2020. WOOSEOK
                    </Footer>
                </Container> :
                <AccountsContainer>
                    <Header className="Header">
                        <Link
                            to={{
                                pathname: "/",
                            }}
                        >
                            <Title>
                                LookBook
                            </Title>
                        </Link>

                        <div className="Search">
                            <Input.Search/>
                        </div>
                        <div className="topnav">
                            <MenuLayout
                                author={author}
                            />
                        </div>
                    </Header>
                    <Contents>
                        {children}
                    </Contents>
                    {sidebar ? <Sidebar>
                        {sidebar}
                    </Sidebar> : <></>}
                    <Footer>
                        &copy; 2020. WOOSEOK
                    </Footer>
                </AccountsContainer>}
        </>
    )
}