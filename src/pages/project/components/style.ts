import chroma from "chroma-js";
import styled from "styled-components";
import EColorPalette from "../../../enums/EColorPalette";

export const StyledProject = styled.main`
    padding-top: 50px;
    width: 100%;
    height: 100vh;
`

export const StyledName = styled.span`
    font-size: 17px;
    font-weight: 700;

    cursor: pointer;
    transition: 300ms;

    user-select: none;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    width: fit-content;
    user-select: none;

    &:hover {
        color: ${chroma(EColorPalette.JET).darken(1).hex()}
    }
`

export const StyledDescription = styled.span`
    text-align: justify;
    font-size: 12px;
    
    display: -webkit-box;            
    -webkit-line-clamp: 3;           
    -webkit-box-orient: vertical;   
    
    overflow: hidden;                
    text-overflow: ellipsis;

    width: 100%;
    cursor: default;
`