var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Petbook = require('./Petbook');

router.post('/user/create', function (req, res) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        Petbook.createowner(req.body, hash, function(err) {
            if(err) {
                res.status(400).json(err);
            } else {
                res.json(req.body);
            }
        });
    });
});

router.get('/user/login', function (req, res) {
    Petbook.getowner(req.body, function(err, owners) {
        if(err) {
            res.status(400).json(err);
        } else {
            if (owners === undefined || owners.length === 0) {
                res.status(401).send('No such user');
            } else {
                bcrypt.compare(req.body.password, owners[0].password, function(err, valid) {
                    if (valid) {
                        res.send(true);
                    } else {
                        res.status(401).json(err);
                    }
                }
            }
        }
    });
});

router.get('/groups', function (req, res) {
    Petbook.getgroups(function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/groups/:groupname', function (req, res) {
    Petbook.getgroup(req.params.groupname, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/groups', function (req, res) {
    Petbook.creategroup(req.body, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.put('/groups', function (req, res) {
    Petbook.updategroup(req.body, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.delete('/groups', function (req, res) {
    Petbook.deletegroup(req.body, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

module.exports = router;