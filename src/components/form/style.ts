import styled from "styled-components";

export const StyledContainer = styled("div")`
    display: flex;

    min-height: 100vh;
    height: fit-content;
    
    width: 100%;

    @media (max-width: 1100px) {
        flex-direction: column;
    }
`