import { useContext, useEffect, useState } from "react"
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton } from "@mui/material";
import { ThemeContext } from "../../contexts/theme";
import { StyledBox, StyledHeader, StyledLink, StyledLogo, StyledProfile } from "./style";

interface IUser {
    birthdate: Date;
    email: string;
    id: string;
    image: string;
    name: string;
    username: string;
}

export const Header = () => {

    const [user, setUser] = useState<IUser | null>(null);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await api.get("/users", {
                    headers: {
                        'Authorization': `Baerer ${localStorage.getItem("Token")}`,
                    }
                });

                setUser(response.data.user);
            } catch (error) {
                console.log(error);
            }
        }

        getUser();
    }, [])

    return (
        <>
            <StyledHeader>
                <StyledBox>
                    <StyledLink to="/home">Página Inicial</StyledLink>
                </StyledBox>
                <StyledLogo src="/LogoPoolRed.png" />
                <StyledBox>
                    <StyledLink to="/calendar">Calendário</StyledLink>
                    <IconButton size="small" aria-label="notifications" >
                        <NotificationsIcon fontSize="small" />
                    </IconButton>
                    <StyledProfile src={user?.image} onClick={()=> navigate("/profile")} />
                </StyledBox>
            </StyledHeader>
        </>
    )
}