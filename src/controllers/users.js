'use strict';

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require('../services/usersServices.js');

const getAllUsers = (req, res) => {
  const users = getAll();

  res.end(users);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const newUser = create(name);

  res.sendStatus(201);
  res.end(newUser);
};

const getOneUser = (req, res) => {
  const { id } = req.params;
  const foundUser = getById(id);

  if (typeof id !== 'number') {
    res.sendStatus(400);
  }

  if (!foundUser) {
    res.sendStatus(404);
  }

  res.sendStatus(200);
  res.end(foundUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;
  const foundUser = getById(id);

  if (!foundUser) {
    res.sendStatus(404);
  }

  remove(id);
  res.sendStatus(204);
  res.end();
};

const updateUser = (res, req) => {
  const { id } = req.params;

  const foundUser = getById(id);

  if (!foundUser) {
    res.sendStatus(404);
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);
  }

  update({
    id, name,
  });

  res.sendStatus(200);
  res.end();
};

module.exports = {
  getAllUsers, createUser, getOneUser, removeUser, updateUser,
};
