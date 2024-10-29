import React, { useState } from "react";
import EColorPalette from "../enums/EColorPalette";

interface IColors {
    color: string;
    bgColor: string;
    theme: "dark" | "light";
}

interface ITheme {
    theme: IColors,
    toggleTheme: () => void;
}

const Light: IColors = {
    color: EColorPalette.JET,
    bgColor: EColorPalette.MINTCREAM,
    theme: "light"
}

const Dark: IColors = {
    color: EColorPalette.MINTCREAM,
    bgColor: EColorPalette.JET,
    theme: "dark"
}

export const ThemeContext = React.createContext({} as ITheme);

export const ThemeProvider = ({children} : {children: React.ReactNode})=> {
    const [theme, setTheme] = useState<IColors>(Light);
    
    const toggleTheme = () => {
        setTheme(theme === Dark ? Light : Dark);
    }

    return (
        <>
            <ThemeContext.Provider
            value={{
                theme,
                toggleTheme
            }}
            children={ children }
            />
        </>
    )
}

export default ThemeContext;