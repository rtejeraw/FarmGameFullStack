import Button from "./Button";
import styles from "./StatsBar.module.css";
import { useLogin } from "../../features/auth/hooks/useLogin";

function StatsBar({ Currency, Energy, states }) {
	const { logout } = useLogin();

	return (
		<>
			{!states.isAuthenticated ? (
				<></>
			) : (
				<div className={styles["statsBar"]}>
					<div className={styles["element"]}>
						<h4>Currency</h4>
						<p>{Currency}</p>
					</div>
					<div className={styles["element"]}>
						<h4>Energy</h4>
						<p>{Energy}</p>
					</div>
					<Button
						onClick={() => {
							logout();
						}}
						fullWidth
					>
						Logout
					</Button>
				</div>
			)}
			;
		</>
	);
}

export default StatsBar;
