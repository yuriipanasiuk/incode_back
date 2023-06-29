import Joi from "joi";

const validateRegisterField = Joi.object({
  fullName: Joi.string().required(),
  userName: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export default validateRegisterField;
