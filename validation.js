const Joi = require("@hapi/joi");

const validateRegistration = (requestBody) => {
  const registrationSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.string().min(6).required(),
  });

  return registrationSchema.validate(requestBody);
};

const validateLogin = (requestBody) => {
  const loginSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return loginSchema.validate(requestBody);
};

const validateNewTask = (requestBody) => {
  const newTaskSchema = Joi.object({
    title: Joi.string().min(6).required(),
    description: Joi.string().min(6).required(),
    dateValue: Joi.string(),
    tabName: Joi.string().required(),
    userId: Joi.string().required(),
  });

  return newTaskSchema.validate(requestBody);
};
module.exports.validateRegistration = validateRegistration;
module.exports.validateLogin = validateLogin;
module.exports.validateNewTask = validateNewTask;
