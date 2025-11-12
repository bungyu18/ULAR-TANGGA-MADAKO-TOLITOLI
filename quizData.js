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
      question: "Benda yang dapat ditarik magnet disebut…",
      options: [
        "A. Nonmagnetik",
        "B. Magnetik",
        "C. Plastik",
        "D. Karet"
      ],
      answer: "B. Magnetik"
    },
    {
      id: 2,
      question: "Contoh benda yang bisa ditarik magnet adalah…",
      options: [
        "A. Kertas",
        "B. Pensil kayu",
        "C. Paku besi",
        "D. Penghapus"
      ],
      answer: "C. Paku besi"
    },
    {
      id: 3,
      question: "Mengapa jarum kompas bisa menunjuk arah utara?",
      options: [
        "A. Karena jarumnya ringan",
        "B. Karena jarumnya berputar sendiri",
        "C. Karena magnet bumi menarik jarum kompas",
        "D. Karena ada baterainya"
      ],
      answer: "C. Karena magnet bumi menarik jarum kompas"
    },
    {
      id: 4,
      question: "Pintu lemari es bisa menutup rapat karena…",
      options: [
        "A. Ada kunci rahasia",
        "B. Ada magnet di bagian pinggir pintunya",
        "C. Udara di dalamnya dingin",
        "D. Bahannya tebal"
      ],
      answer: "B. Ada magnet di bagian pinggir pintunya"
    },
    {
      id: 5,
      question: "Jika kamu ingin mengambil benda logam kecil yang jatuh ke celah sempit, alat yang cocok dipakai adalah…",
      options: [
        "A. Senter",
        "B. Magnet",
        "C. Penggaris",
        "D. Karet gelang"
      ],
      answer: "B. Magnet"
    },
    {
      id: 6,
      question: "Menggunakan magnet pada tempat pensil untuk menempelkan penjepit kertas merupakan contoh…",
      options: [
        "A. Permainan",
        "B. Pemanfaatan gaya magnet",
        "C. Percobaan listrik",
        "D. Penggunaan gaya otot"
      ],
      answer: "B. Pemanfaatan gaya magnet"
    },
    {
      id: 7,
      question: "Mana yang paling mungkin tidak bisa ditarik oleh magnet?",
      options: [
        "A. Ujung gunting",
        "B. Peniti besi",
        "C. Tutup botol logam aluminium",
        "D. Paku"
      ],
      answer: "C. Tutup botol logam aluminium"
    },
    {
      id: 8,
      question: "Kenapa magnet pada pintu kulkas harus cukup kuat?",
      options: [
        "A. Biar warnanya bagus",
        "B. Supaya makanan tetap dingin karena pintunya menutup rapat",
        "C. Agar kulkas tidak berbunyi",
        "D. Karena magnet bikin listrik lebih irit"
      ],
      answer: "B. Supaya makanan tetap dingin karena pintunya menutup rapat"
    },
    {
      id: 9,
      question: "Kamu diminta memilih alat yang paling aman untuk menempelkan catatan kecil di kulkas. Pilihan terbaik adalah…",
      options: [
        "A. Lem kertas",
        "B. Paku",
        "C. Magnet tempel",
        "D. Staples"
      ],
      answer: "C. Magnet tempel"
    },
    {
      id: 10,
      question: "Menurutmu, kenapa magnet sering dipakai di banyak alat rumah tangga?",
      options: [
        "A. Karena murah dan warna-warni",
        "B. Karena bisa menarik logam tanpa disentuh",
        "C. Karena bisa berubah jadi listrik",
        "D. Karena bisa menghasilkan suara"
      ],
      answer: "B. Karena bisa menarik logam tanpa disentuh"
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

