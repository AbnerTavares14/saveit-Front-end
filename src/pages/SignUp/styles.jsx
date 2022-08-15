import styled from "styled-components";


const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 50px;
`

const Main = styled.main`
    h1 {
        margin-top: 140px;
        font-family: 'Italiana', serif;
        color: #832222;
        font-size: 64px;
        line-height: 75.39px;
        text-transform: capitalize;
        text-align: center;
        text-shadow: 0px 6px 4px rgba(0, 0, 0, 0.25);
    }

    h2 {
        font-family: 'Lato', sans-serif;
        font-size: 20px;
        text-align: center;
        color: #532727;
        margin-top: 30px;
        cursor: pointer;
        &:active{
            color: #D9D9D9;
        }
    }

    a {
        text-decoration: none;
    }
`

export {
    Main,
    Form
}