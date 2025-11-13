// quizData.js (NON-MODULE) — aman untuk GitHub Pages
// Data soal disimpan di window.quizBank + event "quizdata:ready"

(function () {
  "use strict";

  // Kalau sudah pernah dimuat, jangan dobel, tapi tetap kirim event
  if (window.__QUIZDATA_LOADED__) {
    window.dispatchEvent(new Event("quizdata:ready"));
    return;
  }
  window.__QUIZDATA_LOADED__ = true;

  // =======================
  //  HELPER UNTUK OPSI & JAWABAN
  // =======================
  var LABELS = ["A", "B", "C", "D", "E", "F"];

  // Tambah label A./B./C. di depan opsi (kalau belum ada)
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

  // Samakan format jawaban dengan salah satu opsi (berlabel)
  function ensureLabeledAnswer(answer, options) {
    var ans = String(answer || "").trim();

    // kalau sudah ada label di depan → langsung pakai
    if (/^[A-F]\s*[\.\)\-]\s*/i.test(ans)) return ans;

    // buang label di depan (kalau user nulis "b. ..." dsb)
  var coreAns = ans.replace(/^[A-F]\s*[\.\)\-]\s*/i, "").trim().toLowerCase();

    // cocokin isi jawaban dengan isi opsi (tanpa label)
    for (var i = 0; i < options.length; i++) {
      var coreOpt = String(options[i])
        .replace(/^[A-F]\s*[\.\)\-]\s*/i, "")
        .trim()
        .toLowerCase();
      if (coreOpt === coreAns) {
        return options[i]; // kembalikan opsi versi berlabel
      }
    }
    // fallback: tetap pakai ans apa adanya
    return ans;
  }

  // =======================
  //  DI SINI KAMU ISI SOALNYA
  //  (TINGGAL EDIT BAGIAN rawBank SAJA)
  // =======================
  var rawBank = [
    {
      id: 1,
      question: "Energi listrik bisa kita dapatkan dari…",
      options: [
        "Batu",
        "Pembangkit listrik",
        "Kertas",
        "Pasir"
      ],
      answer: "Pembangkit listrik"
    },
    {
      id: 2,
      question: "Panel surya mendapatkan energi dari…",
      options: [
        "Bulan",
        "Lampu",
        "Matahari",
        "Angin"
      ],
      answer: "Matahari"
    },
    {
      id: 3,
      question: "PLTA (Pembangkit Listrik Tenaga Air) menggunakan…",
      options: [
        "Udara",
        "Air",
        "Tanah",
        "Benda logam"
      ],
      answer: "Air"
    },
    {
      id: 4,
      question: "Energi listrik disalurkan ke rumah lewat…",
      options: [
        "Jalan raya",
        "Pipa air",
        "Kabel listrik",
        "Selang"
      ],
      answer: "Kabel listrik"
    },
    {
      id: 5,
      question: "Kipas angin bekerja karena listrik berubah menjadi energi…",
      options: [
        "Gerak",
        "Cahaya",
        "Suara",
        "Panas"
      ],
      answer: "Gerak"
    },
    {
      id: 6,
      question: "Lampu menyala karena energi listrik berubah menjadi…",
      options: [
        "Angin",
        "Cahaya",
        "Es",
        "Suara"
      ],
      answer: "Cahaya"
    },
    {
      id: 7,
      question: "Jika kabel listrik rusak, maka…",
      options: [
        "Lampu bisa tambah terang",
        "Listrik bisa mati",
        "Kipas angin jadi besar",
        "TV menyala terus"
      ],
      answer: "Listrik bisa mati"
    },
    {
      id: 8,
      question: "Menghemat listrik di rumah itu penting supaya…",
      options: [
        "Listrik cepat habis",
        "Orang lain tidak bisa pakai",
        "Tagihan listrik tidak mahal",
        "Lampu jadi redup"
      ],
      answer: "Tagihan listrik tidak mahal"
    },
    {
      id: 9,
      question: "Contoh alat yang memakai listrik adalah…",
      options: [
        "Buku",
        "Pensil",
        "Televisi",
        "Sepatu"
      ],
      answer: "Televisi"
    },
    {
      id: 10,
      question: "Kita harus mematikan lampu saat tidak dipakai agar…",
      options: [
        "Rumah makin panas",
        "Listrik tidak boros",
        "Lampu cepat rusak",
        "Warna lampu berubah"
      ],
      answer: "Listrik tidak boros"
    }
  ];

  // =======================
  //  NORMALISASI KE window.quizBank
  // =======================
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

  // (Opsional) API kecil kalau mau dipakai di masa depan
  function getRandomQuiz() {
    if (!window.quizBank.length) return null;
    return window.quizBank[Math.floor(Math.random() * window.quizBank.length)];
  }
  function getRandomQuizzes(count) {
    count = Math.max(0, Math.min(+count || 1, window.quizBank.length));
    var indices = window.quizBank.map(function (_, i) { return i; });
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

  // Beri tahu script.js bahwa data soal siap
  try {
    window.dispatchEvent(new Event("quizdata:ready"));
  } catch (_) {
    var ev = document.createEvent("Event");
    ev.initEvent("quizdata:ready", true, true);
    window.dispatchEvent(ev);
  }

  console.log("[quizData] loaded:", window.quizBank.length, "soal");
})();
