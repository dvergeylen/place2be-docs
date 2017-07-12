---
layout: home
title: "api_overview"
nice_title: P2B - Quick Start API
---

<h1 class="title is-1">Quick Start API Guide</h1>
<div class="content doc-content">
  <h1 class="title is-3">Introduction</h1>
  <p>This 5 minutes tutorial will guide you through the process of granting an Activable from one of your Gamification Schemes to a Player via API. It consists of:</p>
  <ul>
    <li>Authenticating by receiving a valid token</li>
    <li>Opening a websocket connection</li>
    <li>Sending an activation request ('<i>activate</i>') via the opened connection</li>
    <li>Receiving success or failure, according to player meetings the requirements or not</li>
  </ul>
  <p>It assumes you followed the <a href="{{ site.baseurl }}/getting_started/gui_overview">Quick Start Gamification Scheme</a> tutorial and will start from there to explain the API basics.</p>

  <p>Quick access to most useful features can be found in the "Dev. Cheat Sheet" tab of every Gamification Schemes. Links to appropriate Documentation is always given when needed.</p>

  <h1 class="title is-3">Authenticating</h1>
  <p>Although the <a href="{{ site.baseurl }}/getting_started/authentication">Authenticating</a> documentation page describes proper ways to authenticate via the API, we'll stick with a simple cURL request to get a first token (valid 60 minutes).</p>
  <p>From your Dashboard, hit the 'Dev. Cheat Sheet' button from one of your Gamification Schemes. You should see two pairs of API keys, one for production and one for testing purposes. As we are exporing the API, let's use the Test API key pair.</p>

  <figure class="image has-text-centered figure-printscreen">
    <img class="is-hcentered" src="{{ site.baseurl }}/assets/images/api_overview/test_api_keys.png" alt=""/>
    <figcaption class="is-hcentered">Fig1. - Test API key pair should be used when testing</figcaption>
  </figure>

  <p>The cURL request consists of a POST request to <a href="javascript:void(0)">https://api.place2be.io/grantmeaccess</a> with API credentials. Requests to API MUST use SSL, as plain http is NOT supported.</p>

  <div class="code-container" markdown="1">
  ```shell
curl --request POST -d 'api_key=TEST_API_KEY' -d 'api_secret=TEST_API_SECRET' https://api.place2be.io/grantmeaccess
# Returns:  {'token':'eyJhbG...'}
  ```
  </div>

  <p>Keep the token answered by the API under the hood, we'll use it in the next step.</p>
  <h1 class="title is-3">Opening WebSocket Connection and identify with token</h1>
  <p>Opening the Websocket connection must be followed by an 'authenticate' message through the connection to let the API granting you access to further communication and receival of metrics. Not doing so will remain the connection open but all of your messages will silently be ignored by the API (and you won't receive any metric).</p>
  <p>Opening the connection MUST be done via wss:// as plain text connections are NOT supported.</p>
  <p>Example is written in javascript but can be adapted to other languages. It uses 'uws' as websocket client as it is the fastest open source websocket client server available.</p>

  <div class="code-container" markdown="1">
  ```javascript
var WebSocket = require('uws');

/* Creating new webSocket connection object */
ws = new WebSocket('wss://api.place2be.io');

/* On connection, send 'authenticate' message
 * using granted token from previous step */
ws.onopen = function(event) {
  ws.send(JSON.stringify( {
       type: 'authenticate',
    payload: { token: YOUR_TOKEN }
  }));
};
  ```
  </div>
  <p>You should receive an 'authenticated' message in reply.</p>
  <h1 class="title is-3">Sending activate request</h1>
  <p>Sending an activation request for an Activable in name of a Player requires to know the Activable id. The correct and proper way to do this is to request a complete list of activables and their corresponding IDs, but as this is a Quick Start guide, we'll use direct ID from the GUI without requesting for it via the API.</p>

  <p>A table of each Activable and corresponding ID's can be found under the "Dev. Cheat Sheet" tab of a Gamification Scheme. Once you have the ID, you can send the request. A player is defined with two keys: a provider and a uid. Players credentials aren't hosted on P2B API but you can identify players with your own references. If you use omniauth authentication method, you probably identify your users with 'provider' and 'uid'. If you only have Ids, feel free to set provider to "place2be".</p>

  <p>If you followed <a href="{{ site.baseurl }}/getting_started/gui_overview">Quick Start Gamification Scheme</a> tutorial you should have an Activable of type 'boolean' that doesn't require to play on behalf of a team. The request is then simply:</p>
  <div class="code-container" markdown="1">
  ```javascript
ws.send(JSON.stringify( {
       type: 'activate',
    payload: {
        activable_id: "4noAbqzxkQ5wND",
               score: true,
              player: {provider: "place2be", uid:"951b70e1-1406-4977-a768-f7ffc64f7b9a"}
            }
  }));
  ```
  </div>
  <p>where uid is the unique identifier you use to identify the player playing.</p>
  
  <h1 class="title is-3">Case 1: activation_success</h1>
  <p>If the time slot you selected includes the moment you make the request, you should experience an "activation_success" response. </p>
  <div class="code-container" markdown="1">
  ```json
{
	"type": "activation_success",
	"payload": {
		"name": "Support!",
		"categories": [],
		"score": true,
		"created_at": 1499442706
	}
}
  ```
  </div>


  <h1 class="title is-3">Case 2: activation_failure</h1>
  <p>If the time slot you selected as a valid time period isn't including the moment you made the request, you should experience an "activation_failure" response. The response details which condition set (called Relation) was invalidating the activation request and the first condition that made it impossible to grant validation.</p>
  <div class="code-container" markdown="1">
  ```json
{
	"type": "activation_failure",
	"payload": {
		"message": "Could not validate at least one group of conditions",
		"reason": "All conditions may not have been evaluated if validator detected \
		           minimum number of required conditions couldn't be reached anymore",
		"conditions": "[{\"display_order\":0,\"end_date\":1499547600,\"order\":0,
		              \"start_date\":1499526000,\"type\":\"time_period\"},
		              {\"display_order\":1,\"end_date\":1500152400,\"order\":1,
		              \"start_date\":1500130800,\"type\":\"time_period\"}]",
		"failed_relation": "4z5dYYKwXK23Sm",
		"unmet_conditions_indexes": [0, 1]
	}
}
  ```
  </div>
  
  <h1 class="title is-3">Case 3: game_error</h1>
  <p>Game error response has nothing to do with Condition Sets validations but with invalid activate frame. Many possible errors can occur (see troubleshooting documentation section for an exhaustive list of possible errors) but the more likely in this example is an incorrect activable id. The response will then be something like this (ymmv):</p>
  <div class="code-container" markdown="1">
  ```json
{
  "type":"game_error",
  "payload":{
    "message":"Invalid game_id or activable_id",
    "reason":"Could not find activable 4noAbqzxkQ5wND for game_id c8b84c0835be95"
  }
}
  ```
  </div>
  <p>Solution is to use a correct activable id that exist for the Gamification Scheme your players are playing with.</p>
  <h1 class="title is-3">Next Steps</h1>
  <ul>
    <li>You can <a href="{{ site.baseurl }}/place2be_in_practice/activables">learn more about Activables</a></li>
    <li>You can learn more about Condition Sets (soon)</li>
    <li>You can learn more about Live Metrics and how to send instant aggregated feedback to your players (soon)</li>
    <li>You can learn more how to set up more complex Gamification Scheme from lessons we learned from business cases (soon)</li>
  </ul>
</div>
