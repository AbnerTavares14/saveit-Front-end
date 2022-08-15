import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../services/api";

export default function Posts(props) {
    const { username, picture, likes, userId, id, profile, token } = props;
    const [over, setOver] = useState(false);
    const [like, setLike] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                if (token) {
                    const { data } = await api.verifyIfUserLikedPost(id, token);
                    setLike(data);
                } else {
                    setLike("noToken")
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [token]);

    async function liked() {
        try {
            await api.like(id, token);
            setLike(true);
        } catch (error) {
            console.log(error);
        }
    }

    async function unliked() {
        try {
            await api.unlike(id, token);
            setLike(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {!over ?
                <Div>
                    <Img onClick={() => setOver(true)} src={picture} alt="" />
                </Div>
                :
                <Div color={like ? "red" : "#fff"} onClick={() => setOver(false)}>
                    <Img blur={"blur(4px) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"} src={picture} alt="" />
                    <h1>{username}</h1>
                    <img className="profile" src={profile} alt="" />
                    {like !== "noToken" ?
                        <>
                            {!like ? <ion-icon onClick={liked} name="heart"></ion-icon> : <ion-icon onClick={unliked} name="heart"></ion-icon>}
                        </>
                        :
                        <></>
                    }
                </Div>}
        </>
    )
}

const Div = styled.div`
    width: 183px;
    position: relative;
    height: 386px;
    border-radius: 8px;
    filter: drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.25));
    margin-top: 12px;
    margin-left: 17px;
    cursor: pointer;

    img {
        width: 183px;
        height: 386px;
    }

    h1 {
        position: absolute;
        top: 10px;
        left: 40px;
        font-family: 'Italiana', serif;
        color: #440C0C;
        font-size: 24px;
    }

    .profile {
        width: 25px;
        height: 25px;
        border-radius: 360px;
        position: absolute;
        top: 10px;
        left: 10px;
    }


    ion-icon[name='heart'] {
        width: 24px;
        height: 24px;
        position: absolute;
        bottom: 10px;
        left: 10px;
        color: ${props => props.color};
    }
`

const Img = styled.img`
    width: 183px;
    height: 386px;
    border-radius: 8px;
    filter: drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.25));
    filter: ${props => props.blur};
`