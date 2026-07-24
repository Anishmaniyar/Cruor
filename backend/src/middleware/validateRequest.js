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

        return next(new AppError(errorMessage, 400));
      }

      return next(error);
    }
  };
};
