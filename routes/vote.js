var express = require('express');
var router = express.Router();
var Pusher = require('pusher');
const Vote = require('../models/Vote');
const keys = require('../config/keys');

var pusher = new Pusher({
    appId: keys.pusherAppId,
    key: keys.pusherKey,
    secret: keys.pusherSecret,
    cluster: keys.pusherCluster,
    encrypted: keys.pusherEncrypted
  });


router.post('/', function(req,res){
const newPoll = {
framework : req.body.framework,
points: 10
};


new Vote(newPoll).save().then(vote =>{
 pusher.trigger('poll','vote',{
 points: parseInt(vote.points),
 framework : vote.framework
    });

return res.json({  success: true ,  message: 'Gracias por su voto'});

});


});



module.exports = router;