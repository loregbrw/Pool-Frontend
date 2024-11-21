import { Grid, Paper } from "@mui/material";
import styled from "styled-components";
import EColorPalette from "../../../../enums/EColorPalette";
import chroma from "chroma-js";
import { getContrastYIQ } from "../../../../components/style";

export const StyledContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    gap: 20px;

    justify-content: center;
`

export const StyledGrid = styled(Grid)`
    display: flex;
    flex-direction: column;
    align-items: stretch; /* Faz os itens preencherem toda a altura */
    cursor: pointer;
    transition: 300ms;
    border-radius: 5px;
`;


export const StyledCard = styled(Paper)` 

    && {
        background-color: ${EColorPalette.FRENCHGRAY};
        
        cursor: pointer;
        transition: 300ms;
    }

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;

    gap: 10px;
    padding: 10px;

    border-radius: 5px;

    &:hover {
        filter: brightness(85%) saturate(115%);
    }
`

export const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    gap: 10px;
    padding: 0 3px;

    height: calc(100% - 45px);
`

export const StyledTag = styled.div`
    background-color: ${EColorPalette.BURNTSIENNA};
    height: 35px;

    width: 100%;
    border-radius: 3px;
    position: relative;

    display: flex;
    align-items: flex-end;  
`

export const StyledTagName = styled.span<{color: string}>`
    color: ${(props) => getContrastYIQ(props.color)};
    padding: 3px 5px;

    font-size: 10px;
    font-weight: 500;

    filter: opacity(50%);
`

export const StyledName = styled.span`
    font-size: 15px;
    font-weight: 700;
`

export const StyledDescription = styled.span`
    font-size: 13px;
    text-align: justify;

    height: 100%;
    color: #454545;

    display: -webkit-box;            
    -webkit-line-clamp: 3;           
    -webkit-box-orient: vertical;   
    overflow: hidden;                
    text-overflow: ellipsis; 
`

export const StyledDiv = styled.div`
    display: flex;
    gap: 5px;

`

export const StyledImg = styled.img`
    height: 20px;
    border-radius: 999px;
`

export const StyledSection = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 10px;

    background-color: ${chroma(EColorPalette.MINTCREAM).darken(0.2).hex()};
    padding: 15px;
    border-radius: 5px;
`

export const StyledSectionName = styled.span`
    font-size: 20px;
    font-weight: 700;

    color: #454545;
`

export const StyledMain = styled.main`
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 20px;
`