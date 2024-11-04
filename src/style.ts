import styled from "styled-components";

export const StyledProfileImg = styled.img`
    height: 30px;
    width: 30px;
    border-radius: 100%;

    cursor: pointer;
    transition: 300ms;

    &:hover {
        filter: brightness(75%) saturate(125%);
    }
`
export const StyledProfile = styled.div`
    display: flex;

    position: relative;
`