/* ============================================================
   quiz.js — practice mode + exam mode (mock exams) + i18n (VI/EN)
   ============================================================
   Practice mode (per-lesson exams):
     - click option: immediate feedback, explain appears, counts "solved"
     - fill in the blank: checked on Enter/blur
     - <div class="exam-progress">...</div> shows "Đúng X / N"

   Exam mode (mock exams): <div class="exam-bar" data-mode="exam">
     - click option: just marks selection (no feedback)
     - timer: <span class="exam-timer" data-minutes="45"></span>
     - submit: <button class="exam-submit">Nộp bài</button>
     - after submitting (or timer end): grades everything, shows score
       and pass/fail against exam-progress data-pass="80"

   Both modes: <button class="exam-reset">Làm lại từ đầu</button>

   Language: reads <html data-lang="vi|en"> (set by lang.js) and
   listens for the "langchange" event to re-render dynamic texts.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- i18n ---------- */
  var LANGS = {
    vi: {
      solvedNoPass: "Đúng {x} / {n} câu tương tác",
      solvedPass: "Đúng {x} / {n} câu ({p}%) — cần ≥ {q}%",
      answered: "Đã trả lời: {x} / {n} câu",
      result: "Kết quả: {x} / {n} ({p}%) — cần ≥ {q}%",
      resultNoPass: "Kết quả: {x} / {n} ({p}%)",
      submit: "Nộp bài",
      submitted: "Đã nộp",
      reset: "Làm lại từ đầu",
      timeUp: "⏰ Hết giờ!",
      clock: "⏱ ",
      answers: "Đáp án đúng: ",
      fibAria: "Điền vào chỗ trống"
    },
    en: {
      solvedNoPass: "Correct {x} / {n} interactive questions",
      solvedPass: "Correct {x} / {n} ({p}%) — need ≥ {q}%",
      answered: "Answered: {x} / {n}",
      result: "Score: {x} / {n} ({p}%) — need ≥ {q}%",
      resultNoPass: "Score: {x} / {n} ({p}%)",
      submit: "Submit",
      submitted: "Submitted",
      reset: "Start over",
      timeUp: "⏰ Time's up!",
      clock: "⏱ ",
      answers: "Correct answer: ",
      fibAria: "Fill in the blank"
    }
  };

  function lang() {
    return document.documentElement.getAttribute("data-lang") === "en" ? "en" : "vi";
  }

  function t(key, vars) {
    var s = (LANGS[lang()] || LANGS.vi)[key] || LANGS.vi[key] || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.split("{" + k + "}").join(String(vars[k]));
      });
    }
    return s;
  }

  /* ---------- state ---------- */
  var bar = document.querySelector(".exam-bar");
  var examMode = !!(bar && bar.dataset.mode === "exam");
  var allQuestions = Array.prototype.slice.call(document.querySelectorAll(".quiz-q"));
  var total = allQuestions.length;
  var solved = [];
  var graded = false;

  /* ---------- helpers ---------- */
  function isAnswered(q) {
    var inputs = q.querySelectorAll(".fib-input");
    if (inputs.length) {
      return Array.prototype.every.call(inputs, function (i) { return i.value.trim() !== ""; });
    }
    return !!q.querySelector(".quiz-opt.selected");
  }

  function answeredCount() {
    var n = 0;
    allQuestions.forEach(function (q) { if (isAnswered(q)) n++; });
    return n;
  }

  function correctCount() {
    var n = 0;
    allQuestions.forEach(function (q) { if (q.dataset.result === "ok") n++; });
    return n;
  }

  function updateProgress() {
    var bars = document.querySelectorAll(".exam-progress");
    if (!bars.length) return;

    bars.forEach(function (el) {
      var pass = parseFloat(el.dataset.pass || "");
      var hasPass = !isNaN(pass);
      el.classList.remove("done", "fail");

      if (examMode) {
        if (!graded) {
          el.textContent = t("answered", { x: answeredCount(), n: total });
        } else {
          var cc = correctCount();
          var cp = total > 0 ? Math.round(100 * cc / total) : 0;
          el.textContent = hasPass
            ? t("result", { x: cc, n: total, p: cp, q: pass })
            : t("resultNoPass", { x: cc, n: total, p: cp });
          if (hasPass) el.classList.add(cp >= pass ? "done" : "fail");
          else el.classList.add("done");
        }
        return;
      }

      var pct = total > 0 ? Math.round(100 * solved.length / total) : 0;
      el.textContent = hasPass
        ? t("solvedPass", { x: solved.length, n: total, p: pct, q: pass })
        : t("solvedNoPass", { x: solved.length, n: total });
      if (total > 0 && solved.length === total) {
        if (hasPass) el.classList.add(pct >= pass ? "done" : "fail");
        else el.classList.add("done");
      }
    });
  }

  function markSolved(q) {
    if (!q || solved.indexOf(q) !== -1) return;
    solved.push(q);
    updateProgress();
  }

  function refreshButtons() {
    var submitBtn = document.querySelector(".exam-submit");
    if (submitBtn) submitBtn.textContent = graded ? t("submitted") : t("submit");
    document.querySelectorAll(".exam-reset").forEach(function (b) {
      b.textContent = t("reset");
    });
  }

  /* ---------- timer ---------- */
  var timerEl = document.querySelector(".exam-timer");
  var timerInterval = null;
  var timerStartedAt = null;

  function fmtTime(s) {
    var m = Math.floor(s / 60);
    var ss = s % 60;
    return m + ":" + (ss < 10 ? "0" : "") + ss;
  }

  function startTimer() {
    if (!timerEl) return;
    if (timerInterval) clearInterval(timerInterval);
    var minutes = parseInt(timerEl.dataset.minutes || "45", 10);
    var totalSec = minutes * 60;
    timerStartedAt = Date.now();
    timerEl.classList.remove("over");

    function tick() {
      var elapsed = Math.floor((Date.now() - timerStartedAt) / 1000);
      var remaining = totalSec - elapsed;
      if (remaining <= 0) {
        timerEl.textContent = t("timeUp");
        timerEl.classList.add("over");
        clearInterval(timerInterval);
        if (examMode && !graded) gradeExam();
        return;
      }
      timerEl.textContent = t("clock") + fmtTime(remaining);
    }

    tick();
    timerInterval = setInterval(tick, 1000);
  }

  /* ---------- grading (exam mode) ---------- */
  function gradeExam() {
    if (graded || !examMode) return;
    graded = true;

    allQuestions.forEach(function (q) {
      var opts = Array.prototype.slice.call(q.querySelectorAll(".quiz-opt"));
      var explain = q.querySelector(".quiz-explain");
      var fibInputs = Array.prototype.slice.call(q.querySelectorAll(".fib-input"));

      if (opts.length) {
        var selected = q.querySelector(".quiz-opt.selected");
        opts.forEach(function (b) {
          b.disabled = true;
          if (b.dataset.key === q.dataset.correct) b.classList.add("correct");
          else if (b === selected) b.classList.add("wrong");
        });
        q.dataset.result = (selected && selected.dataset.key === q.dataset.correct) ? "ok" : "bad";
      } else if (fibInputs.length) {
        var spans = Array.prototype.slice.call(q.querySelectorAll(".fib[data-answer]"));
        var allOk = true;
        var correctList = [];
        fibInputs.forEach(function (inp, idx) {
          var answers = spans[idx]
            ? spans[idx].dataset.answer.toLowerCase().split("|").map(function (s) { return s.trim(); })
            : [];
          var value = inp.value.trim().toLowerCase();
          var ok = answers.indexOf(value) !== -1;
          if (!ok) allOk = false;
          inp.disabled = true;
          inp.classList.add(ok ? "fib-ok" : "fib-bad");
          correctList.push(answers[0] || "");
        });
        var note = document.createElement("p");
        note.className = "fib-answer";
        note.textContent = t("answers") + correctList.join(" · ");
        q.appendChild(note);
        q.dataset.result = allOk ? "ok" : "bad";
      }

      if (explain) explain.hidden = false;
    });

    refreshButtons();
    updateProgress();
  }

  /* ---------- multiple choice ---------- */
  allQuestions.forEach(function (q) {
    var options = Array.prototype.slice.call(q.querySelectorAll(".quiz-opt"));
    if (!options.length) return;
    var explain = q.querySelector(".quiz-explain");
    var hint = q.querySelector(".quiz-hint");

    options.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (examMode) {
          if (graded) return;
          options.forEach(function (b) { b.classList.remove("selected"); });
          btn.classList.add("selected");
          updateProgress();
          return;
        }

        if (q.dataset.done === "1") return;
        if (btn.dataset.key === q.dataset.correct) {
          btn.classList.add("correct");
          q.dataset.done = "1";
          options.forEach(function (b) { b.disabled = true; });
          if (explain) explain.hidden = false;
          markSolved(q);
        } else {
          btn.classList.add("wrong");
          btn.disabled = true;
          if (hint) hint.hidden = false;
        }
      });
    });
  });

  /* ---------- fill in the blank ---------- */
  document.querySelectorAll(".fib[data-answer]").forEach(function (el) {
    var answers = el.dataset.answer.toLowerCase().split("|").map(function (s) { return s.trim(); });

    var input = document.createElement("input");
    input.type = "text";
    input.className = "fib-input";
    input.placeholder = el.dataset.placeholder || "…";
    input.setAttribute("aria-label", t("fibAria"));
    input.autocomplete = "off";
    input.spellcheck = false;
    el.appendChild(input);

    function check() {
      var value = input.value.trim().toLowerCase();
      if (!value) {
        input.classList.remove("fib-ok", "fib-bad");
        return;
      }
      if (answers.indexOf(value) !== -1) {
        input.classList.add("fib-ok");
        input.classList.remove("fib-bad");
        input.disabled = true;
        markSolved(el.closest(".quiz-q"));
      } else {
        input.classList.add("fib-bad");
        input.classList.remove("fib-ok");
      }
    }

    if (examMode) {
      input.addEventListener("input", updateProgress);
      input.addEventListener("blur", updateProgress);
    } else {
      input.addEventListener("blur", check);
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") check();
      });
    }
  });

  /* ---------- submit ---------- */
  document.querySelectorAll(".exam-submit").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!graded) gradeExam();
    });
  });

  /* ---------- reset ---------- */
  document.querySelectorAll(".exam-reset").forEach(function (btn) {
    btn.addEventListener("click", function () {
      solved = [];
      graded = false;

      allQuestions.forEach(function (q) {
        delete q.dataset.done;
        delete q.dataset.result;
        q.querySelectorAll(".quiz-opt").forEach(function (b) {
          b.disabled = false;
          b.classList.remove("correct", "wrong", "selected");
        });
        var ex = q.querySelector(".quiz-explain"); if (ex) ex.hidden = true;
        var h = q.querySelector(".quiz-hint"); if (h) h.hidden = true;
        q.querySelectorAll(".fib-input").forEach(function (i) {
          i.disabled = false;
          i.value = "";
          i.classList.remove("fib-ok", "fib-bad");
        });
        var note = q.querySelector(".fib-answer");
        if (note) note.remove();
      });

      refreshButtons();
      updateProgress();
      startTimer();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  /* ---------- language changes ---------- */
  document.addEventListener("langchange", function () {
    updateProgress();
    refreshButtons();
  });

  updateProgress();
  refreshButtons();
  startTimer();
})();
