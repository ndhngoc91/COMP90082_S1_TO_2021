import React from "react"
import styled from "styled-components";
import {ErrorAlt} from "@styled-icons/boxicons-solid/ErrorAlt"

const ErrorMessage = ({message}) => {
    return (
        <Styleddiv>
            <StyledErrorAlt size="15"/>
            <ul>
                <Message>{message}</Message>
            </ul>
        </Styleddiv>
    );
}

export default ErrorMessage

const Styleddiv = styled.div`
    
        -moz-transition: all 0.4s ease;
        -o-transition: all 0.4s ease;
        -webkit-transition: all 0.4s ease;
        transition: all 0.4s ease;
        border-radius: 15px;
        pointer-events: none;
        position: fixed;
        width: 50%;
        // padding: 10px;
        background: white;
        box-shadow: 0 0 15px black;
        top: 25%;
        left: 50%;
        margin: 0 0 0 -25%;
        opacity: 0.5;
        -moz-transform: scale(1.5);
        -ms-transform: scale(1.5);
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
        pointer-events: auto;
        opacity: 1;
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -webkit-transform: scale(1);
        transform: scale(1);
        width: 50%
`;

const Message = styled.li`
    // display: list-item;
    // text-align: -webkit-match-parent;
`;


const StyledErrorAlt = styled(ErrorAlt)`
    color: red; 
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0;
    font-family: Adgs Icons;
    font-weight: 400;
    font-style: normal;
    speak: none;
    font-size: 16px;
    left: 15px;
    line-height: 20px;
    position: absolute;
    top: 15px; 
`
