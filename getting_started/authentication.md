---
layout: home
title: "authentication"
nice_title: P2B - Authentication
---

<h1 class="title is-1">Authenticating to P2B API</h1>
<div class="content doc-content">
  <h1 class="title is-3">Introduction</h1>
  <p>Communication via Place2Be API is done in three steps:</p>
  <ol>
    <li>Fetching a token by giving API credentials to <strong>https://api.place2be.io/grantmeaccess</strong></li>
    <li>Opening a Websocket connection to <strong>wss://api.place2be.io</strong></li>
    <li>Authenticating by sending the token through the websocket connection</li>
  </ol>
  <p>When using the free plan, one isn't obliged to authenticate before starting interaction (although strongly recommended). Using a Premium plan requires you to authenticate before sending data's as they will be ignored otherwise to avoid spurious requests (hacking).</p>

  <p class="warning">All connections MUST be opened via SSL (TLS). Unsecured connections will be ignored by the API.</p>




  <h1 class="title is-3">Prerequisite: Installing Websocket support in your language</h1>
  <p>First step is to open a <strong>websocket</strong> connection and that might require an appropriate library. Examples below will be given in javascript but could be ported in any language.</p>
  <ul>
    <li>
      <h1 class="title is-4">Node.js :</h1>
      <p>The fastest library for node, written by Alex Hultman, is <a href="https://www.npmjs.com/package/uws">uws</a>. It is mainly written is C++ (making it blazingly fast) and has a binding to be used via node (<a href="https://github.com/uNetworking/uWebSockets">Github Core library</a>, <a href="https://github.com/uNetworking/bindings">Github Node bindings</a>).</p>

<div class="code-container" markdown="1">
```shell
npm install uws
# or add it to your package.json via
npm install --save uws
```
</div>

    </li>
    <li>
      <h1 class="title is-4">Ruby :</h1>
      <p>Many libraries exists, the two most downloaded ones being <a href="https://rubygems.org/gems/websocket">websocket</a> (<a href="https://github.com/imanel/websocket-ruby">Github</a>) and <a href="https://rubygems.org/gems/websocket-driver">websocket-driver-ruby</a> (<a href="https://github.com/faye/websocket-driver-ruby">Github</a>) gems.</p>

<div class="code-container" markdown="1">
```shell
gem install websocket # or websocket-driver
```
</div>
    </li>
    <li>
       <h1 class="title is-4">Python :</h1>
      <p>Main used library is <a href="https://pypi.python.org/pypi/websockets">websockets</a> (<a href="https://github.com/aaugustin/websockets">Github</a>) and is installed via pip.</p>

<div class="code-container" markdown="1">
```shell
pip install websockets
```
</div>
    </li>
    <li>
      <h1 class="title is-4">cURL :</h1>
      <p>Unfortunately, websocket connection can't be established via cURL as they are persistent connections at the opposite to how cURL works (request/response scheme).</p>
    </li>
  </ul>




  <h1 class="title is-3">Getting a valid Json Web Token (JWT)</h1>
  <p>Asking for a token is making a POST request to <strong>https://api.place2be.io/grantmeaccess</strong> giving API credentials (key + secret).</p>

  <h1 class="title is-4">Bad : Client side request</h1>
  
  <figure class="image has-text-centered figure-printscreen">
    <img class="is-hcentered is-large" src="{{ site.baseurl }}/assets/images/authentication/authentication_bad.png" alt=""/>
    <figcaption class="is-hcentered">Fig1. - Authenticating via hardcoded Credentials on the client side must be avoided in production but is sufficient with for test purposes (using test credentials).</figcaption>
  </figure>
  <p>Although possible via a simple cURL request or equivalent client side request, one MUST NOT do that in production as it exposes the API keys to the client. See <a href="https://rammic.github.io/2015/07/28/hiding-secrets-in-android-apps/">this detailed article</a> on how to extract secrets from Android Applications.</p>

  <p>Using client side request must only be done using the test API credentials for testing purposes. The cURL request is the following:</p>

<div class="code-container" markdown="1">
```shell
curl --request POST -d 'api_key=API_KEY' -d 'api_secret=API_SECRET' https://api.place2be.io/grantmeaccess
```
</div>


  <h1 class="title is-4">Good : Server side request</h1>
  <p>The best way to require a valid token is by requesting one from your servers when authenticating your own users. No API credentials are exposed that way. The process goes like this:</p>

  <figure class="image has-text-centered figure-printscreen">
    <img class="is-hcentered is-large" src="{{ site.baseurl }}/assets/images/authentication/authentication_good.png" alt=""/>
    <figcaption class="is-hcentered">Fig1. - Authenticating from Server side never exposes the API credentials.</figcaption>
  </figure>

  <ol>
    <li>User sends you her credentials (or authenticates via third party through <strong>Omniauth</strong>).</li>
    <li>You server(s) request a token by making POST request with valid API keys. As the connection is over SSL, keys are never exposed.</li>
    <li>P2B API returns a valid token.</li>
    <li>You send the token back to the user as authentication success.</li>
  </ol>

  <p><strong>N.B :</strong> To avoid delays, asking batches of token is also possible, contact us if you need such a feature.</p>
  
  <p>Server side code could be implemented as the following:</p>

<div class="code-container" markdown="1">
```javascript
var fetch     = require('node-fetch');
var apiKey    = process.env.P2B_API_Key;
var apiSecret = process.env.P2B_API_Secret;

/* Initial POST request to submit credentials */
fetch('https://api.place2be.io/grantmeaccess', {
  method: 'POST',
  headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
  body: 'api_key=' + apiKey + '&api_secret=' + apiSecret
}).then(function(data){

  if (data.status === 200) {
    /* API sends a token as json response */
    data.json().then(function (content) {
      /* Send content.token back to your user */
    });
  } else {
    /* Handle Error */
  }
});
```
</div>

  <h1 class="title is-3">Opening Websocket connection</h1>
  <p>A <strong>websocket</strong> connection is basically an http connection upgraded via HTTP 101 request.</p>
  <p>The connection has to be done from the client to <strong>wss://api.place2be.io</strong>, with a valid Token.</p>

  <p class="warning"><i>Notice the use of <strong>wss://</strong> instead of <strong>ws://</strong>, requiring the use of SSL (TLS)</i>.<br /><strong>Unsecured connection are ignored by the API</strong>.</p>

  <p>Client side code opening a connection could be implemented as the following:</p>


<div class="code-container" markdown="1">
```javascript
/* Creating new webSocket connection object */
var WebSocket = require('uws');
ws = new WebSocket('wss://api.place2be.io');

/* Sending Authentication request */
ws.send(JSON.stringify( {
     type: 'authenticate',
  payload: { token: TOKEN }
}));

/* P2B API should answer: */
/* { data: '{"type":"authenticated","payload":{}}' } */
```
</div>

  <p>And that's it! Client should now be able to send request and receive Live Metrics.</p>
</div>
