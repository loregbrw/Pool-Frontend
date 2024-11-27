import styled from "styled-components";
import EColorPalette from "../../../../enums/EColorPalette";
import chroma from "chroma-js";

export const StyledSprint = styled.main`
    display: flex;
    flex-direction: column;

    height: calc(100% - 50px);
    width: 100%;

    padding: 10px 30px;

    background-color: ${ EColorPalette.FRENCHGRAY};

    display: block;

    overflow-x: auto;
    white-space: nowrap;

    &::-webkit-scrollbar {
        background-color: ${EColorPalette.JET};

        height: 13px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${EColorPalette.COOLGRAY};
        border-radius: 15px;

        border: solid ${EColorPalette.JET} 3px;
    }
`

export const StyledCards = styled.div`

`

export const StyledFooter = styled.footer`
    height: 50px;
    background-color: ${EColorPalette.MINTCREAM};

    display: flex;
    padding: 5px 30px;

    align-items: center;
    justify-content: space-between;
`

export const StyledSprintName = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    justify-content: center;
`

export const StyledForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
`

export const StyledNameInput = styled.input`
    font-size: 16px;
    font-weight: 700;

    min-width: fit-content;
    background-color: transparent;

    min-width: 150px;
    width: 100%;

    border-radius: 5px;
    border: 2px solid ${EColorPalette.JET};

    padding: 0 3px;
    text-align: center;
`