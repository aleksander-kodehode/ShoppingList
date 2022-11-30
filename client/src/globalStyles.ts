import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*{
    box-sizing: border-box;
}
    :root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: rgba(41, 41, 41, 0.87);
  
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

body {
  background-color: ${(props) => props.theme.colors.background};
  margin: 0;
  display: flex;
  place-items: center;
  min-height: 100vh;
}
#root {
  margin: 0 auto;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 1rem;
}
header {
  justify-self: flex-start;
  width: 100%;
  background-color: rgb(102, 102, 102);
}
main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}
footer {
  justify-self: flex-end;
  background-color: rgb(102, 102, 102);
}
`;

export default GlobalStyle;
