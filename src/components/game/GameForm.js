import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory } from "react-router-dom";

export const GameForm = () => {
	const { createGame, getGameTypes, gameTypes } = useContext(GameContext);
	const history = useHistory();

	const [currentGame, setCurrentGame] = useState({
		name: "",
		numberOfPlayers: 0,
		gameTypeId: 0,
		maker: "",
		description: "",
	});

	useEffect(() => {
		getGameTypes();
	}, []);

	const changeGameState = (event) => {
		const newGameState = { ...currentGame };

		newGameState[event.target.name] = event.target.value;

		setCurrentGame(newGameState);
	};

	return (
		<form className="gameForm">
			<h2 className="gameForm__name">New Game</h2>
			<fieldset>
				<div className="form-group">
					<input
						placeholder="Name"
						type="text"
						name="name"
						required
						autoFocus
						className="gameFormSet"
						value={currentGame.name}
						onChange={changeGameState}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<input
						placeholder="Number Of Players"
						type="number"
						name="numberOfPlayers"
						required
						autoFocus
						className="gameFormSet"
						onChange={changeGameState}
					/>
				</div>
			</fieldset>
			
			<fieldset>
				<div className="form-group">
					<input
						placeholder="Maker"
						type="text"
						name="maker"
						required
						autoFocus
						className="gameFormSet"
						value={currentGame.maker}
						onChange={changeGameState}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<input
            placeholder="Description"
						type="text"
						name="description"
						required
						autoFocus
						className="gameFormSet"
						value={currentGame.description}
						onChange={changeGameState}
					/>
				</div>
			</fieldset>
      <fieldset>
				<div className="form-group">
					<select name="gameTypeId" onChange={changeGameState} style={{padding: ".5rem"}}>
						<option style={{ fontStyle: "italic" }}>Choose Game Type</option>
						{gameTypes.map((type) => {
							return <option value={type.id}>{type.label}</option>;
						})}
					</select>
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
				className="gameFormSubmitButton"
			>
				Create
			</button>
		</form>
	);
};
