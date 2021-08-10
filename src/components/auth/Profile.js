import React, { useEffect, useContext } from "react";
import { ProfileContext } from "./ProfileProvider.js";
import "../auth/ProfileStyles.css";

export const Profile = () => {
	const { profile, getProfile } = useContext(ProfileContext);

	useEffect(() => {
		getProfile();
	}, []);

	return (
		<article className="profile">
			<header>
				<h1>Your Profile</h1>
			</header>
			<section className="profile__info">
				<header className="profile__header">
					<h3>Your Info</h3>
				</header>
				<div className="profile__name">
					Welcome: {profile.gamer && profile.gamer.user.first_name}{" "}
					{profile.gamer && profile.gamer.user.last_name}
				</div>
				<div className="profile__username">
					Username: {profile.gamer && profile.gamer.user.username}
				</div>
				<div className="profile__bio">
					About you: {profile.gamer && profile.gamer.bio}
				</div>
			</section>
			<header className="registrations__header">
				<h3 style={{textAlign: "center", marginTop: "2rem"}}>Your Events</h3>
			</header>
			<section className="yourEvents">
				{/* <div className="yourEventsBoxes"> */}
					{profile.events.map((event) => {
						return (
							<div key={event.id} className="yourEventsTextBox">
								{event.game.name}
								<br />
								{event.description}
								<br />
								{event.date} @ {event.time}
							</div>
						);
					})}
				{/* </div> */}
			</section>
		</article>
	);
};
