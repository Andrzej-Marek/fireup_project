import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700|Roboto:300,400,500,700&display=swap&subset=cyrillic-ext');
* {
  font-family: 'Montserrat';

  p {
    margin: 0;
  }

}
body {  
  overflow-x: hidden;
}
`;
