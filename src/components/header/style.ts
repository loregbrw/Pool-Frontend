import styled from "styled-components";
import EColorPalette from "../../enums/EColorPalette";

import { Link } from "react-router-dom";

export const StyledHeader = styled.header`
    position: fixed;

    width: 100%;
    height: 50px;

    padding: 10px 30px;
    background-color: ${EColorPalette.MINTCREAM};

    display: flex;
    align-items: center;
    justify-content: space-between;

    z-index: 800;
    border-bottom: 3px solid ${EColorPalette.JET};
`

export const StyledBox = styled.div`
    display: flex;
    align-items: center;

    width: 170px;
    height: 100%;

    gap: 25px;
`

export const StyledLink = styled(Link)`

    font-size: 14px;

    text-decoration: none;
    font-weight: 700;

    position: relative;

    &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 3px;
        left: -2px;
        bottom: -2px;

        border-radius: 5px;

        background-color: ${EColorPalette.ENGINEERINGORANGE};
        transition: width 0.3s ease-out;
    }

    &:hover::after {
        width: calc(100% + 4px);
    }
`

export const StyledLogo = styled.img`
    height: 25px;
`
