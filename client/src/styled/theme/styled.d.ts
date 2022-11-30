import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    themeType: string;

    colors: {
      background: string;
      secondary: string;
      text: string;
    };

    section: {
      background: string;
      text: string;
    };
  }
}
