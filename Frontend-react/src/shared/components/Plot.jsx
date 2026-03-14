import styles from "./Plot.module.css";
import unitImages from "@/assets/unitImages";

export default function Plot({ plot, selectPlot }) {
	let imageSrc;
	if (plot?.unit !== null) {
		const normalizedName = plot.unit.name.toLowerCase().replace(" ", "");
		imageSrc = unitImages[normalizedName];
	}

	return (
		<div
			className={`${styles["container"]}`}
			onClick={() => {
				selectPlot(plot);
			}}
		>
			{plot?.unit !== null ? (
				<img src={imageSrc} alt="Crop Image"></img>
			) : (
				<></>
			)}
		</div>
	);
}
