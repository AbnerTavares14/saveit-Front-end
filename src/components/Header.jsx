import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/userContext";

export default function Header(props) {
    const { user, picture, menu, setMenu } = props;
    const [logout, setLogout] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function exit() {
        localStorage.removeItem("user");
        navigate(0);
    }


    return (
        <>
            {user ?
                <>
                    {!logout ? <Top>
                        {!menu ? <ion-icon onClick={() => setMenu(true)} name="menu-outline"></ion-icon> : <ion-icon onClick={() => setMenu(false)} name="close-sharp"></ion-icon>}
                        <Link to={'/'}>
                            <h1>SaveIt</h1>
                        </Link>
                        <img onClick={() => setLogout(!logout)} src={picture} alt="" />
                    </Top> :
                        <Top marginBottom={60}>
                            {!menu ? <ion-icon onClick={() => setMenu(true)} name="menu-outline"></ion-icon> : <ion-icon onClick={() => setMenu(false)} name="close-sharp"></ion-icon>}
                            <h1>SaveIt</h1>
                            <img onClick={() => setLogout(!logout)} src={picture} alt="" />
                        </Top>
                    }
                    {logout ? <Logout onClick={exit}><p>Logout</p></Logout> : <></>}
                </>
                :
                <Top>
                    {!menu ? <ion-icon onClick={() => setMenu(true)} name="menu-outline"></ion-icon> : <ion-icon onClick={() => setMenu(false)} name="close-sharp"></ion-icon>}
                    <h1>SaveIt</h1>
                    <Link to="/signin">
                        <h2>SignIn</h2>
                    </Link>
                </Top>}
        </>
    )

}

const Logout = styled.button`
    width: 70px;
    height: 54px;
    border-radius: 12px;
    background-color: #C88383;
    border: 0 none;
    outline: none;
    position: absolute;
    top: 60px;
    right: 0;
    margin-bottom: 20px;
    p{
        font-family: 'Judson';
        font-size: 20px;
        color: #fff;
    }
`

const Top = styled.header`
    height: 60px;
    background-color: #D9D9D9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: ${props => props.marginBottom}px;
    h1 {
        margin-left: 140px;
        color: #700C0C;
        font-family: 'Italiana', serif;
        font-size: 32px;
        text-transform: capitalize;
        text-align: center;
    }

    h2{
        margin-left: 90px;
        font-family: 'Judson', serif;
        color: #7C6868;
        text-transform: capitalize;
        font-size: 24px;
    }

    a {
        text-decoration: none;
    }

    ion-icon{
        color: #000;
        width: 20px;
        height: 20px;
    }

    img {
        margin-left: 110px;
        width: 48px;
        height: 48px;
        border-radius: 360px;
    }
    
`