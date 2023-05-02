import { createGlobalStyle } from 'styled-components'
import 'modern-normalize'
export const GlobalStyle = createGlobalStyle`
  body {
    /* color: ${props => (props.whiteColor ? 'white' : 'black')}; */
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #d6e9e9;
    
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  html {
  box-sizing: border-box;
  width: 100vw;
  overflow-x: hidden;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
  h1,
h2,
h3,
h4,
h5,
h6,
p {
	margin: 0;
}
ul {
	margin: 0;
	padding: 0;
	list-style: none;
}
img {
	display: block;
	max-width: 100%;
	height: auto;
}
a {
text-decoration: none;
}
`;