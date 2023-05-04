const express = require('express');
const db = require('../common/db');

const chores = express.Router();

const table = 'chores';

chores.get('/:child/balance', async (req, res) => {
  try {

    const { balance } = await db(table).select('balance').where('child', req.params.child).first();
    res.json(balance);

  } catch (error) {
    console.log(error);
  }
});

chores.get('/:child/balance/:amount', async (req, res) => {
  try {

    let { child, amount } = req.params;
    amount = parseInt(amount, 10) || 0;
    const success = await db(table).update('balance', amount).where('child', child);
    res.json(new Boolean(success));

  } catch (error) {
    console.log(error);
  }
});

chores.get('/:child/increment/:amount', async (req, res) => {
  try {

    let { child, amount } = req.params;
    amount = parseInt(amount, 10) || 0;
    const success = await db(table).increment('balance', amount).where('child', child);
    res.json(new Boolean(success));

  } catch (error) {
    console.log(error);
  }
});

chores.get('/:child/decrement/:amount', async (req, res) => {
  try {

    let { child, amount } = req.params;
    amount = parseInt(amount, 10) || 0;
    console.log('tetsttt', amount);
    const success = await db(table).decrement('balance', amount).where('child', child);
    res.json(new Boolean(success));

  } catch (error) {
    console.log(error);
  }
});

module.exports = chores;
