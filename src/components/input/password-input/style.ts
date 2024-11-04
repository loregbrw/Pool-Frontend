import styled from "styled-components";
import EColorPalette from "../../../enums/EColorPalette";
import chroma from "chroma-js";
import { Link } from "react-router-dom";

export const StyledContainer = styled.div`

    display: flex;
    flex-direction: column;

    gap: 5px;

`

export const StyledObs = styled.div`

    display: flex;
    justify-content: space-between;

    width: 100%;

`

export const StyledDiv = styled.div`
    display: flex;
    gap: 7px;

    align-items: center;
`

export const StyledSpan = styled.span`

    font-size: 13px;
    color: ${EColorPalette.JET};

    cursor: default;
`

export const StyledLink = styled(Link)`

    font-size: 14px;
    font-weight: 600;

    text-align: right;
    
    color: ${EColorPalette.JET};
    
    cursor: pointer;
    transition: 300ms;
    
    &:hover {
        color: ${chroma(EColorPalette.JET).darken(1).hex()};
    }

`