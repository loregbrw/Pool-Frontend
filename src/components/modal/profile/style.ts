import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
    font-size: 14px;
    font-weight: 600;

    text-decoration: none;

    width: 100%;
    text-align: right;

    &:hover {
        text-decoration: underline;
    }
`
