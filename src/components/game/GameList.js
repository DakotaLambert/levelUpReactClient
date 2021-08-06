import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { GameContext } from "./GameProvider.js";

import "../game/GameStyles.css"

export const GameList = (props) => {
	const { games, getGames } = useContext(GameContext);

	const history = useHistory();
	useEffect(() => {
		getGames();
	}, []);

	return (
		<article className="games">
			<header className="events__header">
				<h1>Games</h1>
			</header>
			<button
				className="icon-create gameListButton"
				onClick={() => {
					history.push({ pathname: "/games/new" });
				}}
			>
				Register New Game
			</button>

			{games.map((game) => {
				return (
					<section key={`game--${game.id}`} className="game" style={{marginBottom: "2rem"}}>
						<div className="game__name">
							{game.name} by {game.maker}
						</div>
						<div className="game__players">
							{game.number_of_players} players needed
						</div>
						<div>{game.description}</div>
					</section>
				);
			})}
		</article>
	);
};
