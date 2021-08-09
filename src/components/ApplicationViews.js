import React from "react";
import { Route } from "react-router-dom";
import { EventList } from "./game/EventList.js";
import { EventProvider } from "./game/EventProvider.js";
import { GameList } from "./game/GameList.js";
import { GameProvider } from "./game/GameProvider.js";
import { GameForm } from "./game/GameForm.js";
import { EventForm } from "./game/EventForm.js";
import { ProfileProvider } from "./auth/ProfileProvider.js";
import { Profile } from "./auth/Profile.js";

import landingLogo from "../images/levelupGIF.gif";

export const ApplicationViews = () => {
	return (
		<>
			<main
				style={{
					margin: "5rem 2rem",
					lineHeight: "1.75rem",
				}}
			>
				<Route exact path="/" style={{}}>
					{/* <img src={home} className="homeboy"/> */}
					<div
						style={{ margin: "auto", maxWidth: "900px", textAlign: "center" }}
					>
						<img src={landingLogo} style={{ maxHeight: "13rem" }} />
					</div>
				</Route>
				<EventProvider>
					<GameProvider>
						<Route exact path="/games">
							<GameList />
						</Route>
						<Route exact path="/games/new">
							<GameForm />
						</Route>
						<Route exact path="/events/new">
							<EventForm />
						</Route>
					</GameProvider>

					<Route exact path="/events">
						<EventList />
					</Route>
				</EventProvider>
				<ProfileProvider>
					<Route exact path="/profile">
						<Profile />
					</Route>
				</ProfileProvider>
			</main>
		</>
	);
};
