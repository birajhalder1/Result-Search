const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = " Name must be minimum 2 and maximum 30 character.";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = " Name field is required ";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = " password must be at least 6 character";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = " password field is required ";
  }

  if (!Validator.isLength(data.mobile, { min: 10, max: 12 })) {
    errors.mobile = " Mobile number must be at least 10 character";
  }
  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = " Mobile number field is required ";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
