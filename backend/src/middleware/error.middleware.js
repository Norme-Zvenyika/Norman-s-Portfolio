import { StatusCodes } from "http-status-codes";

// custom error class for application errors
export class AppError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}

// central error handling middleware
export const errorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
	err.message = err.message || "internal server error";

	if (process.env.NODE_ENV === "development") {
		return res.status(err.statusCode).json({
			status: err.status,
			error: err,
			message: err.message,
			stack: err.stack,
		});
	}

	// production error response
	if (err.isOperational) {
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	}

	// programming or unknown errors
	console.error("ERROR 💥", err);
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		status: "error",
		message: "something went wrong",
	});
};

// catch async errors
export const catchAsync = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch(next);
	};
};
