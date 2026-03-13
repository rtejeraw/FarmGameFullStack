import styles from "./Plot.module.css";

export default function Plot({ plot, selectPlot }) {
	return (
		<div
			className={`${styles["container"]}`}
			onClick={() => {
				selectPlot(plot);
			}}
		>
			{plot?.unit !== null ? (
				<img
					src={`src/assets/${plot.unit.name
						.toLowerCase()
						.replace(" ", "")}.png`}
					alt="Crop Image"
				></img>
			) : (
				<></>
			)}
		</div>
	);
}
