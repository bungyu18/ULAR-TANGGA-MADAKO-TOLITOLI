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
  question: "Energi listrik bisa kita dapatkan dari…",
  options: [
    "A. Batu",
    "B. Pembangkit listrik",
    "C. Kertas",
    "D. Pasir"
  ]
  answer: "B. Pembangkit listrik"
}
{
  id: 2,
  question: "Panel surya mendapatkan energi dari…",
  options: [
    "A. Bulan",
    "B. Lampu",
    "C. Matahari",
    "D. Angin"
  ]
  answer: "C. Matahari"
}
{
  id: 3,
  question: "PLTA (Pembangkit Listrik Tenaga Air) menggunakan…",
  options: [
    "A. Udara",
    "B. Air",
    "C. Tanah",
    "D. Benda logam"
  ]
  answer: "B. Air"
}
{
  id: 4,
  question: "Energi listrik disalurkan ke rumah lewat…",
  options: [
    "A. Jalan raya",
    "B. Pipa air",
    "C. Kabel listrik",
    "D. Selang"
  ]
  answer: "C. Kabel listrik"
}
{
  id: 5,
  question: "Kipas angin bekerja karena listrik berubah menjadi energi…",
  options: [
    "A. Gerak",
    "B. Cahaya",
    "C. Suara",
    "D. Panas"
  ]
  answer: "A. Gerak"
}
{
  id: 6,
  question: "Lampu menyala karena energi listrik berubah menjadi…",
  options: [
    "A. Angin",
    "B. Cahaya",
    "C. Es",
    "D. Suara"
  ]
  answer: "B. Cahaya"
}
{
  id: 7,
  question: "Jika kabel listrik rusak, maka…",
  options: [
    "A. Lampu bisa tambah terang",
    "B. Listrik bisa mati",
    "C. Kipas angin jadi besar",
    "D. TV menyala terus"
  ]
  answer: "B. Listrik bisa mati"
}
{
  id: 8,
  question: "Menghemat listrik di rumah itu penting supaya…",
  options: [
    "A. Listrik cepat habis",
    "B. Orang lain tidak bisa pakai",
    "C. Tagihan listrik tidak mahal",
    "D. Lampu jadi redup"
  ]
  answer: "C. Tagihan listrik tidak mahal"
}
{
  id: 9,
  question: "Contoh alat yang memakai listrik adalah…",
  options: [
    "A. Buku",
    "B. Pensil",
    "C. Televisi",
    "D. Sepatu"
  ]
  answer: "C. Televisi"
}
{
  id: 10,
  question: "Kita harus mematikan lampu saat tidak dipakai agar…",
  options: [
    "A. Rumah makin panas",
    "B. Listrik tidak boros",
    "C. Lampu cepat rusak",
    "D. Warna lampu berubah"
  ]
  answer: "B. Listrik tidak boros"
  }
  ]

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



