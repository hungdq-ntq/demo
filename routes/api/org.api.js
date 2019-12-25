const fs = require('fs');
const path = require('path');

const router = require('express').Router();

const generator = require('../../service/org-chart-generator');

const dataDir = path.resolve(__dirname, '../../data');

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

router.post('/departments/:id', (req, res, next) => {
    const filePath = path.join(dataDir, `/orgs/${ req.params.id }`);

    if (!fs.existsSync(filePath)) {
        return res.sendStatus(404);
    }

    const departments = fs.readFileSync(filePath);

    try {
        res.json(JSON.parse(departments));
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/:id', (req, res, next) => {
    const filePath = path.join(dataDir, `/users/${ req.params.id }`);

    if (!fs.existsSync(filePath)) {
        return res.sendStatus(404);
    }

    const users = fs.readFileSync(filePath);

    try {
        res.json(JSON.parse(users));
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
