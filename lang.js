(function () {
  "use strict";

  var STORAGE_KEY = "centuristime_lang";

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStored(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* ignore */
    }
  }

  function apply(lang) {
    var isAr = lang === "ar";
    document.documentElement.setAttribute("lang", isAr ? "ar" : "en");
    document.documentElement.setAttribute("dir", isAr ? "rtl" : "ltr");

    var nodes = document.querySelectorAll("[data-en]");
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var text = isAr ? node.getAttribute("data-ar") : node.getAttribute("data-en");
      if (text !== null) node.innerHTML = text;
    }

    var toggle = document.getElementById("lang-toggle");
    if (toggle) toggle.textContent = isAr ? "English" : "العربية";
  }

  function toggle() {
    var current = getStored() === "ar" ? "ar" : "en";
    var next = current === "ar" ? "en" : "ar";
    setStored(next);
    apply(next);
  }

  function init() {
    var stored = getStored();
    var initial = stored === "ar" || stored === "en" ? stored : "en";
    apply(initial);

    var toggle = document.getElementById("lang-toggle");
    if (toggle) toggle.addEventListener("click", toggle);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
