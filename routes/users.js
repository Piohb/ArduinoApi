const express = require('express');
const format = require('../joi_request_format');
const User = require('../schemas/users');
const router = express.Router();

let  stats = {nb_in: 0, nb_max: 2};

router.get('/', async (req, res) => {
    console.log('get');
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch(error) {
        res.status(500).json({message:error})
    }
});

router.get('/stats', async (req, res) => {
    try {
        res.status(200).json(stats);

    } catch(error) {
        res.status(500).json({message:error})
    }
});

router.get('/:uid', async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.params.uid });
        if(user === null) {
            return res.status(404).json({message:'UID not found.'});
        }
        res.status(200).json(user);

    } catch(error) {
        res.status(500).json({message:error})
    }
});

router.put('/:uid/enter', async (req, res) => {
    console.log('enter');
    try {

        if (stats['nb_in'] <= stats['nb_max']){

        }

        let update = {isHere: true, lastVisit: Date.now()};
        const user = await User.findOneAndUpdate({uid: req.params.uid}, update);
        console.log(user);
        stats['nb_in']++;

        if(user === null)
            return res.status(404).json({message:'UID not found.'});
        res.status(200).json(user)

    } catch(error) {
        res.status(500).json({message: error});
    }
});

router.put('/:uid/wash', async (req, res) => {
    console.log('wash');
    try {
        let update = {isClean: true};
        const user = await User.findOneAndUpdate({uid: req.params.uid}, update);
        stats['nb_clean']++;

        if(user === null)
            return res.status(404).json({message:'UID not found.'});
        res.status(200).json(user)

    } catch(error) {
        res.status(500).json({message: error});
    }
});

router.put('/:uid/exit', async (req, res) => {
    console.log('exit');
    try {
        let update = {isHere: false, isClean: false};
        const user = await User.findOneAndUpdate({uid: req.params.uid}, update);

        if(user === null)
            return res.status(404).json({message:'UID not found.'});
        res.status(200).json(user)

    } catch(error) {
        res.status(500).json({message: error});
    }
});

router.post('/new', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const isBodyCorrect = format.postBodyFormat.validate(req.body);
    if(isBodyCorrect.error)
        return res.status(400).json({message: isBodyCorrect.error.details[0].message});

    const user = new User({
        uid: req.body.uid,
        name: req.body.name,
        isHere: false,
        isClean: false,
        lastVisit: null
    });
    try {
        const newUser = await user.save();
        res.status(200).json(newUser);

    } catch(error) {
        res.status(500).json({message: error});
    }
});

router.put('/:uid', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    try {
        let update = {uid: req.body.uid, name:req.body.name};
        const user = await User.findOneAndUpdate({uid: req.params.uid}, update);
        if(user === null)
            return res.status(404).json({message:'UID not found.'});
        res.status(200).json(user)

    } catch(error) {
        res.status(500).json({message: error});
    }
});

router.delete('/:uid', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    try {
        const user = await User.findOneAndDelete({uid: req.params.uid});
        if(user === null) {
            return res.status(404).json({message:'UID not found.'});
        }
        return res.status(200).json(user);

    } catch(error) {
        res.status(500).json({message: error});
    }
});

module.exports = router;
