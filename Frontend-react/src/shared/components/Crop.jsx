import styles from "./Crop.module.css";
import { Button } from "../components";

export default function Crop({ plot, callBack }) {
	return (
		<div className={styles["container"]}>
			<div>
				<h1>{plot.unit.name}</h1>
				<p>{plot.unit.description}</p>
			</div>
			<Button onClick={() => callBack({ plotId: plot._id })}>
				Harvest
			</Button>
		</div>
	);
}
