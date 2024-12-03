import styled from "styled-components";
import EColorPalette from "../../../../../../enums/EColorPalette";


export const StyledHeader = styled.header`
    width: 100%;

    height: 30px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: sticky;

    top: 0;
    left: 0;
    z-index: 10; 
`

export const StyledIcons = styled.div`
    display: flex;
    
    width: fit-content;
    height: fit-content;

    gap: 5px;
    align-items: center;
    justify-content: flex-start;
`

export const StyledInfo = styled.div`
    display: flex;
    
    width: fit-content;
    height: 100%;

    gap: 15px;
    align-items: center;
    justify-content: flex-start;
`

export const StyledBox = styled.div`
    height: 100%;
    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    @media (max-width: 650px) {
        display: none;
    }
`

export const StyledSmallBold = styled("span")`
    font-size: 10px;
    font-weight: 600;

    margin-right: 5px;
    cursor: default;
`

export const StyledBar = styled.div`

    width: 150px;

    height: 6px;
    background-color: ${EColorPalette.COOLGRAY};

    border-radius: 10px;
`

export const StyledProgress = styled.div`
    height: 6px;
    background-color: ${EColorPalette.JET};    
    border-radius: 10px;

    transition: 300ms ease;
`;
