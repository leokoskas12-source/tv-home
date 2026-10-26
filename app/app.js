(function () {
  var cfg = window.HOME_CONFIG;
  var tilesEl = document.getElementById("tiles");
  var hint = document.getElementById("hint");
  var index = 0;

  function tick() {
    var d = new Date();
    document.getElementById("time").textContent =
      ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    document.getElementById("date").textContent =
      d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  }

  function render() {
    cfg.tiles.forEach(function (t, i) {
      var el = document.createElement("div");
      el.className = "tile";
      el.innerHTML = '<div class="icon"></div><div class="label"></div>';
      el.querySelector(".icon").textContent = t.icon;
      el.querySelector(".label").textContent = t.name;
      tilesEl.appendChild(el);
    });
    focus(0);
  }

  function focus(i) {
    var els = tilesEl.children;
    index = (i + els.length) % els.length;
    for (var k = 0; k < els.length; k++) els[k].classList.toggle("focus", k === index);
  }

  function say(msg) { hint.textContent = msg; }

  function launchModule(t) {
    try {
      var data = new tizen.ApplicationControlData("module",
        [JSON.stringify({ moduleName: t.moduleName, moduleType: t.moduleType })]);
      var ctl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/default",
        null, null, null, [data]);
      tizen.application.launchAppControl(ctl, cfg.tizenbrewId, function () {},
        function (e) { say("Echec : " + (e && e.message ? e.message : t.name)); });
    } catch (e) {
      say("API Tizen indisponible pour " + t.name);
    }
  }

  function sendSource() {
    try {
      var ws = new WebSocket("ws://127.0.0.1:8001/api/v2/channels/samsung.remote.control?name=" + btoa("TVHome"));
      ws.onmessage = function (m) {
        var d = JSON.parse(m.data);
        if (d.event === "ms.channel.connect") {
          ws.send(JSON.stringify({ method: "ms.remote.control", params: {
            Cmd: "Click", DataOfCmd: "KEY_SOURCE", Option: "false", TypeOfRemote: "SendRemoteKey" } }));
          setTimeout(function () { ws.close(); }, 500);
        }
      };
      ws.onerror = function () { say("Impossible d'ouvrir les sources"); };
    } catch (e) {
      say("Impossible d'ouvrir les sources");
    }
  }

  function launch(t) {
    if (t.type === "module") launchModule(t);
    else if (t.type === "source") sendSource();
    else say(t.name + " : type inconnu");
  }

  document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      case 37: focus(index - 1); break;
      case 39: focus(index + 1); break;
      case 13: launch(cfg.tiles[index]); break;
    }
  });

  if (cfg.background) {
    document.getElementById("bg").style.backgroundImage = "url(" + cfg.background + ")";
  }
  tick();
  setInterval(tick, 15000);
  render();
})();
