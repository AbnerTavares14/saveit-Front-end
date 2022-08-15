import styled from "styled-components";

const SearchUsers = styled.aside`
    display: flex;
    position: relative;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    input {
        width: 409px;
        height: 45px;
        border-radius: 10px;
        border: 0 none;
        outline: none;
        background-color: #D7CCCC;

        ::placeholder {
            font-family: 'Judson', serif;
            font-size: 32px;
            color: #B1A0A0;
            padding-left: 10px;
        }
    }
    ion-icon{
        width: 30px;
        height: 30px;
        color: #B1A0A0;
        position: absolute;
        top: 3px;
        right: 15px;
    }

    @media(min-width: 450px){
        ion-icon{
            position: static;
            background-color: #D7CCCC;
            margin-left: 5px;
            border-radius: 3px;
            justify-content: space-evenly;
        }
    }
`

export default SearchUsers;