import { Model } from "mongoose";
import {Service } from '../models/interface';
import {Request,Response} from 'express';

const express = require('express');
const router = express.Router();
const ServiceProvidersModel:Model<Service> = require('../models/ServiceProviderModel');

router.get('/',async(req:Request,res:Response)=>{
    try {
        const ServiceDB = await ServiceProvidersModel.find();
        res.send(ServiceDB);
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ ok: false, error: error.message });
      }
});

export default router;