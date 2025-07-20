import Joi from "joi";

const DateSchema = Joi.string()
  .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
  .required()
  .messages({
    "string.pattern.base": "fromDate must be in the format dd/mm/yyyy",
  });

export const searchQuerySchema = Joi.object({
  destination: Joi.number().integer().required(),
  groupSize: Joi.number().integer().required(),
  fromDate: DateSchema,
  toDate: DateSchema,
});

export function validateSearchQuery<T>(query: unknown): T {
  const { value, error } = searchQuerySchema.validate(query);
  if (error) {
    throw new Error(`Validation failed. ${error.message}`);
  }
  return value;
}
