const router = require('express').Router();
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware');
const Accounts = require('./accounts-model');

router.use('/:id', checkAccountId);

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json(await Accounts.getAll());
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Accounts.getById(req.params.id);
    // if (!account) {
    //   res.status(404).json({
    //     message: 'account not found',
    //   });
    // } else {
    res.json(account);
  } catch (err) {
    next(err);
  }
});

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Accounts.create(req.body);
    console.log(account);
    res.status(201).json(account);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Accounts.updateById(req.params.id, req.body);
    res.json(account);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    await Accounts.deleteById(req.params.id);
    res.json(req.account);
  } catch (err) {
    next(err);
  }
});

// eslint-disable-next-line
router.use((err, req, res, next) => {
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
