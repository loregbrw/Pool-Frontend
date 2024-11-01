import styled from "styled-components";
import { Button, Link, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import chroma from "chroma-js";
import EColorPalette from "../../../enums/EColorPalette";

export const StyledHeader = styled("header")`

    display: none;

    @media (max-width: 1100px) {

        background-image: url('/BackgroundLogin.jpeg');
        background-position: center;
        background-size: cover;

        display: block;
        width: 100%;
        height: 50px;

        position: fixed;
        z-index: 1000;
    }
`

export const StyledBack = styled("img")`
    position: fixed;
    left: 15px;
    top: 15px;

    height: 50px;
    padding: 5px;
    border-radius: 50%;
    
    cursor: pointer;
    transition: 300ms;

    @media (max-width: 1100px) {
        top: 65px;
    }

    &:hover {
        filter: brightness(75%) saturate(125%);
        background-color: rgba(0, 0, 0, 0.15);
    }
`

export const StyledContainer = styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    min-height: 100vh;
    
    width: 50%;
    padding: 140px 35px;
    
    @media (max-width: 1100px) {
        width: 100%;
    }
`

export const StyledForm = styled("form")`
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 30px;
    flex-direction: column;
    
    width: 100%;
    max-width: 400px;
`

export const StyledTitle = styled("span")`
    font-size: 40px;
    font-weight: 700;
`

export const StyledDiv = styled("div")`
    display: flex;
    flex-direction: column;
    
    gap: 20px;
    width: 100%;
`

export const StyledField = styled("div")`
    display: flex;
    flex-direction: column;

    width: 100%;
`
export const StyledInput = styled(TextField)`

    & label {
      font-family: 'Euclid Circular A', sans-serif;
    }

    & label.Mui-focused {
        font-weight: 600;
        color: ${EColorPalette.JET};
        font-family: 'Euclid Circular A', sans-serif;
    }

    & .MuiOutlinedInput-root {
        & fieldset {
            border-color: ${EColorPalette.JET};
            border-width: 2px;
            border-radius: 5px;
        }
    
        &.Mui-focused fieldset {
            border-color: ${EColorPalette.JET};
        }

        & input {
            font-family: 'Euclid Circular A', sans-serif;
        }
    }
`

export const StyledDate = styled(DatePicker)`
    & label {
      font-family: 'Euclid Circular A', sans-serif;
    }

    & label.Mui-focused {
        font-weight: 600;
        color: ${EColorPalette.JET};
        font-family: 'Euclid Circular A', sans-serif;
    }

    & .MuiOutlinedInput-root {
        & fieldset {
            border-color: ${EColorPalette.JET};
            border-width: 2px;
            border-radius: 5px;
        }
    
        &.Mui-focused fieldset {
            border-color: ${EColorPalette.JET};
        }

        & input {
            font-family: 'Euclid Circular A', sans-serif;
        }
    }
`

export const StyledObs = styled(Link)`

    width: 100%;
    text-align: right;

    color: ${EColorPalette.JET};

    cursor: pointer;
    transition: 300ms;

    &:hover {
        color: ${chroma(EColorPalette.JET).darken(1).hex()};
    }
`

export const StyledButton = styled(Button)`

    && {
        border-radius: 5px;
        color: ${EColorPalette.MINTCREAM};
        background-color: ${EColorPalette.JET};

        font-size: 15px;
        font-weight: 500;
        font-family: 'Euclid Circular A', sans-serif;
        
        width: 100%;
    
        cursor: pointer;
        transition: 300ms;
    }


    &:hover {
        background-color: ${chroma(EColorPalette.JET).darken(1).hex()};
    }
`