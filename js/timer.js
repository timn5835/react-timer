class Timer extends React.Component {
	constructor() {
		super();
		this.state = {elapsed: 0};
	}

	componentDidMount() {
		this.timer = setInterval(this.tick.bind(this), 50);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	tick() {
		this.setState({elapsed: Date.now() - this.props.start});
	}

	render() {
		let elapsed = Math.round(this.state.elapsed / 100),
			seconds = (elapsed / 10).toFixed(1);

		return( <strong>{seconds}</strong> );
	}	
}

ReactDOM.render(
	<Timer start={Date.now()} />,
	document.getElementById('container')
);