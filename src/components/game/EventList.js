import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { EventContext } from "./EventProvider.js";

import "../game/EventStyles.css";
import eventHeader from "../../images/eventHeader.png"


export const EventList = (props) => {
  // const [game] = useState({})

	const { events, getEvents, joinEvent, leaveEvent } = useContext(EventContext);
	const history = useHistory();

	useEffect(() => {
		getEvents();
	}, []);

	return (
		<article className="events">

			<header className="eventHeader" style={{textAlign: "center", fontSize: "60px"}}>
        <div style={{marginBottom: "2rem"}}><img src={eventHeader}/></div>
				{/* <h1 style={{fontSize: "60px"}}>Events</h1> */}
			<button
				className="icon-create eventListButton"
				onClick={() => {
					history.push({ pathname: "/events/new" });
				}}
			>
				Register New Event
			</button></header>
			{events.map((event) => {
				return (
					<section key={event.id} className="eventList" style={{marginBottom: "3rem"}}>
						<div className="eventTextBox">
              {event.game.name}<br />
						  {event.description}<br />
							{new Date(event.date).toLocaleDateString("en-US", {
								weekday: "long",
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
							@ {event.time}
						</div>
            {event.joined
                ? <button className="eventLeaveButton" onClick={() => leaveEvent(event.id)}>Leave</button>
                : <button className="eventJoinButton" onClick={() => joinEvent(event.id)}>Join</button>
            }
					</section>
				);
			})}
		</article>
	);
};
