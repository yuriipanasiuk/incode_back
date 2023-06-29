import Joi from "joi";

const validateLoginField = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export default validateLoginField;
