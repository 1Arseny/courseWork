const express = require('express');
const { getTourById, getTours } = require('../database/toursOperations');
const { getAllClients } = require('../database/clientOperations');
const { getToursBySaled, getAllOrders } = require('../database/orderOperations');

const router = express.Router();


router.get('/', async function(req, res){
    let toursResponse = await getTours();
    let tours = toursResponse.tours;

    let resTours = tours.filter((item)=>{
        let amountBool = item.amount <= 0;
        let dateBool = new Date() > new Date(item.startDate);
        return !amountBool && !dateBool;
    })

    res.status(200).render('pages/index', {
        tours: resTours
    });
});

router.get('/tours', async function(req, res){
    res.status(200).render('pages/admin/tours.ejs');

});

router.get('/applications', async function(req, res){
    res.status(200).render('pages/admin/applications.ejs');

});

router.get('/authorization', async function(req, res){
    res.status(200).render('pages/authorization.ejs');

});

router.get('/clients', async function(req, res){
    res.status(200).render('pages/admin/clients.ejs');

});

router.get('/orders', async function(req, res){

    let clientsResponse = await getAllClients();
    let toursResponse = await getTours();

    res.status(200).render('pages/admin/orders.ejs', {
        clients: clientsResponse.clients,
        tours: toursResponse.tours
    });

});

