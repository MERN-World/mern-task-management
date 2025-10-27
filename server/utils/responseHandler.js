export const sendResponse = (res, {
  success = true,
  statusCode = 200,
  message = "Success",
  data = null,
  errors = null,
  meta = null
}) => {
  const response = {
    success,
    message,
  };

  if (data) response.data = data;
  if (errors) response.errors = errors;
  if (meta) response.meta = meta;

  return res.status(statusCode).json(response);
};

export const successResponse = (res, message, data = null, meta = null) =>
  sendResponse(res, { success: true, statusCode: 200, message, data, meta });

export const createdResponse = (res, message, data = null) =>
  sendResponse(res, { success: true, statusCode: 201, message, data });

export const errorResponse = (res, message = "Something went wrong", errors = null, statusCode = 500) =>
  sendResponse(res, { success: false, statusCode, message, errors });

export const badRequest = (res, message = "Bad Request", errors = null) =>
  sendResponse(res, { success: false, statusCode: 400, message, errors });

export const unauthorized = (res, message = "Unauthorized") =>
  sendResponse(res, { success: false, statusCode: 401, message });

export const forbidden = (res, message = "Forbidden") =>
  sendResponse(res, { success: false, statusCode: 403, message });

export const notFound = (res, message = "Not Found") =>
  sendResponse(res, { success: false, statusCode: 404, message });

export const serverError = (res, message = "Internal Server Error", errors = null) =>
  sendResponse(res, { success: false, statusCode: 500, message, errors });
