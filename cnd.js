var express = require('express'), 
google = require('googleapis'),
sheets = google.sheets('v4'),
OAuth2 = google.auth.OAuth2,
/*oauth2Client = new OAuth2(
  "859687445627-pb85oueqh57s2vpp16jlti67927jf63r.apps.googleusercontent.com",
  "m1t6ZX1OtGOy2iHBKgbCz7Zx",
  "http://localhost:2300"///#/app/users/all"
),*/
app = module.exports = express(),
http = require('http'),
server = http.createServer(app),
io = require('socket.io').listen(server);
app.use(express.static(__dirname + '/www'));
app.set('port', process.env.PORT || 9715); 
var test = "";
/**********debut socket.io**********/
io.sockets.on('connection', function (socket) {
	console.log('socket:',socket);
	
	socket.on('test', function (message) {
		console.log('Seb, le retour est : ');
		console.log(message);
/*****fin exemple multi get*****/
		socket.emit('test', message);
		//socket.broadcast.emit('test', message);
	});
}); 
/**********fin socket.io**********/


//ecoute sur le serveur
server.listen(app.get('port'), function () {
  console.log('Express server listening on port %d in %s mode',app.get('port'),app.settings.env);
});

/*****debut exemple get***** /
authorize(function(authClient) {
  var request = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: '1mFNoxXKCosBGkhWcOOaYTuQ4ud2PmtRgsqnCRMRHsTg',  // TODO: Update placeholder value.

    // The A1 notation of the values to retrieve.
    range: 'A1',  // TODO: Update placeholder value.

    // How values should be represented in the output.
    // The default render option is ValueRenderOption.FORMATTED_VALUE.
    valueRenderOption: 'FORMATTED_VALUE',  // TODO: Update placeholder value.

    // How dates, times, and durations should be represented in the output.
    // This is ignored if value_render_option is
    // FORMATTED_VALUE.
    // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
    dateTimeRenderOption: 'SERIAL_NUMBER',  // TODO: Update placeholder value.

    auth: authClient
  };

  sheets.spreadsheets.values.get(request, function(err, response) {
    if (err) {
      console.log(err);
      return;
    }

    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  });
});
/*****fin exemple one get***** /
/*****debut exemple one update*****  /
authorize(function(authClient) {
  var request = {
    // The ID of the spreadsheet to update.
    spreadsheetId: '',  // TODO: Update placeholder value.

    // The A1 notation of the values to update.
    range: '',  // TODO: Update placeholder value.

    // How the input data should be interpreted.
    valueInputOption: '',  // TODO: Update placeholder value.

    resource: {
      // TODO: Add desired properties to the request body. All existing properties
      // will be replaced.
    },

    auth: authClient
  };

  sheets.spreadsheets.values.update(request, function(err, response) {
    if (err) {
      console.log(err);
      return;
    }

    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  });
});

/*****fin exemple one update*****/

function authorize(callback) {
  // TODO: Change placeholder below to generate authentication credentials. See
  // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
  //
  // Authorize using one of the following scopes:
  //   'https://www.googleapis.com/auth/drive'
  //   'https://www.googleapis.com/auth/drive.readonly'
  //   'https://www.googleapis.com/auth/spreadsheets'
  //   'https://www.googleapis.com/auth/spreadsheets.readonly'
  //var authClient = null;
  //var authClient = "";
  //var authClient = "AIzaSyDNEGXFLlHmM7tf01t6VlE0DVu2wLvSNrU";
  //var authClient = "AIzaSyDGfPVrkyv3CL204APJneT3cKNRQlI78zM";
  //var authClient = "859687445627-pb85oueqh57s2vpp16jlti67927jf63r.apps.googleusercontent.com";

  
  var clientSecret = "m1t6ZX1OtGOy2iHBKgbCz7Zx";
  var clientId = "859687445627-pb85oueqh57s2vpp16jlti67927jf63r.apps.googleusercontent.com";
  var redirectUrl = "http://localhost:2300";
  //var auth = new googleAuth();
 
  var authClient = new OAuth2(clientId, clientSecret, redirectUrl);
   var credentials={};
//credentials.expiry_date= "1463514280558";
credentials['refresh_token']="4/LeqW9c6YWhwyxRa8IsbZ179qHIHewNJQYhJuS_oSBow";
//credentials['access_token']="aaaaaaaaaaaaaaa";
authClient.setCredentials(credentials);
  /*authClient.refreshAccessToken(function(err, tokens) {
  // your access_token is now refreshed and stored in oauth2Client
  // store these new tokens in a safe place (e.g. database)
});*/
	console.log("authClient:",authClient);
  //var authClient = "AIzaSyDGfPVrkyv3CL204APJneT3cKNRQlI78zM";

  if (authClient == null) {
    console.log('authentication failed');
    return;
  }
 
  callback(authClient);
}
/*******************/
