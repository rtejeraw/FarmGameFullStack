import styles from "./Home.module.css";
import CardList from "../../../shared/components/CardList";
import { useMarket } from "../../market/hooks/useMarket";
import { useUser } from "../../user/hooks/useUser";

export default function Home() {
	const { state, consumeUnit } = useMarket();
	useUser();

	const sellableItems = [
		...(state.inventory?.seeds || []),
		...(state.inventory?.breeds || []),
	];

	const consumableItems = [
		...(state.inventory?.crops || []),
		...(state.inventory?.animals || []),
	];

	return (
		<div className={styles["container"]}>
			<div className={styles["section"]}>
				<h2>Welcome to Farm Game!</h2>
				<p>
					This farming game lets you manage a small farm: purchase
					seeds, plant crops, harvest produce, and manage your
					inventory. Seeds and harvested crops are stored in the
					Inventory and shown below in two sections: "Seeds" (used to
					plant crops) and "Consumables" (produce that you can consume
					to gain energy). Explore planting strategies, keep your
					energy up, and grow your farm over time.
				</p>
			</div>
			<div className={styles["header"]}>
				<h1>Inventory</h1>
				<div className={styles["header-line"]}></div>
				<p>
					( All purchased seeds and harvested crops are in your
					inventory. Crops can be consumed to gain energy. )
				</p>
			</div>

			<div className={styles["body-container"]}>
				<div className={styles["section"]}>
					<h2>Seeds/Breeds</h2>
					{state.inventory && sellableItems.length > 0 ? (
						<CardList
							inventory={state.inventory}
							user={state.user}
							items={sellableItems}
						/>
					) : (
						<p>No seeds or breeds in inventory.</p>
					)}
				</div>
				<div className={styles["section"]}>
					<h2>Consumables</h2>
					{state.inventory && consumableItems.length > 0 ? (
						<CardList
							inventory={state.inventory}
							items={consumableItems}
							action="Consume"
							callBack={consumeUnit}
						/>
					) : (
						<p>No consumables in inventory.</p>
					)}
				</div>
			</div>
		</div>
	);
}
