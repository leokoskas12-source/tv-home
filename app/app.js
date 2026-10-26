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

  function launch(t) {
    if (!t.appId) {
      hint.textContent = t.name + " : aucune app configuree";
      return;
    }
    try {
      window.tizen.application.launch(t.appId, function () {}, function (e) {
        hint.textContent = "Echec : " + (e && e.message ? e.message : t.name);
      });
    } catch (e) {
      hint.textContent = "API Tizen indisponible pour " + t.name;
    }
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
