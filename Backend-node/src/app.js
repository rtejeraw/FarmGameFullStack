import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { xss } from "express-xss-sanitizer";
import rateLimit from "express-rate-limit";

const app = express();
app.use(express.json());

// connectDB
// import connectDB from "./db/connect.js";
// import authenticationMiddleware from "./middleware/authentication.js";

// extra packages
app.set("trust proxy", 1);
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 100,
		standardHeaders: true,
		legacyHeaders: false,
	}),
);
app.use(helmet());
app.use(cors());
app.use(xss());

// Routes
app.get("/api/v1", (req, res) => {
	res.json({ data: "API is running..." });
});
// import authRouter from "./routes/auth.js";
// import usersRouter from "./routes/users.js";

//app.use(express.static("./public"));
//app.use("/api/v1/auth", authRouter);
//app.use("/api/v1/Users", authenticationMiddleware, usersRouter);

// Rutas separadas → import { router } from './routes.js'
// app.use('/api', router);

// error handler
// import notFoundMiddleware from "./middleware/not-found.js";
// import errorHandlerMiddleware from "./middleware/error-handler.js";
// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		//await connectDB(process.env.MONGO_URI);
		app.listen(port, () =>
			console.log(`Server escuchando en puerto ${port}...`),
		);
	} catch (error) {
		console.error(error);
	}
};

start();
