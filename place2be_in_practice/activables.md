---
layout: home
title: "activables"
nice_title: P2B - Activables
---

<h1 class="title is-1">Creating Activables</h1>
<div class="content doc-content">
  <p>
    <strong>Activables are what defines a Gamification Scheme</strong>. They represent either Actions Players do or Rewards Players unlock according to associated Conditions that must be fulfilled by Players to gather them. Some Activables are linked to each other (which gives verticality in the Scheme hierarchy), some are not.
  </p>
  <p>
    The principle is rather easy: you <i>define</i> a collection of Activables and Players try to <i>activate/unlock</i> them via the API. For each activation trial must a score be associated. Simplest form being a boolean (Player did the Action), more advanced form being Integers and Floats (<i>e.g: Player won XXX points</i>).
  </p>

  <h1 class="title is-3">Activable Attributes</h1>
  <figure class="image has-text-centered figure-printscreen">
    <img class="is-hcentered is-large" src="{{ site.baseurl }}/assets/images/activables/new_activable.png" alt="New Activable"/>
    <figcaption class="is-hcentered">Fig1. - New Activable form from the GUI.</figcaption>
  </figure>
  <p>
    An Activable is created via the GUI within a Gamification Scheme (see Fig. 1) and is defined by the following attributes:
  </p>

  <table>
    <thead>
      <tr>
        <th>Attribute</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="has-text-right">ID</th>
        <td class="vertically-aligned-td">automatically generated, you can't specify it. It will become useful when issuing 'activate' request from clients.</td>
      </tr>
      <tr>
        <th class="has-text-right">Name</th>
        <td class="vertically-aligned-td">can be whatever you want, <strong>between 3 and 255 characters</strong> (included).</td>
      </tr>
      <tr>
        <th class="has-text-right">Scoretype</th>
        <td class="vertically-aligned-td">This is probably the most important attribute. It defines what kind of score a Player does when she tries to activate the Activable. Four types are available:
          <table>
            <tbody>
              <tr>
                <th class="has-text-right">Boolean</th>
                <td class="vertically-aligned-td"><strong>Default</strong>. Score must either be true/false.</td>
              </tr>
              <tr>
                <th class="has-text-right">Integer</th>
                <td class="vertically-aligned-td">Score must be either a valid integer (0, 1, 2, 3, ...). Negative scores are also allowed. Float scores that could be casted to Integer (e.g: 10.0) are <i>rejected</i>.</td>
              </tr>
              <tr>
                <th class="has-text-right">Duration</th>
                <td class="vertically-aligned-td">Identical to Integer but conceptually represents a duration (e.g: nbr of seconds or milliseconds). As Integer are traditionnally used to reward Players making highest scores, duration might reward Players making lowest score (e.g: ~ best lap times).</td>
              </tr>
              <tr>
                <th class="has-text-right">Float</th>
                <td class="vertically-aligned-td">Scores that allows floating numbers (e.g: 10.23).</td>
              </tr>
            </tbody>
          </table>
          
          <p class="warning">Scoretype attribute can't be updated after Activable creation.</p>
        </td>
      </tr>
      <tr>
        <th class="has-text-right">Team required</th>
        <td class="vertically-aligned-td">
          <p>Check that box for Activables that MUST be activated in name of a Team.</p>
          <p>Providing a team_id when activating is always allowed even if team required attribute is unchecked but Live Metrics aggregating by teams might return incomplete results on these Activables (as some Players might not belong to Teams).</p>
          <p class="warning">Team Required attribute can't be updated after Activable creation.</p>
        </td>
      </tr>
      <tr>
        <th class="has-text-right">Categories</th>
        <td class="vertically-aligned-td">
          <p>comma separated and up to five categories. <strong>Total number of characters can't exceed 128</strong>.</p>

          <p>Activables sharing a similar category (and same scoretype) can be aggregated in Live Metrics and Virtual Money Conditions. This is super-useful when your Players gather scores from different Activables that conceptually represent a same resource (e.g: Points, Gold, ...).</p>
          
          <p>Example: Let's imagine a first activable named "Gold Mining" that Players activates regularly with an Integer score of +50. As an onboarding gift, you grant them a second activable named "Gold Bonus" with Integer score +200.</p>
          
          <p>As the two Activables share category 'gold', Place2Be sees their respective scores as of <i>same</i> nature. When the Players want to gather a third Activable representing a gift with Virtual Money condition "category: gold -250", scores of "Gold Mining" and "Gold Bonus" will be <strong>aggregated</strong> to check if enough score has been collected to spend on it, as they are considered a same resource.</p>
          </td>
      </tr>
    </tbody>
  </table>


  <h1 class="title is-3">Condition Sets</h1>
  <p>Once defined, Activables exist in the Gamification Scheme and can be activated by users (sending 'activate' requests). But as is, Activables wouldn't make sense (at all and/or between each other) if anyone could activate them without (pre) conditions to be fulfilled. These are defined via <a href="{{ site.baseurl }}/place2be_in_practice/conditions">Condition Sets</a> which is the core of Place2Be.</p>

  <h1 class="title is-3">Next Steps</h1>
  <ul>
    <li>You can <a href="{{ site.baseurl }}/place2be_in_practice/conditions">learn more about Condition Sets</a></li>
  </ul>
</div>
