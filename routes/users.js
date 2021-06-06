const express = require('express');
const format = require('../joi_request_format');
const User = require('../schemas/users');
const Stat = require('../schemas/stats');
const Dates = require('../schemas/dates');
const router = express.Router();

let  stats = {};
Stat.findById('60b66c2cf3a0f3a4861eab9a').then((stat) => {
    stats = stat;
});

router.get('/', async (req, res) => {
    console.log('get');
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch(error) {
        res.status(500).json({message:error})
    }
});

router.get('/in', async (req, res) => {
    console.log('in');
    try {
        const users = await User.find({ isHere: true });
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

router.get('/date', async (req, res) => {
   let day = new Date(req.query.date);

   let users = [];
   try {
       const dates = await Dates.find({ "dateEnter": { "$gt" : day} });

       for (const date of dates){
           const user = await User.findOne({uid: date.uid});
           users.push(user);
       }

       res.status(200).json(users);

   } catch (error){
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
        if (stats['nb_in'] < stats['nb_max']){
            let update = {isHere: true, lastVisit: Date.now()};
            const user = await User.findOneAndUpdate({uid: req.params.uid}, update);
            stats['nb_enter']++;
            stats['nb_in']++;
            await Stat.findByIdAndUpdate("60b66c2cf3a0f3a4861eab9a", stats);

            if(user === null)
                return res.status(404).json({message:'UID not found.'});
            res.status(200).json(user)

        } else {
            res.status(404).json("pas de place !!")
        }

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
        await Stat.findByIdAndUpdate("60b66c2cf3a0f3a4861eab9a", stats);

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
        stats['nb_in']--;
        await Stat.findByIdAndUpdate("60b66c2cf3a0f3a4861eab9a", stats);

        let date = new Dates({
            uid: req.params.uid,
            dateEnter: user.lastVisit,
            dateExit: Date.now()
        });
        await date.save();

        if(user === null)
            return res.status(404).json({message:'UID not found.'});
        res.status(200).json(user)

    } catch(error) {
        res.status(500).json({message: error});
    }
});

router.post('/new', async (req, res) => {
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
