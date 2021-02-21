import validators from "validators"

export const registerChecker = (req, res, next) => {
  const { name, email, password } = req.body
  if (validators.EmailValidator(email)) {
    res.json({
      error: "Email is not formatted",
    })
  } else if (validators.MinLengthValidator(password) != 6) {
    res.json({
      error: "Password must contain atleast 6 characters",
    })
  }
  next()
}

export const loginChecker = (req, res, next) => {
  const { name, email, password } = req.body
  if (validators.EmailValidator(email)) {
    res.json({
      error: "Email is not formatted",
    })
  } else if (validators.MinLengthValidator(password) != 6) {
    res.json({
      error: "Password must contain atleast 6 characters",
    })
  }
  next()
}
