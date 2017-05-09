var credentials = {
	client: {
		id: 'b360e326-3fe7-4aef-bc7b-f5f103ab85c5',
		secret: 'b360e326-3fe7-4aef-bc7b-f5f103ab85c5'
	},
	auth: {
		tokenHost: 'https://login.microsoftonline.com',
		authorizePath: 'common/oauth2/v2.0/authorize',
		tokenPath: 'common/oauth2/v2.0/token'
	}
};

var oauth2 = require('simple-oauth2').create(credentials);
var redirectUri = 'http://localhost:3000/authorize';

// The scopes the app requires
var scopes = [ 'openid',
	'https://outlook.office.com/mail.read'];

function getAuthUrl() {
	var returnVal = oauth2.authorizationCode.authorizeURL({
		redirect_uri: redirectUri,
		scope: scopes.join(' ')
	});
	console.log('Generated auth url: ' + returnVal);
	return returnVal;
}

function getTokenFromCode(auth_code, callback, response) {
	var token;
	oauth2.authorizationCode.getToken({
		code: auth_code,
		redirect_uri: redirectUri,
		scope: scopes.join(' ')
	}, function (error, result) {
		if (error) {
			console.log('Access token error: ', error.message);
			callback(response, error, null);
		} else {
			token = oauth2.accessToken.create(result);
			console.log('Token created: ', token.token);
			callback(response, null, token);
		}
	});
}


exports.getAuthUrl = getAuthUrl;
exports.getTokenFromCode = getTokenFromCode;