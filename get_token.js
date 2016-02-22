var request = require('request');
var code = process.argv[2];
token = request.post({
    url: 'https://api.home.nest.com/oauth2/access_token',
    form: {
      code:          code,
      client_id:     process.env.NEST_APP_CLIENT_ID,
      client_secret: process.env.NEST_APP_CLIENT_SECRET,
      grant_type:    'authorization_code'
    }},
    function(error, httpResponse, body){
      jsonBody = JSON.parse(body)
      if(jsonBody.error) {
       console.log('ERROR AUTHENTICATING: ' + jsonBody.error);
      }
      else{
        console.log(JSON.parse(body).access_token)
      }
    }
);
