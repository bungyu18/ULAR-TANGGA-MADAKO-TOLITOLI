// quizData.js (NON-MODULE) — aman untuk GitHub Pages
// Memastikan data soal tersedia di window.quizBank + event "quizdata:ready"

(function () {
  "use strict";

  // --- Guard: kalau sudah pernah dimuat, jangan timpa (menghindari duplikasi) ---
  if (window.__QUIZDATA_LOADED__) {
    // tetap broadcast supaya script lain bisa lanjut
    window.dispatchEvent(new Event("quizdata:ready"));
    return;
  }
  window.__QUIZDATA_LOADED__ = true;

  // Pastikan namespace ada
  window.quizBank = [];

  // Helper: pastikan opsi berlabel A./B./C./D.
  var LABELS = ["A", "B", "C", "D", "E", "F"];
  function ensureLabeledOptions(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.map(function (opt, i) {
      var s = String(opt || "").trim();
      // kalau sudah ada label di depan, biarkan
      if (/^[A-F]\s*[\.\)\-]\s*/i.test(s)) return s;
      var label = LABELS[i] ? LABELS[i] + ". " : "";
      return label + s;
    });
  }
  // Helper: normalisasi jawaban ke format berlabel (cocok dengan opsi)
  function ensureLabeledAnswer(answer, options) {
    var ans = String(answer || "").trim();
    // jika sudah berlabel, kembalikan
    if (/^[A-F]\s*[\.\)\-]\s*/i.test(ans)) return ans;

    // coba cocokkan dengan isi opsi tanpa label
    var coreAns = ans.replace(/^[A-F]\s*[\.\)\-]\s*/i, "").trim().toLowerCase();
    for (var i = 0; i < options.length; i++) {
      var coreOpt = String(options[i]).replace(/^[A-F]\s*[\.\)\-]\s*/i, "").trim().toLowerCase();
      if (coreOpt === coreAns) return options[i]; // kembalikan versi berlabel
    }
    // fallback: tetap pakai ans (biar nggak undefined)
    return ans;
  }

  // --- DATA SOAL ---
  var rawBank = [
    {
      id: 1,
      question: "Magnet memiliki dua kutub, yaitu …",
      options: [
        "A. Kutub kanan dan kiri",
        "B. Kutub utara dan selatan",
        "C. Kutub atas dan bawah",
        "D. Kutub depan dan belakang"
      ],
      answer: "B. Kutub utara dan selatan"
    },
    {
      id: 2,
      question: "Jika dua kutub magnet yang sama didekatkan, maka magnet akan …",
      options: [
        "A. Saling menarik",
        "B. Saling menolak",
        "C. Saling menempel",
        "D. Diam saja"
      ],
      answer: "B. Saling menolak"
    },
    {
      id: 3,
      question: "Magnet dapat menarik benda yang terbuat dari …",
      options: [
        "A. Kayu",
        "B. Kertas",
        "C. Besi",
        "D. Plastik"
      ],
      answer: "C. Besi"
    },
    {
      id: 4,
      question: "Gaya magnet paling kuat terdapat di bagian …",
      options: [
        "A. Tengah magnet",
        "B. Ujung magnet",
        "C. Sisi magnet",
        "D. Belakang magnet"
      ],
      answer: "B. Ujung magnet"
    },
    {
      id: 5,
      question: "Jika magnet dipotong menjadi dua bagian, maka …",
      options: [
        "A. Salah satu bagian tidak memiliki kutub",
        "B. Setiap bagian tetap memiliki kutub utara dan selatan",
        "C. Magnet menjadi hilang kekuatannya",
        "D. Hanya satu bagian yang menjadi magnet"
      ],
      answer: "B. Setiap bagian tetap memiliki kutub utara dan selatan"
    },
    {
      id: 6,
      question: "Contoh benda yang tidak dapat ditarik magnet adalah …",
      options: [
        "A. Paku",
        "B. Jarum",
        "C. Sendok besi",
        "D. Penghapus"
      ],
      answer: "D. Penghapus"
    },
    {
      id: 7,
      question: "Magnet bisa kehilangan kekuatannya jika …",
      options: [
        "A. Didinginkan",
        "B. Dibiarkan di tempat sejuk",
        "C. Dipukul atau dipanaskan",
        "D. Ditarik benda logam"
      ],
      answer: "C. Dipukul atau dipanaskan"
    },
    {
      id: 8,
      question: "Magnet yang dapat dibuat dari besi dengan cara dialiri arus listrik disebut …",
      options: [
        "A. Magnet batang",
        "B. Magnet permanen",
        "C. Elektromagnet",
        "D. Magnet alam"
      ],
      answer: "C. Elektromagnet"
    },
    {
      id: 9,
      question: "Kutub magnet yang berlawanan akan …",
      options: [
        "A. Menolak",
        "B. Menarik",
        "C. Hilang",
        "D. Diam"
      ],
      answer: "B. Menarik"
    },
    {
      id: 10,
      question: "Jika magnet digantung bebas, ujung magnet yang menunjuk ke arah utara bumi adalah …",
      options: [
        "A. Kutub selatan magnet",
        "B. Kutub utara magnet",
        "C. Tengah magnet",
        "D. Kutub timur magnet"
      ],
      answer: "B. Kutub utara magnet"
    }
  ];

  // Normalisasi (pastikan opsi & jawaban konsisten berlabel)
  window.quizBank = rawBank.map(function (q, idx) {
    var opts = ensureLabeledOptions(q.options || []);
    var ans  = ensureLabeledAnswer(q.answer, opts);
    return {
      id: q.id != null ? q.id : (idx + 1),
      question: String(q.question || "").trim(),
      options: opts,
      answer: ans
    };
  });

  // --- Util API opsional ---
  function getRandomQuiz() {
    if (!window.quizBank.length) return null;
    return window.quizBank[Math.floor(Math.random() * window.quizBank.length)];
  }
  function getRandomQuizzes(count) {
    count = Math.max(0, Math.min(+count || 1, window.quizBank.length));
    var indices = window.quizBank.map(function (_, i) { return i; });
    // shuffle ringan
    for (var i = indices.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = indices[i]; indices[i] = indices[j]; indices[j] = t;
    }
    return indices.slice(0, count).map(function (i) { return window.quizBank[i]; });
  }
  function addQuiz(question, options, answer) {
    var nextId = window.quizBank.length
      ? Math.max.apply(null, window.quizBank.map(function (q) { return +q.id || 0; })) + 1
      : 1;
    var opts = ensureLabeledOptions(options || []);
    var ans  = ensureLabeledAnswer(answer, opts);
    var qObj = { id: nextId, question: String(question || "").trim(), options: opts, answer: ans };
    window.quizBank.push(qObj);
    return qObj;
  }

  window.QuizDataAPI = {
    getRandomQuiz: getRandomQuiz,
    getRandomQuizzes: getRandomQuizzes,
    addQuiz: addQuiz
  };

  // Broadcast event supaya script utama bisa tahu data siap
  try {
    window.dispatchEvent(new Event("quizdata:ready"));
  } catch (_) {
    // IE fallback (jika diperlukan)
    var ev = document.createEvent("Event");
    ev.initEvent("quizdata:ready", true, true);
    window.dispatchEvent(ev);
  }

  // Log kecil untuk debug di GitHub Pages
  if (typeof console !== "undefined") {
    console.log("[quizData] loaded:", window.quizBank.length, "soal");
  }
})();
