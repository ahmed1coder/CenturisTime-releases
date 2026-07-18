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

    var opts = document.querySelectorAll(".lang-opt");
    for (var j = 0; j < opts.length; j++) {
      var opt = opts[j];
      var active = opt.getAttribute("data-lang") === lang;
      opt.classList.toggle("active", active);
      opt.setAttribute("aria-pressed", active ? "true" : "false");
    }
  }

  function setLang(lang) {
    setStored(lang);
    apply(lang);
  }

  function init() {
    var stored = getStored();
    var initial = stored === "ar" || stored === "en" ? stored : "en";
    apply(initial);

    var opts = document.querySelectorAll(".lang-opt");
    for (var i = 0; i < opts.length; i++) {
      opts[i].addEventListener("click", function () {
        setLang(this.getAttribute("data-lang"));
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
