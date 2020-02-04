import React, {useState, useEffect, useCallback} from 'react';
import 'materialize-css'
import { Squere } from './squere';

const App = () => {

	// Create initial state
	const createInitalArr = (probability = 0.8) => {
		let world = []
		for(let i = 0; i < 100; i++){
			const newItem = { isAlive: Math.random() > probability ? true : false, number: i};
			world.push(newItem)
		}
		return world
	};

	
	const [world, setWorld] = useState(createInitalArr)
	// Start/stop handler
	const [handler, setHandler] = useState(false)


	// Range function (linke in Python)
	const range = (a, b, c) => {
		let arr = [];
		for(let i = a; i <= b; i += c){
			arr.push(i);
		}
		return arr
	}

	
	// Scan location arround selected cell
	const scanLocation =  useCallback((action, i, newGen) => {
		// Number of neighbours
		let n = 0;

		switch(action){
			
			case 'all':
				if(world[i.number - 10].isAlive === true){
					n++
				}
				if(world[i.number + 10].isAlive === true){
					n++
				}
				if(world[i.number - 9].isAlive === true){
					n++
				}
				if(world[i.number - 11].isAlive === true){
					n++
				}
				if(world[i.number + 11].isAlive === true){
					n++
				}
				if(world[i.number + 9].isAlive === true){
					n++
				}
				if(world[i.number + 1].isAlive === true){
					n++
				}
				if(world[i.number - 1].isAlive === true){
					n++
				}
				console.log(`it is got ${n} neighboors`)
				break;
			case 'topLeftCorner':
				if(world[i.number + 10].isAlive === true){
					n++
				}
				if(world[i.number + 11].isAlive === true){
					n++
				}
				if(world[i.number + 1].isAlive === true){
					n++
				}
				console.log(`it is got ${n} neighboors`)
				break;
			case 'topRightCorner':
				if(world[i.number + 10].isAlive === true){
					n++
				}
				if(world[i.number + 9].isAlive === true){
					n++
				}
				if(world[i.number - 1].isAlive === true){
					n++
				}
				console.log(`it is got ${n} neighboors`)
				break;
			case 'botLeftCorner':
				if(world[i.number - 10].isAlive === true){
					n++
				}
				if(world[i.number - 9].isAlive === true){
					n++
				}
				if(world[i.number + 1].isAlive === true){
					n++
				}
				console.log(`it is got ${n} neighboors`)
				break;
			case 'botRightCorner':
				if(world[i.number - 10].isAlive === true){
					n++
				}
				if(world[i.number - 11].isAlive === true){
					n++
				}
				if(world[i.number - 1].isAlive === true){
					n++
				}
				console.log(`it is got ${n} neighboors`)
				break;
			case 'top':
				if(world[i.number + 10].isAlive === true){
					n++
				}
				if(world[i.number + 11].isAlive === true){
					n++
				}
				if(world[i.number + 9].isAlive === true){
					n++
				}
				if(world[i.number + 1].isAlive === true){
					n++
				}
				if(world[i.number - 1].isAlive === true){
					n++
				}
				console.log(`it is got ${n} neighboors`)
				break;

			case 'bot':
				if(world[i.number - 10].isAlive === true){
					n++
				}
				if(world[i.number - 9].isAlive === true){
					n++
				}
				if(world[i.number - 11].isAlive === true){
					n++
				}
				if(world[i.number + 1].isAlive === true){
					n++
				}
				if(world[i.number - 1].isAlive === true){
					n++
				}
				console.log(`it is got ${n} neighboors`)
				break;
			case 'left':
				if(world[i.number - 10].isAlive === true){
					n++
				}
				if(world[i.number + 10].isAlive === true){
					n++
				}
				if(world[i.number - 9].isAlive === true){
					n++
				}
				if(world[i.number + 11].isAlive === true){
					n++
				}
				if(world[i.number + 1].isAlive === true){
					n++
				}
				console.log(`it is got ${n} neighboors`)
				break;
			case 'right':
				if(world[i.number - 10].isAlive === true){
					n++
				}
				if(world[i.number + 10].isAlive === true){
					n++
				}
				if(world[i.number - 11].isAlive === true){
					n++
				}
				if(world[i.number + 9].isAlive === true){
					n++
				}
				if(world[i.number - 1].isAlive === true){
					n++
				}
				console.log(`it is got ${n} neighboors`)
				break;
			
			default:
				return

		}

		

		if (n === 3) {
			console.log(`${world[i.number]} is filtred by n === 3 bay and will be alive`)
			newGen.push( { 
				isAlive: true,
				number: i.number
			 } )
		}
		else if (n < 2) {
			newGen.push( { 
				isAlive: false,
				number: i.number
			 } )
		}
		else if (n > 3) {
			newGen.push( { 
				isAlive: false,
				number: i.number
			 } )
		}
		else if (n === 2) {

			if(world[i.number].isAlive){
				newGen.push( { 
					isAlive: true,
					number: i.number
				 } )
			}
			else {
				newGen.push( { 
					isAlive: false,
					number: i.number
				 } )
			}
		}


	}, [world])


	// Main map function, it is maping world arr and applyin scanLocation for each element.
	const lifeEngine = useCallback(() => {
		const newGen = [];
		world.map(i => {
			if(range(0, 9, 1).includes(i.number) ){
				if(i.number === 0){
					console.log(`${i.number} filtred as topLeftCorner`)
					scanLocation('topLeftCorner', i, newGen)
					return true
				}
				else if (i.number === 9){
					console.log(`${i.number} filtred as topRightCorner`)
					scanLocation('topRightCorner', i, newGen)
					return true
				} else {
					console.log(`${i.number} filtred as top`)
					scanLocation('top',i, newGen)
					return  true
				}
			}
			else if(range(0, 90, 10).includes(i.number)){
				if(i.number === 0){
					console.log(`${i.number} filtred as topLeftCorner`)
					scanLocation('topLeftCorner', i, newGen)
					return true
				}
				else if (i.number === 90) {
					console.log(`${i.number} filtred as botLeftCorner`)
					scanLocation('botLeftCorner', i, newGen)
					return true
				}
				else {
					console.log(`${i.number} filtred as left`)
					scanLocation('left', i, newGen)
					return true
				}

			}

			else if(range(9, 99, 10).includes(i.number)){
				if(i.number === 9){
					console.log(`${i.number} filtred as topRightCorner`)
					scanLocation('topRightCorner', i, newGen)
					return true
				}
				else if (i.number === 99) {
					console.log(`${i.number} filtred as botRightCorner`)
					scanLocation('botRightCorner', i, newGen)
					return true
				}
				else {
					console.log(`${i.number} filtred as right`)
					scanLocation('right', i, newGen)
					return true
				}

			}

			else if(range(90, 99, 1).includes(i.number) ){
				if(i.number === 90){
					console.log(`${i.number} filtred as botLeftCorner`)
					scanLocation('botLeftCorner', i, newGen)
					return true
				}
				else if (i.number === 99){
					console.log(`${i.number} filtred as botRightCorner`)
					scanLocation('botRightCorner', i, newGen)
					return true
				} else {
					console.log(`${i.number} filtred as bot`)
					scanLocation('bot',i, newGen)
					return  true
				}
			}

			else {
				console.log(`${i.number} filtred as all`)
				scanLocation('all', i, newGen)
			}
			return true
		
		})
		setWorld([...newGen])
		
	}, [world, scanLocation])

	useEffect(() =>{
		if(handler){
			const myint = setInterval(lifeEngine, 700);
			return () => clearInterval(myint)
		} else return
	}, [lifeEngine, handler])


	return (

		<div className="container">
			<div className="life-container">
			{ world.map((item, idx) => {
				return <Squere item={item} key={idx} />
			}) }
			</div>
			<button className="waves-effect waves-light btn" onClick={() => setHandler(!handler)}>Start/Stop</button>
			<button className="waves-effect waves-light btn" onClick={() => setWorld(createInitalArr())}>Refresh</button>
		</div>
		
	)
}

export default App;