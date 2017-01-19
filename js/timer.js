function Button(props) {
	return (
		<button onClick={() => props.onClick()}>{props.name}</button>
	);
}

class Timer extends React.Component {
	constructor() {
		super();
		this.state = {elapsed: 0,
					  isStarted: false,
					  isReset: false};
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	startHandler() {
		if(!this.state.isStarted) {
			//have to find if continuing or reset
			let start = 0;
			if(!this.state.isReset) {
				//then set start accordingly
				start = Date.now() - this.state.elapsed;
			}
			else {
				start = Date.now();
			}
			this.timer = setInterval(() => this.tick(start, true, false), 50);
		}
	}

	pauseHandler() {
		clearInterval(this.timer);
		//setState using current progress as elapsed (start = 0)
		this.setState({elapsed: this.state.elapsed,
					   isStarted: false,
					   isReset: false});
	}

	resetHandler() {
		clearInterval(this.timer);
		//setState using the start as next time startBtn is clicked
		this.setState({elapsed: 0,
					   isStarted: false,
					   isReset: true});
	}

	tick(start, isStarted, isReset) {
		this.setState({elapsed: Date.now() - start,
					   isStarted: isStarted,
					   isReset: isReset});
	}

	render() {
		let elapsed = Math.round(this.state.elapsed / 100),
			seconds = (elapsed / 10).toFixed(1);

		return( 
			<div>
				<h1>Timer: {seconds}</h1>
				<div className="btnContainer">
					<Button name="Start" onClick={() => this.startHandler()}/>
					<Button name="Pause" onClick={() => this.pauseHandler()}/>
					<Button name="Reset" onClick={() => this.resetHandler()}/>
				</div>
			</div> 
		);
	}	
}

ReactDOM.render(
	<Timer />,
	document.getElementById('container')
);