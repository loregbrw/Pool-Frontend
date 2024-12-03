import ForumIcon from '@mui/icons-material/Forum';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useEffect, useState } from "react";
import { StyledBar, StyledBox, StyledHeader, StyledIcons, StyledInfo, StyledProgress, StyledSmallBold } from "./style";
import { IconButton } from '@mui/material';
import { StyledButton } from '../../../../../../components/style';
import EColorPalette from '../../../../../../enums/EColorPalette';

interface IHeaderSprintProps {
    timeProgress: number;
    tasksProgress: number;
}

const HeaderSprint = ({ timeProgress, tasksProgress }: IHeaderSprintProps) => {

    const [color, setColor] = useState("");

    useEffect(() => {
        const diff = tasksProgress - timeProgress;

        if (tasksProgress === 1 || diff > 0.3)
            setColor("#33b88c");
        else if (diff > 0.1)
            setColor("#43b833")
        else if (diff < -0.3)
            setColor("#b83c33");
        else if (diff < -0.1)
            setColor("#b87c33");
        else
            setColor("#9db833");

    }, [timeProgress, tasksProgress]);

    return (
        <>
            <StyledHeader>
                <StyledIcons>
                    <IconButton size="small" aria-label="notifications" >
                        <NotificationsIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" aria-label="notifications" >
                        <ForumIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" aria-label="notifications" >
                        <DesignServicesIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" aria-label="notifications" >
                        <AddCircleOutlineIcon fontSize="small" />
                    </IconButton>
                </StyledIcons>
                <StyledInfo>
                    <StyledBox>
                        <StyledIcons>
                            <StyledSmallBold>Time passed:</StyledSmallBold>
                            <StyledBar>
                                <StyledProgress style={{ width: `${timeProgress * 100 > 100 ? 100 : timeProgress * 100}%` }} />
                            </StyledBar>
                        </StyledIcons>
                        <StyledIcons>
                            <StyledSmallBold>Progress made:</StyledSmallBold>
                            <StyledBar>
                                <StyledProgress style={{ width: `${tasksProgress * 100 > 100 ? 100 : tasksProgress * 100}%`, backgroundColor: color }} />
                            </StyledBar>
                        </StyledIcons>
                    </StyledBox>
                    <StyledButton bgcolor={EColorPalette.ENGINEERINGORANGE} >Terminar Sprint</StyledButton>
                </StyledInfo>
            </StyledHeader>
        </>
    )
}

export default HeaderSprint;