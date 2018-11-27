import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
	}

  body {
		margin: 0;
		padding: 0;
    font-size: ${p => p.theme.fontSize};
		color: ${p => p.theme.colors.v1};
		background-color: #fff;
		background-image: ${({ isLoginScreen }) =>
      isLoginScreen
        ? 'linear-gradient(to bottom right, #1dbc57, #057263);'
        : 'none'};
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-size: cover;
	}

	body, button, a {
		font-family: ${p => p.theme.fontFamily};
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}

	html, body, #root {
		min-height: 100vh;
		width: 100%;
	}

	#root {
		display: flex;
		flex-direction: column;
	}
`;

export default GlobalStyle;
