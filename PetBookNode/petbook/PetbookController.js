var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Petbook = require('./Petbook');

/* All calls require respective object 
 * interface unless solely param based.
 * 
 * user calls require owner interface
 * pets calls require pet interface
 * clubs calls require club interface
 * parks calls require park interface
 */

router.get('/user/login', function (req, res) {
    Petbook.getowner(req.body, function(err, owner) {
        if(err) {
            res.status(400).json(err);
        } else {
            if (owner === undefined || owner.length === 0) {
                res.status(401).send('No such user');
            } else {
                bcrypt.compare(req.body.password, owner[0].password, function(err, valid) {
                    if (valid) {
                        res.json(owner[0]);
                    } else {
                        res.status(401).json(err);
                    }
                }
            }
        }
    });
});

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

router.get('/user/pets', function (req, res) {
    Petbook.getpetsbyowner(req.body, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/pets', function (req, res) {
    Petbook.getpet(req.body, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows[0]);
        }
    });
});

router.get('/pets/:petname', function (req, res) {
    Petbook.getpetsbyname(req.params.petname, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/pets', function (req, res) {
    Petbook.createpet(req.body, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.put('/pets', function (req, res) {
    Petbook.updatepet(req.body, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.delete('/pets', function (req, res) {
    Petbook.deletepet(req.body, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.get('/clubs', function (req, res) {
    Petbook.getclubs(function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/clubs/:clubname', function (req, res) {
    Petbook.getclubbyname(req.params.clubname, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/clubs', function (req, res) {
    Petbook.createclub(req.body, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.put('/clubs', function (req, res) {
    Petbook.updateclub(req.body, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.delete('/clubs', function (req, res) {
    Petbook.deleteclub(req.body, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

module.exports = router;