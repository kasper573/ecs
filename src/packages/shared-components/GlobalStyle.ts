import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.palette.background.default};
    color: ${({ theme }) => theme.palette.text.primary};
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  },
`;
