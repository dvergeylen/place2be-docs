/* This script is launched since the Landing page is loaded as loaded with
 * _defer attribute.
 */
try {
  correctFormDisplay();
  document.getElementById('registerBtn').addEventListener('click', displayRegistrationForm);
  document.getElementById('authenticateBtn').addEventListener('click', displayAuthenticationForm);
} catch (e) {
  /* No Op */
};


/* This procedure displays Authentication or
 * Registration form according to respective parameters
 * in the URL bar (given by Identity failure messages.
 */
function correctFormDisplay() {
  /* Parse URL  */
  var authentication_failed = getParameterByName('authentication_failed', window.location.href);
  var registration_failed   = getParameterByName('registration_failed',   window.location.href);
  var elem;

  if (authentication_failed !== null) {
    /* Display Authentication error div */
    elem = document.getElementById("auth_failed");
    elem.style.display = "block";

  } else if (registration_failed !== null) {
    /* Hide auth form */
    elem = document.getElementById("authentication_form");
    elem.style.display = "none";

    /* Display registration form */
    elem = document.getElementById("registration_form");
    elem.classList.remove("hidden");
    elem.style.display = "block";

    /* Display registration usage div */
    elem = document.getElementById("registration_failed");
    elem.classList.remove("hidden");
    elem.style.display = "block";
  }
}

/* This procedure parses the parameters
 * given in URL.
 * See: http://stackoverflow.com/a/901144
 */
function getParameterByName(_name, url) {
    var name = _name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function displayRegistrationForm() {
  var elem;
  var elem2;

  /* Hide auth form */
  elem = document.getElementById("authentication_form");
  elem.style.display = "none";

  /* Display registration form */
  elem2 = document.getElementById("registration_form");
  elem2.classList.remove("hidden");
  elem2.style.display = "block";
}

function displayAuthenticationForm() {
  var elem;

  /* Hide registration form */
  elem = document.getElementById("registration_form");
  elem.style.display = "none";

  /* Display authentication form */
  elem = document.getElementById("authentication_form");
  elem.style.display = "block";
}
