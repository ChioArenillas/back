
const { getDonuts, loadData, getDonutById, createDonut, updateDonut, deleteDonut } = require('../controllers/Controller');
const express = require('express');

const donutsRouter = require('express').Router()

donutsRouter.get('/', getDonuts)
//donutsRouter.get('/loadData', loadData)
donutsRouter.get('/:id', getDonutById)
donutsRouter.post('/', createDonut)
donutsRouter.put('/:id', updateDonut)
donutsRouter.delete('/:id', deleteDonut)

module.exports = donutsRouter;