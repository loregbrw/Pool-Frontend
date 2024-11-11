import { StyledLink } from "./style";
import { StyledHr, StyledModal } from "../style";

const ProfileModal = () => {
    return (
        <>
            <StyledModal elevation={3} style={{ top: "35px", right: "0", width: "110px", padding: "10px", gap: "5px" }} >
                <StyledLink to={"/"}>My profile</StyledLink>
                <StyledHr />
                <StyledLink to={"/"} onClick={() => localStorage.removeItem("Token")} >Log out</StyledLink>
            </StyledModal>
        </>
    )
}

export default ProfileModal;