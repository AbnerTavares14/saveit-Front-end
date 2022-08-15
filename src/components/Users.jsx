import { useState } from "react";
import styled from "styled-components";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Users(props) {
    const { picture, username, userId } = props;
    const navigate = useNavigate();
    async function redirectUser() {
        try {
            navigate(`/user/${userId}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <UserContainer onClick={redirectUser}>
                <img src={picture} alt="" />
                <h3>{username}</h3>
            </UserContainer>
        </>
    )
}

const UserContainer = styled.div`
    height: 54px;
    background-color: #C88383;
    display: flex;
    align-items: center;
    margin-top: 22px;
    padding-left: 10px;
    img {
        width: 46px;
        height: 46px;
        border-radius: 360px;
    }

    h3 {
        font-family: 'Judson', 'Serif';
        font-size: 32px;
        color: #FFF;
        margin-left: 6px;
    }
`