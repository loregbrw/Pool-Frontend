import { StyledImg, StyledLogo, StyledSlogan } from './style';
import PoolLogoImg from '/PoolLogoJet.png';

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