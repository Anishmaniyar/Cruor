// to validate the request of zod schemas

import AppError from "../utils/appError.js";

export const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = parsed.body;
      next();
    } catch (error) {
      if (error.issues) {
        const errorMessage = error.issues
          .map((issue) => issue.message)
          .join(", ");

        // Log which fields failed so a 400 is diagnosable from the deployed
        // logs. Only the field paths are logged, never the submitted values:
        // these same schemas run on the login/register routes, so a request
        // body can contain a plaintext password.
        const failedFields = error.issues
          .map((issue) => issue.path.join("."))
          .join(", ");

        console.warn(
          `[validate] 400 ${req.method} ${req.originalUrl} - invalid field(s): ${failedFields} (${errorMessage})`,
        );

        return next(new AppError(errorMessage, 400));
      }

      return next(error);
    }
  };
};
