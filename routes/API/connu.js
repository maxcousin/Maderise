var express = require('express');
var router = express.Router();
var models = require('../../models');

/************************************/
/*** Ajout des compétences        ***/
/************************************/
router.post('/addCompetence', function(req, res, next){
    models.connu.create({
        code_p: req.body.code_p,
        code_c: req.body.code_c,
        duree: req.body.duree,
        niveau: req.body.niveau,
        obtention: req.body.obtention,
        expire: req.body.expire,
        lieu: req.body.lieu
    });
});
module.exports = router;
