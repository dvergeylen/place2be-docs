---
layout: home
title: "gui_overview"
nice_title: P2B - Quick Start Gamification Scheme
description: 5min. tutorial to learn how to create a basic Gamification Scheme via Place2Be.io
---

<h1 class="title is-1">Quick Start Gamification Scheme</h1>
<div class="content doc-content">
  <h1 class="title is-3">Introduction</h1>
  <p>This 5 minutes tutorial will guide you through the process of a minimal Gamification Scheme creation via the interface. It consists of:</p>
  <ul>
    <li>Creating a new (empty) Gamification Scheme</li>
    <li>Creating one Activable</li>
    <li>Defining one Condition Set with one Condition in it</li>
  </ul>

  <h1 class="title is-3">Create new Gamification Scheme</h1>
  <p>Creating a new Gamification Scheme couldn't be easier. Simply encode a name (you can always change it later) in the 'New Gamification Scheme' text field on your dashboard and hit the 'Create' button! For instance, let's create a new Scheme called "Football Fan Loyalty Program":</p>
  <figure class="image has-text-centered figure-printscreen">
    <img class="is-hcentered" src="{{ site.baseurl }}/assets/images/gui_overview/create_new_game.png" alt=""/>
    <figcaption class="is-hcentered">Fig1. - Create a new Gamification scheme by entering a name and hitting Create button.</figcaption>
  </figure>
  <p>Your freshly created Gamification Scheme should be displayed, including two tabs to populate the scheme and to get the credentials for API communication.</p>
  
  <figure class="image has-text-centered figure-printscreen">
    <img class="is-hcentered" src="{{ site.baseurl }}/assets/images/gui_overview/new_game_created.png" alt=""/>
    <figcaption class="is-hcentered">Fig2. - Newly created Gamification Scheme</figcaption>
  </figure>

  <h1 class="title is-4">Optional: check API Keys creation</h1>
  <p>You can check the Gamification Scheme has been successfully created by hitting the 'Dev. Cheat Sheet' tab. You should see two pairs of API keys. More information about how to use these keys to connect to the API can be found in the <a href="{{ site.baseurl }}/getting_started/api_overview">Quick Start API</a> section.</p>
  <h1 class="title is-3">Create new Activable</h1>
  <p>Your Gamification Scheme is now created but is still empty. You have to populate it with <a href="{{ site.baseurl }}/place2be_in_practice/activables">Activables</a>. Activables are items your players will activate (!). They represent either Actions or Rewards players will achieve or receive, depending on the requirements you associate with (called Conditions). As this may seem complicated by now, it will become clear in a minute.</p>

  <p>To create your first new Activable, start by hitting the 'Scheme' button. This should normally list all the current Activables defined for this Gamification Scheme but as you don't have one already, it will simply display a sentence telling you so.</p>
  <figure class="image has-text-centered figure-printscreen">
    <img class="is-hcentered is-large" src="{{ site.baseurl }}/assets/images/gui_overview/create_new_activable.png" alt=""/>
    <figcaption class="is-hcentered">Fig3. - Empty Gamification Scheme doesn't display any Activable yet.</figcaption>
  </figure>

  <p>Give a name to your activable in the form below it and leave the options as is. Hit 'Add new Activable'.</p>
  <p>Continuing the previous example busy creating a Football Fan Loyalty Program, let's define an Activable named 'Support' to let players claim their support to their football team during a match:</p>
  <figure class="image has-text-centered figure-printscreen">
    <img class="is-hcentered is-large" src="{{ site.baseurl }}/assets/images/gui_overview/new_activable_created.png" alt=""/>
    <figcaption class="is-hcentered">Fig4. - An Activable with no Conditions associated yet.</figcaption>
  </figure>
  
  <h1 class="title is-3">Create Activable's first Condition Set</h1>
  <p>The just created Activable is perfectly fine (and can indeed be activated through API) but no condition of validity are associated with it yet, and this is probably not what you want.</p>

  <p>To add some requirements to your Activable you need to add a new Condition Set. Condition Sets group conditions that must be validated as a whole before an Activable may be activated by a player. You can create multiple condition sets, and <i>each</i> of them has to be validated for an Activable to be activated by a Player. Combination of Conditions is the heart of Place2Be and allows very fine tuned Gamification mechanics.</p>

  <p>To create a new Condition Set on an Activable, hit 'New Condition Set' button. You should see a new condition set like depicted at figure 5.</p>
  <figure class="image has-text-centered figure-printscreen">
    <img class="is-hcentered is-large" src="{{ site.baseurl }}/assets/images/gui_overview/new_condition_set.png" alt=""/>
    <figcaption class="is-hcentered">Fig5. - A new empty Condition Set.</figcaption>
  </figure>

  <p>Still busy with example of the first section, let's impose that players can only give Support to their team during match period. These take time on Saturday evenings, from 6pm to 11pm:</p>
  <ul>
    <li>In the New Condition dropdown list, select "Time Period [when activable becomes unlockable]"</li>
    <li>Select a Time slot by defining the Start date and End Date (next Saturday, from 6pm to 11pm)</li>
    <li>Hit 'Add Condition'</li>
  </ul>
  <p>Once done, you should see something like this:</p>
  <figure class="image has-text-centered figure-printscreen">
    <img class="is-hcentered is-large" src="{{ site.baseurl }}/assets/images/gui_overview/new_condition_created.png" alt=""/>
    <figcaption class="is-hcentered">Fig5. - Condition Set containing one Condition. You can update the minimal number of conditions to be validated by players when activating for the entire Condition Set to become valid.</figcaption>
  </figure>
  <p><strong>Congrats!</strong> This means your Activable will now only be activable during the defined period of time. You can of course add other time slot (other saturdays or longer periods), even overlapping ones (although probably less relevant).</p>
  <p>Notice the "Minimum 1/X" sentence, meaning that at least 1 among the specified conditions must be valid for the entire Condition Set to become valid. If you have added other (non overlapping) time slots to the Condition Set you will probably let this value set to 1, as you only care if a player is giving support to his/her football team during a valid period whichever it is. If, however, you combine with conditions of other types (like min. time interval or so) you might probably want to update this value. This is when things are becoming interesting and is explained in detail in the other sections.</p>

  <h1 class="title is-3">Next Steps</h1>
  <p>You have defined a new Gamification Team, with one Activable and one Condition Set. This is minimal process but Place2Be can do much more than that!</p>
  <ul>
    <li>You can <a href="{{ site.baseurl }}/getting_started/api_overview">learn more about the API</a> on how to make your players activate Activables</li>
    <li>You can <a href="{{ site.baseurl }}/place2be_in_practice/activables">learn more about Activables</a></li>
    <li>You can learn more about Condition Sets (soon)</li>
    <li>You can learn more about Live Metrics and how to send instant aggregated feedback to your players (soon)</li>
    <li>You can learn more how to set up more complex Gamification Scheme from lessons we learned from business cases (soon)</li>
  </ul>
</div>
