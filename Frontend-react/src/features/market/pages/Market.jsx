import styles from "./Market.module.css";
import CardList from "../../../shared/components/CardList";
import { useMarket } from "../hooks/useMarket";
import { useUser } from "../../user/hooks/useUser";

export default function Market() {
	const { state, useBuyUnits, useSellUnits } = useMarket();
	useUser();

	const sellableItems = [
		...(state.inventory?.seeds || []),
		...(state.inventory?.breeds || []),
		...(state.inventory?.crops || []),
		...(state.inventory?.animals || []),
	];

	return (
		<div className={styles["container"]}>
			<div className={styles["header"]}>
				<h1>Market</h1>
				<div className={styles["header-line"]}></div>
				<p>
					( From the marketplace, you can buy and sell the seeds you
					need for farming. You can also sell the produce for a
					profit. )
				</p>
			</div>

			<div className={styles["section-container"]}>
				<div className={styles["section"]}>
					<h2>Buy seeds/breeds</h2>
					<CardList
						inventory={state.inventory}
						user={state.user}
						items={state.units}
						action="Buy"
						callBack={useBuyUnits}
					/>
				</div>
				<div className={styles["section"]}>
					<h2>Sell products</h2>
					{state.inventory && sellableItems.length > 0 ? (
						<CardList
							inventory={state.inventory}
							user={state.user}
							items={sellableItems}
							action="Sell"
							callBack={useSellUnits}
						/>
					) : (
						<p>No items to sell.</p>
					)}
				</div>
			</div>
		</div>
	);
}
