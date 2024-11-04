import React from "react"

import { StyledBox, StyledHeader, StyledLogo } from "./style";

interface IHeaderProps {
    leftChildren?: React.ReactNode;
    rightChildren: React.ReactNode;
}

const Header = ({ leftChildren, rightChildren }: IHeaderProps) => {

    return (
        <>
            <StyledHeader>
                <StyledBox>
                    { leftChildren }
                </StyledBox>
                <StyledLogo src="/PoolLogoRed.png" />
                <StyledBox style={{ justifyContent: "flex-end" }}>
                    { rightChildren }
                </StyledBox>
            </StyledHeader>
        </>
    )
}

export default Header;