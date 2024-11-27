import { useEffect, useState } from "react";
import { StyledHeader } from "./style";

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
                asdasd
            </StyledHeader>
        </>
    )
}

export default HeaderSprint;