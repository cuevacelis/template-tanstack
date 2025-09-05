import axios from "axios";
import Cookies from "js-cookie";
import { ErrorQuery } from "@/lib/custom-error/error-query";

/**
 * Retrieves the authentication token from cookies.
 *
 * @example
 * const token = getAuthToken();
 */
export const getAuthToken = () => {
	return Cookies.get("token");
};

/**
 * Handles errors from Axios requests and throws a custom ErrorQuery.
 * Differentiates between response, request, and configuration errors, and provides meaningful error messages.
 *
 * @example
 * try {
 *   await axios.get('/api');
 * } catch (error) {
 *   handleAxiosError(error);
 * }
 */
export const handleAxiosError = (error: unknown) => {
	if (axios.isAxiosError(error)) {
		if (error.response) {
			throw new ErrorQuery({
				message:
					(error.response?.data as { mensaje?: string })?.mensaje ??
					error.message ??
					"Error en la respuesta del servidor",
				statusCode: error.response?.status,
				error: error,
			});
		}

		if (error.request) {
			throw new ErrorQuery({
				message: "No se recibió respuesta del servidor",
				statusCode: 0,
			});
		}

		if (error.code === "ERR_CANCELED") {
			// console.info("Request was canceled", error.message);
			return;
		}

		throw new ErrorQuery({
			message: error?.message ?? "Error al configurar la solicitud",
		});
	}

	throw new ErrorQuery({
		message:
			error instanceof Error ? error?.message : "Error desconocido en la API",
		statusCode: 500,
		error: error,
	});
};

/**
 * Checks if the given error is a session expired error (403).
 *
 * @param error The error object to check.
 * @returns true if the error is a session expired error, false otherwise.
 *
 * @example
 * if (isSessionExpiredError(error)) {
 *   // Redirect to login or show session expired modal
 * }
 */
export const isSessionExpiredError = (error: unknown): boolean => {
	if (error instanceof ErrorQuery) {
		return error.statusCode === 403;
	}
	if (error instanceof Error) {
		return error.message.includes("403");
	}
	return false;
};

/**
 * Checks if the given error is an unauthorized error (401).
 *
 * @param error The error object to check.
 * @returns true if the error is an unauthorized error, false otherwise.
 *
 * @example
 * if (isUnauthorizedError(error)) {
 *   // Handle unauthorized access
 * }
 */
export const isUnauthorizedError = (error: unknown): boolean => {
	if (error instanceof ErrorQuery) {
		return error.statusCode === 401;
	}
	if (error instanceof Error) {
		return error.message.includes("401");
	}
	return false;
};
