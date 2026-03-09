import styles from "./Market.module.css";
import CardList from "../../../shared/components/CardList";
import { useMarket } from "../hooks/useMarket";
import { useUser } from "../../user/hooks/useUser";
import { useAuth } from "../../../shared/context/AuthContext";

export default function Market() {
	const { state } = useAuth();
	const { useBuyUnits, useSellUnits } = useMarket();
	useUser();

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
				{state.inventory && state.inventory.seeds.length > 0 ? (
					<CardList
						inventory={state.inventory}
						user={state.user}
						items={state.inventory.seeds}
						action="Sell"
						callBack={useSellUnits}
					/>
				) : (
					<p>No items to sell.</p>
				)}
			</div>
		</div>
	);
}
