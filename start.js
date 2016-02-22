var http = require('http');
var request = require('request');
var firebase = require('firebase');

var access_token = process.env.NEST_ACCESS_TOKEN;
var fb = new Firebase('wss://developer-api.nest.com');
fb.authWithCustomToken(access_token);

masterKey = 'RMnMcGVFMruvDWJhLUU70FR2u3kaD3X2'
syncState = function(snapshot){
  var state = snapshot.val() == 'heating' ? 'on' : 'off';
  console.log((new Date())+' - sending '+state+' request');
  request.get({url: 'https://maker.ifttt.com/trigger/hvac_'+state+'/with/key/JOQxVZah8yQxUHB91jV2Y'})
};

fb.child('devices/thermostats/'+masterKey+'/hvac_state').on('value', syncState);
setInterval(function(){
  fb.child('devices/thermostats/'+masterKey+'/hvac_state').once('value', syncState);
}, 1000*60*10);
