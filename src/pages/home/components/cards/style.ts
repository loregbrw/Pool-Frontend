import { CardContent, Grid } from "@mui/material";
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

    &:hover {
        filter: brightness(75%) saturate(125%);
    }
`

export const StyledCardContent = styled(CardContent)`
    && {
        background-color: ${EColorPalette.FRENCHGRAY};

        display: flex;
        flex-direction: column;

        gap: 7px;
        padding: 20px;
    }

    &&:last-child {
        padding-bottom: 20px;
    }
`

export const StyledName = styled.span`
    font-weight: 700;
    font-size: 17px;
`

export const StyledDescription = styled.span`
    font-size: 14px;
    text-align: justify;
    
    display: -webkit-box;            
    -webkit-line-clamp: 3;           
    -webkit-box-orient: vertical;   
    overflow: hidden;                
    text-overflow: ellipsis; 

    filter: opacity(85%);
`

export const StyledTagName = styled.span<{bgcolor: string}>`
    position: absolute;

    color: ${(props) => getContrastYIQ(props.bgcolor)};

    font-weight: 600;
    font-size: 12px;
`