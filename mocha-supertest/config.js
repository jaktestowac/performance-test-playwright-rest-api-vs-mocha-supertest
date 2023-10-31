const baseAddr = 'http://localhost:3000';

const request = require('supertest')(baseAddr);
const { faker } = require('@faker-js/faker');
const { expect } = require('chai');

const articlesUrl = '/api/articles';
const usersUrl = '/api/users';
const commentsUrl = '/api/comments';
const loginUrl = '/api/login';

const existingUserEmail = 'TODO: set';
const existingUserPass = 'TODO: set';
const existingUserId = 2;

const numberOfRuns = 100;

module.exports = {
  request,
  faker,
  expect,
  articlesUrl,
  usersUrl,
  commentsUrl,
  loginUrl,
  existingUserPass,
  existingUserEmail,
  existingUserId,
  numberOfRuns,
};
