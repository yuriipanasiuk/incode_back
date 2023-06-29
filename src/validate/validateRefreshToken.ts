import Joi from "joi";

const validateToken = Joi.object({
  refreshToken: Joi.string().required(),
});

export default validateToken;