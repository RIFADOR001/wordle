import React from 'react'; 
import Row from './Row';

export default function Grid({ currentGuess, guesses, turn }) {
	return (
			<div>
				{guesses.map((g, ind) => {
					if (turn === ind) {
						return <Row key={ind} currentGuess={currentGuess}/>
					}
					return <Row key={ind} guess={g}/>
				})}
			</div>
	)
}

