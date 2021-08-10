import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory, useParams } from "react-router-dom";

export const GameEditForm = () => {
	const { getGameTypes, getGameById, gameTypes, editGame } =
		useContext(GameContext);
	const history = useHistory();

	const { gameId } = useParams();

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

	useEffect(() => {
		if (gameId) {
			getGameById(gameId).then((game) => {
				setCurrentGame({
					id: parseInt(gameId),
					name: game.name,
					numberOfPlayers: game.number_of_players,
					gameTypeId: game.game_type.id,
					maker: game.maker,
					description: game.description,
				});
			});
		}
	}, [gameId]);

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
            value={currentGame.numberOfPlayers}
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
					<select
						name="gameTypeId"
						onChange={changeGameState}
						style={{ padding: ".5rem" }}
            value={currentGame.gameTypeId}
					>
						<option style={{ fontStyle: "italic" }}>Choose Game Type</option>
						{gameTypes.map((type) => {
							return <option value={type.id}>{type.label}</option>;
						})}
					</select>
				</div>
			</fieldset>
			{/* You create the rest of the input fields for each game property */}
			{/*  */}
				<button
					type="submit"
					onClick={(evt) => {
						// Prevent form from being submitted
						evt.preventDefault();

						editGame({
              id: currentGame.id,
							name: currentGame.name,
							numberOfPlayers: parseInt(currentGame.numberOfPlayers),
							gameTypeId: parseInt(currentGame.gameTypeId),
							maker: currentGame.maker,
							description: currentGame.description,
						}).then(() => history.push("/games"));
					}}
					className="gameFormSubmitButton"
				>
					Edit
				</button>
			
			
		</form>
	);
};
