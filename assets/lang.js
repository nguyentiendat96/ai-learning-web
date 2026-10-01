/* ============================================================
   lang.js — VI/EN language toggle for the whole project
   ============================================================
   How content is marked up:
     - inline:  <span class="lang-vi">…</span><span class="lang-en">…</span>
     - blocks:  <div class="lang-vi">…</div><div class="lang-en">…</div>
   Rules (CSS in course.css):
     - default (no data-lang): EN hidden, VI shown
     - data-lang="en": VI hidden, EN shown

   This script injects a small VI|EN switch (fixed, top-right),
   remembers the choice in localStorage, and fires a "langchange"
   CustomEvent so other scripts (quiz.js) can re-render their texts.

   Pages without English content yet: the EN button is dimmed with a
   tooltip saying the English version is being rolled out.
   ============================================================ */

(function () {
  "use strict";

  var KEY = "ai-learning-lang";
  var root = document.documentElement;
  var switchEl = null;

  function current() {
    return root.getAttribute("data-lang") === "en" ? "en" : "vi";
  }

  function updateButtons() {
    if (!switchEl) return;
    var lang = current();
    switchEl.querySelectorAll("button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang-set") === lang);
    });
    var hasEn = document.querySelector(".lang-en") !== null;
    switchEl.classList.toggle("no-en", !hasEn);
    switchEl.title = hasEn ? "" : "Bản tiếng Anh đang được bổ sung dần / English rollout in progress";
  }

  function apply(lang, persist) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang === "en" ? "en" : "vi");
    if (persist) {
      try { localStorage.setItem(KEY, lang); } catch (e) { /* ignore */ }
    }
    updateButtons();
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  }

  function buildSwitch() {
    switchEl = document.createElement("div");
    switchEl.className = "lang-switch";
    switchEl.setAttribute("role", "group");
    switchEl.setAttribute("aria-label", "Language / Ngôn ngữ");
    switchEl.innerHTML =
      '<button type="button" data-lang-set="vi">VI</button>' +
      '<button type="button" data-lang-set="en">EN</button>';
    switchEl.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-lang-set]");
      if (!b) return;
      apply(b.getAttribute("data-lang-set"), true);
    });
    document.body.appendChild(switchEl);
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* ignore */ }
  apply(saved === "en" ? "en" : "vi", false);
  buildSwitch();
  updateButtons();
})();
