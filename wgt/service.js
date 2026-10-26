// Service d'arriere-plan : ouvre l'accueil au demarrage de la TV et a chaque rallumage.
var APP_ID = "TVHome0001.TVHome";
var lastPower = null;
var timer = null;

function openHome() {
  try {
    tizen.application.launch(APP_ID, function () {}, function () {});
  } catch (e) {}
}

function readPower(cb) {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8001/api/v2/", true);
    xhr.timeout = 3000;
    xhr.onload = function () {
      try { cb(JSON.parse(xhr.responseText).device.PowerState); } catch (e) { cb(null); }
    };
    xhr.onerror = xhr.ontimeout = function () { cb(null); };
    xhr.send();
  } catch (e) { cb(null); }
}

function tick() {
  readPower(function (p) {
    if (p && lastPower && lastPower !== "on" && p === "on") openHome();
    if (p) lastPower = p;
  });
}

module.exports.onStart = function () {
  setTimeout(openHome, 8000);
  if (timer) clearInterval(timer);
  timer = setInterval(tick, 3000);
};
module.exports.onRequest = function () {};
module.exports.onStop = function () {};
module.exports.onExit = function () { if (timer) clearInterval(timer); };
