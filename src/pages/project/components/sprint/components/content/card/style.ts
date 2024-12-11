import styled from "styled-components";
import EColorPalette from "../../../../../../../enums/EColorPalette";

import { Paper } from "@mui/material";

export const StyledCard = styled(Paper)`

    && {
        width: 100%;
        border-radius: 5px;

        background-color: ${EColorPalette.MINTCREAM};
        
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        padding: 5px;
        
        cursor: pointer;

        gap: 7px;

        border: 3px solid ${EColorPalette.MINTCREAM};
        transition: 300ms;

        user-select: none;
    }

    &:hover {
        border: 3px solid ${EColorPalette.JET};
    }
`

export const StyledCardName = styled.span`
    font-size: 14px !important;
    font-weight: 700;

    overflow: hidden;                

    user-select: none;
    cursor: pointer;

    white-space: normal;
`

export const StyledCardDescription = styled.span`
    font-size: 12px;
    width: 100%;
    text-align: justify;
    
    display: -webkit-box;            
    -webkit-line-clamp: 10;           
    -webkit-box-orient: vertical;   
    overflow: hidden;
              
    word-wrap: break-word;
    white-space: normal;
    text-overflow: ellipsis; 

    padding: 2px;
    margin-bottom: 5px;
`

export const StyledUsers = styled.div`
    display: flex;
    flex-wrap: wrap;

    align-items: center;
    gap: 3px;

    width: fit-content;
    max-width: 100%;

    height: fit-content;
`

export const StyledImg = styled.img`
    height: 20px;
    width: 20px;
    border-radius: 50px;
`

export const StyledDate = styled.span`
    font-size: 12px;
    font-weight: 700;

    display: flex;
    align-items: flex-end;

    gap: 5px;
    user-select: none;
`

export const StyledEmoji = styled.span`

    transition: 300ms;

    margin-right: 6px;
    cursor: pointer;

    &:hover {
        filter: brightness(85%);
    }
`

export const StyledAdd = styled(Paper)`

    width: 265px;
    
    && {
        border-radius: 5px;
        background-color: ${EColorPalette.COOLGRAY};
        transition: 300ms;
    }
    
    padding: 8px;

    height: fit-content;
  
    cursor: pointer;

    &:hover {
        filter: brightness(85%) saturate(115%);
    }
`

export const StyledAddSpan = styled.span`
    font-size: 17px;
    font-weight: 700;

    user-select: none;
    
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 34px;
`
