import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
	}

  body {
		margin: 0;
		padding: 0;
		font-family: ${p => p.theme.fontFamily};
    font-size: ${p => p.theme.fontSize};
		color: ${p => p.theme.colors.v1};
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}
	
	html, body, #root {
		height: 100%;
		width: 100%;
	}
	
	#root {
		display: flex;
		flex-direction: column;
	}
`;

export default GlobalStyle;
