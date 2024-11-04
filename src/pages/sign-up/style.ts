import styled from "styled-components";
import EColorPalette from "../../enums/EColorPalette";

export const StyledProgress = styled.div`
    width: 100%;
    background-color: ${EColorPalette.JET};
    height: 20px;
    border-radius: 5px;

    border: solid 4px ${EColorPalette.JET};
    overflow: hidden;
`;

export const StyledBar = styled.div<{ width: string; bgcolor: string }>`
    height: 100%;
    width: ${(props) => props.width};
    background-color: ${(props) => props.bgcolor};
    transition: width 300ms ease;

    border-radius: 3px;
`;

export const StyledText = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
`

export const StyledSpan = styled.span`
    font-size: 14px;

    cursor: default;
`

export const StyledRule = styled.div`
    display: flex;
    gap: 5px;
`