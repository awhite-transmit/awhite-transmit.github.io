//console.log('hello from transmit');
var sdk = xmsdk.XmSdk();
var endpoint = "http://localhost:8080";
var appId = "citi-web-test";
var apiTokenId = "myApiTokenId";
var apiToken = "myApiToken";
var connectionSettings = com.ts.mobile.sdk.SDKConnectionSettings.create(
    endpoint, appId, apiTokenId, apiToken);
sdk.setConnectionSettings(connectionSettings);
var uiHandler = new xmui.XmUIHandler();
sdk.setUiHandler(uiHandler);
var username = "fred";
var policyId = "default_auth";
var policyParams = {};

sdk.initialize().then(function () {
    console.log('sdk is successfully initialized - now authenticate');

    var clientContext = {};
    //var containerElement = document.getElementById("#myContainer");
    //var clientContext = { uiContainer: containerElement, username: username };
    
    if (username) {
        sdk.authenticate(username, policyId, policyParams, clientContext)
            .then(function (successfulAuth) {
                console.log("Successful authentication. Token = " + successfulAuth.getToken());
                sdk.l
            })
            .catch(function (err) {
                console.error('Authentication error: ' + err.toString());
            });
    } else {
    }
}).catch(function (err) {
});

function setLoggedInToken(token) {
    // If token is non-nil then we have logged in successfully.
    // Otherwise it means we're logged out and may not be bound
    var isBind = false;
    var hasToken = token ? true : false;
    // We check if the browser supports device cryptographic binding
    if (!hasToken && sdk.deviceSupportsCryptoBinding()) {
        var username = document.getElementById("username").value;
        // If the browser is already bound for this user, we should not bind again.
        if (!sdk.isBoundForUser(username)) {
            isBind = true;
        }
    }
    document.getElementById("bindButton").disabled = !isBind;
    document.getElementById("loginButton").disabled = isBind || hasToken;
    document.getElementById("logoutButton").disabled = !hasToken;
}
function reportError(errorMessage) {
    alert("Error occurred: " + errorMessage);
}
function clientContext() {
    return { uiContainer: $("#myContainer") };
}

function onLogin(isBind) {
    var username = document.getElementById("username").value;
    var loginPromise = isBind ?
        sdk.bind(username, {}, {}) :
        sdk.authenticate(username, policyId, {}, {});
    loginPromise.then(function (result) {
        alert("Authenticated successfully");
        setLoggedInToken(result.getToken());
    }).catch(function (err) {
        reportError(err.toString());
        setLoggedInToken(null);
    });
}
function onLogout() {
    setLoggedInToken(null);
    sdk.logout().then(function () {
        alert("Logged out");
    });
}

