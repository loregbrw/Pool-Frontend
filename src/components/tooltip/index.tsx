import React from "react";
import { Tooltip, tooltipClasses, TooltipProps, Zoom } from "@mui/material";
import { styled } from "@mui/system";
import EColorPalette from "../../enums/EColorPalette";

interface ITooltipProps extends TooltipProps {
    children: React.ReactElement;
    title: string;

    placement?: TooltipProps["placement"];
}

const StyledTooltip = styled(({ className, children, title, placement, ...props }: ITooltipProps) => (
    <Tooltip
        title={title}
        placement={placement}
        classes={{ popper: className }}
        {...props}
        slots={{
            transition: Zoom
        }}

        slotProps={{
            popper: {
              sx: {
                [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                  {
                    marginTop: '5px',
                  },
                [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                  {
                    marginBottom: '5px',
                  },
                [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                  {
                    marginLeft: '0px',
                  },
                [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                  {
                    marginRight: '0px',
                  },
              },
            },
          }}
    >
        {children}
    </Tooltip>
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        color: EColorPalette.MINTCREAM,
        fontSize: "10px",
        fontFamily: "'Euclid Circular A', sans-serif",
        maxWidth: "225px"
    },
}));

export default StyledTooltip;
