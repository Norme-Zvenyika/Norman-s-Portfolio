import express from "express";
import cors from "cors";
import "dotenv/config";
import { errorHandler } from "./src/middleware/error.middleware.js";
import messageRoutes from "./src/routes/message.routes.js";

// create express app
const createApp = () => {
	const app = express();

	// middleware
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// routes
	app.use("/messages", messageRoutes);

	// health check
	app.get("/health", (req, res) => {
		res.status(200).json({ status: "ok" });
	});

	// error handling
	app.use(errorHandler);

	return app;
};

// server startup
const startServer = (app) => {
	const PORT = process.env.PORT || 5000;

	return app.listen(PORT, () => {
		console.log(`server running on http://localhost:${PORT}`);
		console.log(`environment: ${process.env.NODE_ENV || "development"}`);
	});
};

// only start server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
	const app = createApp();
	startServer(app);
}

export { createApp, startServer };
