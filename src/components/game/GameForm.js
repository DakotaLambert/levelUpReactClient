import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory } from "react-router-dom";

export const GameForm = () => {
	const { createGame, getGameTypes, gameTypes } = useContext(GameContext);
	const history = useHistory();

	/*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
	const [currentGame, setCurrentGame] = useState({
		name: "",
		numberOfPlayers: 0,
		gameTypeId: 0,
		maker: "",
		description: "",
	});

	/*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
	useEffect(() => {
		getGameTypes();
	}, []);

	/*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
	const changeGameState = (event) => {
		const newGameState = { ...currentGame };

		newGameState[event.target.name] = event.target.value;

		setCurrentGame(newGameState);
	};

	// const changeGameMakerState = (event) => {
	//     const newGameState = { ...currentGame }
	//     newGameState.maker = event.target.value
	//     setCurrentGame(newGameState)
	// }

	// const changeGamePlayersState = (event) => {
	//     const newGameState = { ...currentGame }
	//     newGameState.numberOfPlayers = event.target.value
	//     setCurrentGame(newGameState)
	// }

	// const changeGameTypeState = (event) => {
	//     const newGameState = { ...currentGame }
	//     newGameState.gameTypeId = event.target.value
	//     setCurrentGame(newGameState)
	// }
	/* REFACTOR CHALLENGE END */

	return (
		<form className="gameForm">
			<h2 className="gameForm__name">New Game</h2>
			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Name: </label>
					<input
						type="text"
						name="name"
						required
						autoFocus
						className="form-control"
						value={currentGame.name}
						onChange={changeGameState}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label htmlFor="numberOfPlayers">Number of Players: </label>
					<input
						type="number"
						name="numberOfPlayers"
						required
						autoFocus
						className="form-control"
						// value={currentGame.numberOfPlayers}
						onChange={changeGameState}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label htmlFor="gameType">Game Type: </label>
					<select name="gameTypeId"onChange={changeGameState}>
						{gameTypes.map((type) => {
							return <option value={type.id}>{type.label}</option>;
						})}
					</select>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label htmlFor="maker">Maker: </label>
					<input
						type="text"
						name="maker"
						required
						autoFocus
						className="form-control"
						value={currentGame.maker}
						onChange={changeGameState}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label htmlFor="description">Description: </label>
					<input
						type="text"
						name="description"
						required
						autoFocus
						className="form-control"
						value={currentGame.description}
						onChange={changeGameState}
					/>
				</div>
			</fieldset>

			{/* You create the rest of the input fields for each game property */}

			<button
				type="submit"
				onClick={(evt) => {
					// Prevent form from being submitted
					evt.preventDefault();

					const game = {
						name: currentGame.name,
						numberOfPlayers: parseInt(currentGame.numberOfPlayers),
						gameTypeId: parseInt(currentGame.gameTypeId),
						maker: currentGame.maker,
						description: currentGame.description,
					};

					// Send POST request to your API
					createGame(game).then(() => history.push("/games"));
				}}
				className="btn btn-primary"
			>
				Create
			</button>
		</form>
	);
};
