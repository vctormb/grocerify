const buttonStyle = p => {
  return `
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: ${p.p}
		background-color: ${p.theme.button[p.appearance].backgroundColor};
		border: ${`1px solid ${p.theme.button[p.appearance].border}`};
		border-radius: 10px;
		text-decoration: none;
		cursor: pointer;
		color: ${
      p.color ? p.theme.colors[p.color] : p.theme.button[p.appearance].color
    };
		font-weight: 600;
		transition: all 0.3s ease;

		&:disabled {
			background-image: none;
			background-color: ${p.theme.colors.v6};
			box-shadow: none;
			color: ${p.theme.colors.v5};
		}

		&:hover {
			box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
		}

		&:active {
			transform: translateY(2px);
			background-color: transparent;
		}
	`;
};

export default buttonStyle;
