import { createContext } from "react";
import { DefaultTheme } from "styled-components";

export interface IPlaceThemeProvider {
  currentTheme: DefaultTheme;
  setNewTheme: (args: DefaultTheme) => void;
}

export const PlaceThemeContext = createContext<IPlaceThemeProvider>(
  {} as IPlaceThemeProvider
);
