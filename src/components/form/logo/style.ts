import styled from "styled-components";

export const StyledImg = styled.div`
    display: flex;

    min-height: 100%;

    width: 50%;
    
    background-image: url('/BackgroundLogin.jpeg');
    background-position: center;
    background-size: cover;

    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding: max(7.5%, 35px);

    @media (max-width: 1100px) {
        display: none;
    }
`
export const StyledLogo = styled.img`
    width: min(75%, 550px);
`
export const StyledSlogan = styled.span`
    font-size: 25px;
    font-weight: 700;
    text-align: center;
` 