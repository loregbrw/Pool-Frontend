import styled from "styled-components"
import EColorPalette from "../../../../enums/EColorPalette"
import chroma from "chroma-js"
import { getContrastYIQ } from "../../../../components/style"

export const StyledHeader = styled.header`
    display: flex;
    width: 100%;
    justify-content: space-between;

    height: max-content;

    @media (max-width: 860px) {
        flex-direction: column-reverse;
        align-items: flex-end;

        gap: 10px;
    }
`

export const StyledContainer = styled.div<{max: string}>`
    display: flex;
    gap: 15px;
    align-items: center;

    width: 100%;
    max-width: ${(props) => props.max};

    justify-content: flex-end;
`

export const StyledSelect = styled("select")<{color? : string, bgcolor: string}>`

    cursor: pointer;
    transition: 300ms;

    border: none;
    border-radius: 5px;

    background-color: ${(props) => props.bgcolor};
    color: ${(props) =>  props.color || getContrastYIQ(props.bgcolor)};

    width: 100px;
    height: 100%;

    padding: 5px;
    font-size: 12px;
    font-weight: 700;

    & select {
        width: 100px;
    }

    &:hover {
        background-color: ${chroma(EColorPalette.COOLGRAY).darken(1).hex()};
    }
`

export const StyledOption = styled("option") <{ bgcolor: string }>`
    font-size: 12px;
    background-color: ${(props) => props.bgcolor};
    color: ${(props) => getContrastYIQ(props.bgcolor)};
`

export const StyledSearch = styled("input")`

    height: 100%;
    width: 100%;
    max-width: 250px;

    font-weight: 600;
    padding: 5px;
    color: ${EColorPalette.JET};

    border-radius: 5px;
    border: 2px solid ${EColorPalette.JET};
    font-family: 'Euclid Circular A', sans-serif;

`

export const StyledImg = styled.img`
    height: 20px;

    @media (max-width: 450px) {
        display: none;
    }
`

export const StyledDiv = styled.div`
    height: 100%;
    position: relative;
`