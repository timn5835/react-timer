function StartBtn(props) {
	return (
		<button onClick={() => props.onClick()}>Start</button>
	);
}

class Timer extends React.Component {
	constructor() {
		super();
		this.state = {elapsed: 0};
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	startHandler() {
		this.timer = setInterval(this.tick.bind(this), 50);
	}

	tick() {
		this.setState({elapsed: Date.now() - this.props.start});
	}

	render() {
		let elapsed = Math.round(this.state.elapsed / 100),
			seconds = (elapsed / 10).toFixed(1);

		return( 
			<div>
				<h1>Timer: {seconds}</h1>
				<div className="btnContainer">
					<StartBtn onClick={() => this.startHandler()}/>
				</div>
			</div> 
		);
	}	
}

ReactDOM.render(
	<Timer start={Date.now()} />,
	document.getElementById('container')
);