import Header from "../../components/header";
import ImgInitial from "/NotAllEroesWearCapes.png"

import { StyledLink } from "../../components/header/style";
import { StyledMain } from "../../components/style";
import { StyledFooter } from "./style";

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
                helloo
            </StyledMain>
            <StyledFooter/>
        </>
    )
}

export default Landing;