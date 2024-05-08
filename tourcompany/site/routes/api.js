const express = require('express');
const { getTours, getTourById, setTourAmount, addTour } = require('../database/toursOperations');
const { getAllClients, addClient, getClientById } = require('../database/clientOperations');
const { addOrder, getAllOrders, getOrderById, deleteOrder } = require('../database/orderOperations');


const router = express.Router();


router.get('/tours/getalltours', async function(req, res){
    let getToursResponse = await getTours();

    if (getToursResponse.code != 200){
        res.status(501).json({code: 501});
        return;
    }

    res.status(200).json(getToursResponse);

});

router.post('/tours/addtour', async function(req, res){
    let name = req.body.name;
    let startDate = new Date(req.body.startDate);
    let endDate = new Date(req.body.endDate);
    let city = req.body.city;
    let services = req.body.services;
    let price = req.body.price;
    let amount = req.body.amount;

    let responseAddTour = await addTour(name, startDate, endDate, city, services, price, amount);

    if (responseAddTour.code != 200){
        res.status(501).json({code: 501});
        return;
    }

    res.status(200).json({
        code: 200,
        tourId: responseAddTour.tourId
    });

});

