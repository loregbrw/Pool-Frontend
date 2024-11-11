import { Grid, Paper } from "@mui/material";
import styled from "styled-components";
import EColorPalette from "../../../../enums/EColorPalette";
import chroma from "chroma-js";

const getContrastYIQ = (color: string): string => {
    const luminance = chroma(color).luminance();

    return luminance > 0.5
        ? chroma(color).darken(3).hex() 
        : chroma(color).brighten(3).hex(); 
};

export const StyledContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    gap: 20px;

    justify-content: center;
`

export const StyledGrid = styled(Grid)`
        
    cursor: pointer;
    transition: 300ms;

    border-radius: 5px;
`

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
`

export const StyledTag = styled(Paper)`
    background-color: ${EColorPalette.BURNTSIENNA};
    height: 40px;

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
`

export const StyledName = styled.span`
    font-size: 15px;
    font-weight: 700;
`

export const StyledDescription = styled.span`
    font-size: 13px;
    text-align: justify;

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