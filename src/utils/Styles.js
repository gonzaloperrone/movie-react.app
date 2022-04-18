import styled from 'styled-components';

export const Heading = styled.h1`
text-align: center;
color: green;
`;

export const Content = styled.div`
overflowY: scroll;
height: 2500px;
`;

export const Button = styled.div`
    position: fixed;
    bottom: 50px;
    right: 50px;
    border: 4px solid transparent;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    font-size: 80px;
    cursor: pointer;
    transition: all 300ms ease;
    color: rgb(56, 115, 245);
`
