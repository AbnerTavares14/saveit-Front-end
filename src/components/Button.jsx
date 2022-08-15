import styled from "styled-components";

const Button = styled.button`
    width: 293px;
    height: 52px;
    border-radius: 13px;
    border: 0 none;
    outline: none;
    background-color: #832222;
    background-color: ${props => props.background};
    margin-top: ${props => props.margin}px;
    margin-left: ${props => props.marginLeft}px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.width}px;
    height: ${props => props.heigth}px;

    &:active{
        background-color: #C88383;
    }

    p {
        font-family: 'Italiana', serif;
        color:#FDFDFD;
        font-size: 36px;
        font-size: ${props => props.fontSize}px;
        text-transform: capitalize;
    }
`

export default Button;