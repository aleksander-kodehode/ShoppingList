import { DefaultTheme } from "styled-components";

const ThemeReducer = (state: any, updatedTheme: DefaultTheme) => {
  return { ...state, updatedTheme };
};

export default ThemeReducer;
