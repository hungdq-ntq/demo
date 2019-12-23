const router = require('express').Router();

const generator = require('../../service/org-chart-generator');

router.get('/ping', (req, res) => res.status(200).send({ date: new Date(), message: 'PONG' }));

router.post('/department', (req, res) => {
    return res.status(200).send(generator.generatorDepartment());
});

router.post('/user', (req, res) => {
    return res.status(200).send(generator.generatorUserExport());
});

router.post('/refresh', (req, res) => {
    return res.status(200).send(generator.refreshData());
});

module.exports = router;
