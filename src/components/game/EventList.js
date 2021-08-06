import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { EventContext } from "./EventProvider.js";

import "../game/EventStyles.css";

export const EventList = (props) => {
	const { events, getEvents } = useContext(EventContext);
  const [game] = useState({})
	const history = useHistory();

	useEffect(() => {
		getEvents();
	}, []);

	return (
		<article className="events">
			<header className="events__header">
				<h1>Level Up Game Events</h1>
			</header>
			<button
				className="icon-create eventListButton"
				onClick={() => {
					history.push({ pathname: "/events/new" });
				}}
			>
				Register New Event
			</button>
			{events.map((event) => {
				return (
					<section key={event.id} className="eventList" style={{marginBottom: "2rem"}}>
						<div className="registration__game">{event.game.name}</div>
						<div>{event.description}</div>
						<div>
							{new Date(event.date).toLocaleDateString("en-US", {
								weekday: "long",
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
							@ {event.time}
						</div>
					</section>
				);
			})}
		</article>
	);
};
