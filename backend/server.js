import express from "express";
import cors from "cors";
import "dotenv/config";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./src/middleware/error.middleware.js";
import messageRoutes from "./src/routes/message.routes.js";

const createApp = () => {
	const app = express();

	// trust proxy tells Express we're behind a proxy (Render's load balancer)
	app.set("trust proxy", 1);

	// apply security headers via helmet
	app.use(helmet());

	// create different rate limiters for different purposes
	const apiLimiter = rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 5, // limit each IP to 5 requests per window
		message: "Too many API requests, please try again later."
	});

	const messageLimiter = rateLimit({
		windowMs: 60 * 60 * 1000, // 1 hour
		max: 3, // limit each IP to 3 messages per hour
		message: {
			status: 'error',
			message: "Too many messages sent. Please wait before sending more messages."
		}
	});

	// cors configuration
	const corsOptions = {
		origin: process.env.NODE_ENV === "production"
			? process.env.FRONTEND_URL
			: "http://localhost:5173",
		credentials: true,
		optionsSuccessStatus: 200
	};
	app.use(cors(corsOptions));

	// parse json bodies with size limit
	app.use(express.json({ limit: "10kb" }));
	app.use(express.urlencoded({ extended: true }));

	// apply rate limiters to specific routes
	app.use("/messages", messageLimiter); // strict limit for messages
	app.use("/api", apiLimiter); // general API limit

	// routes
	app.use("/messages", messageRoutes);

	// health check endpoint
	app.get("/health", (req, res) => {
		res.status(200).json({
			status: "ok",
			timestamp: new Date().toISOString()
		});
	});

	// error handling middleware
	app.use(errorHandler);

	return app;
};

const startServer = (app) => {
	const PORT = process.env.PORT || 5000;

	const server = app.listen(PORT, () => {
		console.log(`server running on http://localhost:${PORT}`);
		console.log(`environment: ${process.env.NODE_ENV || "development"}`);
	});

	// handle graceful shutdown
	const shutdown = () => {
		console.log("received kill signal, shutting down gracefully");
		server.close(() => {
			console.log("closed out remaining connections");
			process.exit(0);
		});

		setTimeout(() => {
			console.error("could not close connections in time, forcefully shutting down");
			process.exit(1);
		}, 10000);
	};

	process.on("SIGTERM", shutdown);
	process.on("SIGINT", shutdown);

	return server;
};

// only start the server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
	const app = createApp();
	startServer(app);
}

export { createApp, startServer };