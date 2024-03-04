import express from 'express'
const express = require('express')

const router = express.Router()

const {
    getEmployer,
    registerEmployer,
    updateEmployer,
    addEmployerInfo,
    deleteEmployer,
} = require('../controllers/employerController')

router.get('/:id', getEmployer)
router.post('/', registerEmployer)
router.put('/replace/:id', updateEmployer);
router.patch('/add/:id', addEmployerInfo);
router.delete('/:id', deleteEmployer);

module.exports = router
