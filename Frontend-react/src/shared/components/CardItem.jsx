import { useState } from "react";
import styles from "./CardItem.module.css";
import { Button, Select } from "../components";

export default function CardItem({
	inventory,
	user,
	item,
	amount,
	action,
	callBack,
}) {
	const [selectAmount, setSelectAmount] = useState(1);

	return (
		<div className={`${styles["container"]}`}>
			<div className={`${styles["header"]}`}>
				<img
					src={`src/assets/${item.name
						.toLowerCase()
						.replace(" ", "")}.png`}
					alt="Seed Image"
					width="80px"
					height="80px"
				/>
				<div>
					<h3>{item.name}</h3>
					<p>{item.description}</p>
				</div>
			</div>

			<div className={`${styles["data"]}`}>
				<div>
					{item.energyCost !== undefined ? (
						<p>
							<b>Energy:</b> {item.energyCost}
						</p>
					) : (
						""
					)}
					{item.coinCost !== undefined ? (
						<p>
							<b>Price:</b> {item.coinCost}
						</p>
					) : (
						""
					)}
				</div>
				<div>
					{item.timeToGrow !== undefined ? (
						<p>
							<b>Grow time:</b> {item.timeToGrow} min
						</p>
					) : (
						""
					)}
					{amount !== undefined ? (
						<p>
							<b>Amount:</b> {amount}
						</p>
					) : (
						""
					)}
				</div>
			</div>
			<hr />
			<div className={`${styles["actions"]}`}>
				<Select
					onChange={(e) => setSelectAmount(e.target.value)}
				></Select>
				<Button
					type="submit"
					fullWidth
					onClick={() => {
						if (callBack !== undefined)
							callBack({
								inventory: inventory._id,
								user: user,
								unit: item._id,
								amount: selectAmount,
							});
					}}
				>
					{action}
				</Button>
			</div>
		</div>
	);
}
