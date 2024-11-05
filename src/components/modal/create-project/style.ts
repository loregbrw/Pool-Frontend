import styled from "styled-components";
import EColorPalette from "../../../enums/EColorPalette";

import { getContrastYIQ } from "../../style";

export const StyledDiv = styled.div`
    display: flex;
    width: 100%;

    gap: 15px;
`

export const StyledSelect = styled.select<{ bgcolor: string }>`
    border: none;

    height: 30px;
    padding: 3px 5px;
    
    background-color: ${(props) => props.bgcolor};
    color: ${(props) => getContrastYIQ(props.bgcolor)};
    
    width: 100%;
    border-radius: 5px;
`

export const StyledTextArea = styled.textarea`
    border: none;

    height: 100px;
    padding: 3px 5px;
    background-color: ${EColorPalette.FRENCHGRAY};

    width: 100%;
    border-radius: 5px;
`

export const StyledOption = styled.option<{ bgcolor: string }>`
    background-color: ${(props) => props.bgcolor};
    color: ${(props) => getContrastYIQ(props.bgcolor)};
`