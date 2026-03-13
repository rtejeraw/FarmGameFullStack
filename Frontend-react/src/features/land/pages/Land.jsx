import styles from "./Land.module.css";
import { usePlot } from "../hooks/usePlot";
import { useUser } from "../../user/hooks/useUser";
import Plot from "../../../shared/components/Plot";
import CardItem from "../../../shared/components/CardItem";
import Crop from "../../../shared/components/Crop";

export default function Land() {
	const { state, selectPlot, plantUnit, harvestUnit } = usePlot();
	useUser();

	const seedsBreedsItems = [
		...(state.inventory?.seeds || []),
		...(state.inventory?.breeds || []),
	];

	return (
		<div className={styles["container"]}>
			<div className={styles["header"]}>
				<h1>Land</h1>
				<div className={styles["header-line"]}></div>
				<p>
					( Seeds can be planted in the plots of land for harvest. The
					crops can be harvested for consumption or sale. )
				</p>
			</div>

			<div className={styles["body-container"]}>
				<div className={styles["section"]}>
					<div className={styles["plot-list"]}>
						{state.plots && state.plots.length > 0 ? (
							state.plots.map((x) => (
								<Plot
									key={x._id}
									plot={x}
									selectPlot={selectPlot}
								/>
							))
						) : (
							<></>
						)}
					</div>
				</div>
				<div className={styles["section"]}>
					<div className={styles["plot-data"]}>
						{state.plot === null ? (
							<p>No plot selected.</p>
						) : state.plot.unit !== null ? (
							<Crop plot={state.plot} callBack={harvestUnit} />
						) : (
							<div>
								<h1>Plant Crop</h1>
								{seedsBreedsItems.length === 0 ? (
									<p>
										No seeds or breeds available, you must
										buy them at the market.
									</p>
								) : (
									<div className={styles["seed-list"]}>
										{seedsBreedsItems.map((x) => (
											<CardItem
												key={x.unit._id}
												item={x.unit}
												plotId={state.plot._id}
												action="Plant"
												callBack={plantUnit}
											/>
										))}
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
