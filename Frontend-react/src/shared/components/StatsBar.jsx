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
					<div>
						<h2>Welcome,</h2>
						<p>
							<b>{states.user?.name || "Cargando..."}</b>
						</p>
					</div>
					<div>
						<div className={styles["element"]}>
							<h4>Currency</h4>
							<p>{states.user?.coins}</p>
						</div>
						<div className={styles["element"]}>
							<h4>Energy</h4>
							<p>{states.user?.energy}</p>
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
				</div>
			)}
			;
		</>
	);
}

export default StatsBar;
