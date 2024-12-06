import styled from "styled-components";
import EColorPalette from "../../../../../../../../../enums/EColorPalette";
import chroma from "chroma-js";
import TextareaMarkdown from "textarea-markdown-editor";

export const StyledButton = styled.button`
    width: 50px;

    font-size: 12px;
    font-weight: 500;
    color: ${EColorPalette.JET};
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    height: 23px;
    background-color: ${EColorPalette.MINTCREAM};

    border: 2px solid ${EColorPalette.JET};
    border-bottom: none;
    border-right: none;
    cursor: pointer;

    transition: 300ms;

    &:hover {
        background-color: ${chroma(EColorPalette.MINTCREAM).darken(1).hex()};
    }

    @media (max-width: 690px) {
        width: 10%;
    }

    @media (max-width: 490px) {
        width: 20%;
    }
`

export const StyledButtonRight = styled(StyledButton)`
    border-radius: 0 3px 0 0;
    border-right: 2px solid #333138;

    @media (max-width: 490px) {
        border-radius: 0;
    }
`

export const StyledButtonRightB = styled(StyledButton)`
     @media (max-width: 490px) {
        border-radius: 0 3px 0 0;
        border-right: 2px solid #333138;
    }
`

export const StyledContainer = styled.div`

    display: flex;
    flex-direction: column;
`

export const StyledTextArea = styled(TextareaMarkdown)`
    height: 500px;
    background-color: ${EColorPalette.MINTCREAM};

    font-size: 14px;

    padding: 5px;
    border-radius: 0 3px 3px 3px;
    border: 2px solid ${EColorPalette.JET};

    width: 100%;

    @media (max-width: 690px) {
        border-radius: 0 0 3px 3px;
    }

    &:focus {
        outline: none;
    }
`

export const TextareaContainer = styled.div`
    position: relative;
    display: inline-block;

`

export const StyledButtons = styled.div`
    display: flex;
    width: 100%;

    flex-wrap: wrap;
`

export const HoverButton = styled.button`
    position: absolute;

    right: -20px;
    bottom: 10px;
    padding: 5px 10px;

    background-color: ${EColorPalette.ENGINEERINGORANGE};
    color: white;
    border: none;
    border-radius: 100px;

    opacity: 0;

    cursor: pointer;
    transition: opacity 500ms ease, transform 500ms ease;   

    ${TextareaContainer}:hover & {
        opacity: 1;
        transform: translateX(-30px);
    }

    transition: 300ms;
    &:hover {
        background-color: ${chroma(EColorPalette.ENGINEERINGORANGE).darken(1).hex()};
    }
`;
