import Header from "../../components/header";

import { StyledFooter } from "./style";
import { StyledMain } from "../../components/style";
import { StyledLink } from "../../components/header/style";

const Landing = () => {
    return(
        <>
            <Header rightChildren={
                <>
                    <StyledLink to={"/signup"} >Join now</StyledLink>
                    <StyledLink to={"/login"} >Sign in</StyledLink>
                </>
            } />
            <StyledMain >
                helloooo
            </StyledMain>
            <StyledFooter/>
        </>
    )
}

export default Landing;