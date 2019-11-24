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
    Petbook.getowner(req.query.email, function(err, owner) {
        if(err) {
            res.status(400).json(err);
        } else {
            if (owner === undefined || owner.length === 0) {
                res.status(401).send('No such user');
            } else {
                bcrypt.compare(req.query.password, owner[0].password, function(err, valid) {
                    if (valid) {
                        owner[0].password = '';
                        res.json(owner[0]);
                    } else if (!valid) {
                        res.status(401).send('Invalid password');
                    } else {
                        res.status(400).json(err);
                    }
                });
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

router.get('/user/pets/:owner_id', function (req, res) {
    Petbook.getpetsbyowner(req.params.owner_id, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/pets/id/:pet_id', function (req, res) {
    Petbook.getpet(req.params.pet_id, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows[0]);
        }
    });
});

router.get('/pets/name/:petname', function (req, res) {
    Petbook.getpetsbyname(req.params.petname, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/pets/location/:location', function (req, res) {
    Petbook.getpetsbylocation(req.params.location, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/pets/club/:club_id', function (req, res) {
    Petbook.getpetsbyclub(req.params.club_id, function(err, rows) {
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

router.delete('/pets/:pet_id', function (req, res) {
    Petbook.deletepet(req.params.pet_id, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.get('/clubs/id/:club_id', function (req, res) {
    Petbook.getclub(req.params.club_id, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows[0]);
        }
    });
});

router.get('/clubs/name/:club_name', function (req, res) {
    Petbook.getclubbyname(req.params.club_name, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/clubs/join', function (req, res) {
    Petbook.joinclub(req.body, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.post('/clubs/leave', function (req, res) {
    Petbook.leaveclub(req.body, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
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

router.delete('/clubs/:club_id', function (req, res) {
    Petbook.deleteclub(req.params.club_id, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.get('/friendships/:pet_id', function (req, res) {
    Petbook.getfriendsbypet(req.params.pet_id, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/friendships', function (req, res) {
    Petbook.getfriendship(req.query, function(err, id) {
        if(err) {
            res.status(400).json(err);
        } else {
            if (id === 0)
                res.send(0)
            else
                res.json(id[0]);
        }
    });
});

router.post('/friendships', function (req, res) {
    Petbook.addfriendship(req.body, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.delete('/friendships/:friendship_id', function (req, res) {
    Petbook.deletefriendship(req.params.friendship_id, function(err, count) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

module.exports = router;
