const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts');
};

const getById = (id) => {
  // DO YOUR MAGIC
  return db('accounts').where({ id }).first();
};

const create = (account) => {
  // DO YOUR MAGIC
  return db('accounts')
    .insert(account)
    .then(([id]) => {
      return getById(id);
    });
};

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  const updatedAccount = await db.transaction(async (trx) => {
    await trx('accounts').where({ id }).update(account);
    return await trx('accounts').where({ id }).first();
  });
  return updatedAccount;
};

const deleteById = (id) => {
  // DO YOUR MAGIC
  return db('accounts').where({ id }).del();
};

const getByName = (name) => {
  return db('accounts').where({ name }).first();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName,
};
