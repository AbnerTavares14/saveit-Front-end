import styled from "styled-components";

const Input = styled.input`
    width: 380px;
    height: 45px;
    border-radius: 6px;
    background-color: #FCDDEC;
    border: 0 none;
    outline: none;
    margin-top: ${props => props.margin}px;
    margin-left: ${props => props.marginLeft}px;

    ::placeholder {
        font-family: 'Jomolhari', serif;
        font-size: 16px;
        color: #7E7E7E;
        padding-left: 10px;
        text-transform: capitalize;
    }
`
export default Input;