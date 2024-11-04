import Header from "./components/header";
import React, { useEffect, useState } from "react"
import NotificationsIcon from '@mui/icons-material/Notifications';

import { api } from "./services/api";
import { StyledProfile, StyledProfileImg } from "./style"
import { IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { StyledLink } from "./components/header/style"
import { StyledModalBackground } from "./components/modal/style";
import ProfileModal from "./components/modal/profile";

interface IUser {
  birthdate: Date;
  email: string;
  id: string;
  image: string;
  name: string;
  username: string;
}

export const App = ({ children }: { children: React.ReactNode }) => {

  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);

  const [profileModal, setProfileModal] = useState(false);

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
                  <ProfileModal />
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

