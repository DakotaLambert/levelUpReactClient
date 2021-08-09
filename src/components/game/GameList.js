import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { GameContext } from "./GameProvider.js";

import "../game/GameStyles.css";

export const GameList = (props) => {
	const { games, getGames } = useContext(GameContext);

	const history = useHistory();
	useEffect(() => {
		getGames();
	}, []);

	return (
		<article className="games">
			<header className="gamesHeader">
				<h1>Games</h1>
			
			<button
				className="icon-create gameListButton"
				onClick={() => {
					history.push({ pathname: "/games/new" });
				}}
			>
				Register New Game
			</button>
      </header>

			{games.map((game) => {
				return (
					<div
						className="gameCard"
						key={`game--${game.id}`}
					>
						{game.name} by {game.maker}
						<br />
						{game.number_of_players} players needed
						<br />
						{game.description}
					</div>
				);
			})}
		</article>
	);
};
