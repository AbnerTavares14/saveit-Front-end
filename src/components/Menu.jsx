import styled from "styled-components";

const Menu = styled.aside`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: #D2A0A0;
    border-right: #C88383 solid 1px;
    filter: drop-shadow(7px 4px 4px rgba(0, 0, 0, 0.25));
    @media(min-width: 600px){
        width: 460px;
    }
`

export default Menu;