import Header from "./components/header";
import React, { useEffect, useState } from "react"
import OptionsModal from "./components/modal/options";
import NotificationsIcon from '@mui/icons-material/Notifications';

import { api } from "./services/api";
import { IconButton } from "@mui/material"
import { StyledLink } from "./components/header/style"
import { StyledProfile, StyledProfileImg } from "./style"
import { StyledModalBackground } from "./components/modal/style";
import { useNavigate } from "react-router-dom";

interface IUser {
  birthdate: Date;
  email: string;
  id: string;
  image: string;
  name: string;
  username: string;
}

export const App = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<IUser | null>(null);
  const [profileModal, setProfileModal] = useState(false);

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
      <Header
        leftChildren={
          <StyledLink to="/home">Home page</StyledLink>
        }
        rightChildren={
          <>
            <StyledLink to="/calendar">Calendar</StyledLink>
            <IconButton size="small" aria-label="notifications" >
              <NotificationsIcon fontSize="small" />
            </IconButton>
            <StyledProfile>
              <StyledProfileImg src={user?.image} onClick={() => setProfileModal(true)} />
              {
                profileModal &&
                <>
                  <OptionsModal options={[
                    { label: "My profile", action: () => {} },
                    { label: "Log out", action: () => {
                      localStorage.removeItem("Token");
                      navigate("/");
                    }}
                  ]}
                  align="right" />
                  <StyledModalBackground onClick={() => setProfileModal(false)} />
                </>
              }
            </StyledProfile>
          </>
        }
      />

      {children}
    </>
  )
}

