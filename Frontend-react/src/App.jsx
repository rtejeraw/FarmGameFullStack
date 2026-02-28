import "./App.css";
import { useEffect, useState } from "react";

function App() {
	const [APIRes, setAPIRes] = useState(null);

	useEffect(() => {
		fetch("/api/v1").then((res) =>
			res.json().then((data) => setAPIRes(data.data)),
		);
	}, []);

	return (
		<>
			<div>
				<h1>API response: {APIRes}</h1>
			</div>
		</>
	);
}

export default App;
