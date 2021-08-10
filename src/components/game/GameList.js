import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { GameContext } from "./GameProvider.js";


import gameHeader from "../../images/gamesHeader.png"
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
        <div style={{marginBottom: "2rem"}}><img src={gameHeader} /></div>
				{/* <h1 style={{fontSize: "60px"}}>Games</h1> */}
			
			<button
				className="icon-create gameRegisterButton"
				onClick={() => {
					history.push({ pathname: "/games/new" });
				}}
			>
				Register New Game
			</button>
      </header>

			{games.map((game) => {
				return (
					<section
						className="gameList"
						key={`game--${game.id}`}
					>
            <div className="gameTextBox">
						{game.name} by {game.maker}
						<br />
						{game.number_of_players} players needed
						<br />
						{game.description}
            </div>
            <button className="gameEditButton" onClick={() => {
              history.push(`/games/${game.id}/edit`)
            }}>Edit</button>
					</section>
				);
			})}
		</article>
	);
};
