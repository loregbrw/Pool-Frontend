import PoolLogoImg from '/PoolLogoJet.png';

import { StyledImg, StyledLogo, StyledSlogan } from './style';

const Logo = () => {
    return (
        <>
            <StyledImg>
                <StyledLogo src={PoolLogoImg} />
                <StyledSlogan>Your go-to DevOps platform!</StyledSlogan>
            </StyledImg>
        </>
    )
}

export default Logo;