import styles from "./About.module.css";

function About() {
	return (
		<div className={styles["container"]}>
			<div className={styles["container"]}>
				<h2>CTD React Course</h2>
				<p>
					Practical example application for final project to the
					advanced React/node course. Simple prototype application for
					a farming game. It allows you to buy seeds and animals,
					plant them, harvest crops, and consume them to gain energy.
					The project was developed to demonstrate acquired knowledge
					in data management and presentation using various
					techniques.
				</p>
			</div>
			<div className={styles["container"]}>
				<h2>Raul Tejera</h2>
				<p>
					Software programmer with over 18 years of experience in
					.NET, C#, WPF, and more. Keen to update his knowledge of new
					web programming trends and best practices.
				</p>
			</div>
		</div>
	);
}

export default About;
