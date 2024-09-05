import { useState } from 'react';

const useWordle = (solution) => {

	const [turn, setTurn] = useState(0)
	const [currentGuess, setCurrentGuess] = useState('')
	const [guesses, setGuesses] = useState([...Array(6)])
	const [history, setHistory] = useState([])
	const [isCorrect, setIsCorrect] = useState(false)

	const formatGuess = () => {
		let solutionArray = [...solution]
		let formattedGuess = [...currentGuess].map((letter) => {
			return {key: letter, color: 'grey'}
		})

		formattedGuess.forEach((letter, ind) => {
			if (solutionArray[ind] === letter.key) {
				formattedGuess[ind].color = 'green';
				// solutionArray[ind] = null;
			}
		})

		formattedGuess.forEach((letter, ind) => {
			if(solutionArray.includes(letter.key) && letter.color !== 'green') {
				formattedGuess[ind].color = 'yellow'
				// solutionArray[solutionArray.indexOf(letter.key)] = null
			}
		})
		return formattedGuess
	}

	const addNewGuess = (formatted) => {
		if (currentGuess === solution) {
			setIsCorrect(true)
		}
		setGuesses((prevGuesses) => {
			let newGuesses = [...prevGuesses];
			newGuesses[turn] = formatted
			return newGuesses
		})
		setHistory((prevHistory) => {
			return [...prevHistory, currentGuess]
		})
		setTurn((prevTurn) => {
			return prevTurn + 1
		})
		setCurrentGuess('')
	}

	const handleKeyup = ({ key }) => {
		if (turn >= 6) {
			console.log('You used all your guesses')
			return
		} else if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
			setCurrentGuess((prev) => {
				return prev + key.toUpperCase()
			})
		} else if(key === 'Backspace') {
			setCurrentGuess((prev) => {
				return prev.slice(0, -1)
			})
		} else if(key === 'Enter' && currentGuess.length === 5 && !history.includes(currentGuess)) {
			const formatted = formatGuess()
			addNewGuess(formatted)
			// console.log(formatted)
		}
	}

	return {turn, currentGuess, guesses, isCorrect, handleKeyup}

}

export default useWordle;