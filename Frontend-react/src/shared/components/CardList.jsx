import styles from "./CardList.module.css";
import CardItem from "./CardItem";

export default function CardList({ inventory, user, items, action, callBack }) {
	return (
		<div className={`${styles["container"]}`}>
			{items ? (
				items.map((item) => (
					<CardItem
						key={item._id}
						inventory={inventory}
						user={user}
						item={item.unit ? item.unit : item}
						amount={item.amount}
						action={action}
						callBack={callBack}
					/>
				))
			) : (
				<></>
			)}
		</div>
	);
}
