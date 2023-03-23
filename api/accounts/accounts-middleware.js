const { getById, getByName } = require('./accounts-model');

exports.checkAccountPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)

  const { name, budget } = req.body;

  if (!name || !budget) {
    return next({ status: 400, message: 'name and budget are required or budget must be a number' });
  }

  const trimmedName = name.trim();
  if (trimmedName.length < 3 || trimmedName.length > 100) {
    return next({ status: 400, message: 'name of account must be between 3 and 100' });
  }

  const parsedBudget = parseFloat(budget);
  if (isNaN(parsedBudget)) {
    return next({ status: 400, message: 'budget of account must be a number' });
  }

  if (parsedBudget < 0 || parsedBudget > 1000000) {
    return next({ status: 400, message: 'budget of account is too large or too small' });
  }

  req.body.name = trimmedName;
  req.body.budget = parsedBudget;
  next();
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await getByName(req.body.name);
    if (!account) {
      next();
    } else {
      next({ status: 400, message: 'that name is taken' });
    }
  } catch (err) {
    next(err);
  }
};

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await getById(req.params.id);
    if (!account) {
      next({ status: 404, message: 'account not found' });
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next(err);
  }
};
