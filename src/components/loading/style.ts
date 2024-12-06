import styled from "styled-components";
import EColorPalette from "../../enums/EColorPalette";

export const LoadingContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

export const Ripple = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    & div {
        position: absolute;
        border: 4px solid ${EColorPalette.JET};
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1.2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    & div:nth-child(2) {
        animation-delay: -0.5s;
    }

    @keyframes lds-ripple {
        0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0px;
            left: 0px;
            width: 72px;
            height: 72px;
            opacity: 0;
        }
    }
`;