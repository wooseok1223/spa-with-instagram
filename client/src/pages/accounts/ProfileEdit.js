import React, {useEffect, useState} from 'react'
import {Card} from "antd";
import styled from "styled-components";
import {useAppContext} from "../../store";
import {useAxios} from "../../api";


const Container = styled.div`
    display:grid;
    grid-template-columns:repeat(1, 1fr);
    gap:1rem;
	width:1024px;
	max-width:100%;
	margin:10px auto;
`;

const apiUrl = "/accounts/profile/"

export default function ProfileEdit() {
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
                <div>
                    Edit
                </div>
            </Card>
        </Container>
    )
}