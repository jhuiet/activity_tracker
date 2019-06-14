import { Router } from 'express';
import { Authenticator } from './passwords';
// import {Request, Response} from "express";
// import * as express from 'express';
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";

const status = require('http-status');
const router = Router();
const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');


router.post('/', async (req, res) => {
  validateEmailAndPassword(req).then(user => {
    const userId = user.Id;
    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expriesIn: 120,
        subject: userId
    })
  });
});

function validateEmailAndPassword(req) {
  const user = req.context.models.User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return Promise.reject('Invalid email entered');
  if (!Authenticator.comparePass(req.body.password, user.password)) {
    Promise.reject('Invalid password entered');
  }
  return Promise.resolve(user);
}
