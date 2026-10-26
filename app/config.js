// Personnalisation : modifie ce fichier pour changer les tuiles et le fond.
// type "module" : lance un module TizenBrew (moduleType "npm" ou "gh").
// type "source" : envoie la touche Source de la TV (ouvre le menu des sources).
window.HOME_CONFIG = {
  tizenbrewId: "xvvl3S1bvH",
  background: "", // ex. "bg.jpg" (image placee dans app/), sinon degrade par defaut
  tiles: [
    { name: "Nuvio", icon: "▶", type: "module", moduleType: "gh", moduleName: "NuvioMedia/NuvioTVTizen" },
    { name: "TizenTube", icon: "▷", type: "module", moduleType: "npm", moduleName: "@foxreis/tizentube" },
    { name: "Sources", icon: "⬚", type: "source" }
  ]
};
