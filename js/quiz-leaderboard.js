let studentData = {};
let score = 0;
const questions = [
  {
    question: "1. Apakah maksud pemakanan seimbang?",
    choices: [
      "A. Makan mengikut selera sendiri",
      "B. Makan makanan yang mahal sahaja",
      "C. Makan mengikut keperluan tubuh badan",
      "D. Makan makanan segera setiap hari"
    ],
    answer: "C. Makan mengikut keperluan tubuh badan",
    image: "img/kuiz 1.png"
  },
  {
    question: "2. Antara berikut, yang manakah bukan kumpulan makanan dalam piramid makanan?",
    choices: [
      "A. Karbohidrat",
      "B. Protein",
      "C. Lemak",
      "D. Antibiotik"
    ],
    answer: "D. Antibiotik",
    image: "img/Piramid_Makanan_Malaysia_2020.jpg"
  },
  {
    question: "3. Apakah fungsi utama karbohidrat dalam tubuh manusia?",
    choices: [
      "A. Membina otot",
      "B. Membekalkan tenaga",
      "C. Melindungi badan daripada penyakit",
      "D. Menguatkan tulang"
    ],
    answer: "B. Membekalkan tenaga",
    image: "img/karbo.jpg"
  },
  {
    question: "4. Makanan yang kaya dengan protein termasuk:",
    choices: [
      "A. Nasi dan roti",
      "B. Ikan dan ayam",
      "C. Minyak dan mentega",
      "D. Gula-gula dan kek"
    ],
    answer: "B. Ikan dan ayam",
    image: "img/protein.jpg"
  },
  {
    question: "5. Apakah contoh makanan daripada kumpulan lemak?",
    choices: [
      "A. Bayam dan lobak",
      "B. Minyak masak dan mentega",
      "C. Daging dan telur",
      "D. Susu dan keju"
    ],
    answer: "B. Minyak masak dan mentega",
    image: "img/lemak.jpg"
  },
  {
    question: "6. Vitamin penting untuk:",
    choices: [
      "A. Membekalkan oksigen",
      "B. Membaiki sel rosak",
      "C. Membekalkan tenaga segera",
      "D. Menjaga kesihatan tubuh"
    ],
    answer: "D. Menjaga kesihatan tubuh",
    image: "img/vitamin.jpg"
  },
  {
    question: "7. Antara berikut, yang manakah merupakan amalan pemakanan sihat?",
    choices: [
      "A. Makan lewat malam setiap hari",
      "B. Mengambil sarapan setiap pagi",
      "C. Makan makanan segera sahaja",
      "D. Tidak makan sayur langsung"
    ],
    answer: "B. Mengambil sarapan setiap pagi",
    image: "img/sarapan.jpg"
  },
  {
    question: "8. Buah-buahan dan sayur-sayuran kaya dengan:",
    choices: [
      "A. Karbohidrat dan protein",
      "B. Vitamin dan serat",
      "C. Lemak dan gula",
      "D. Garam dan kafein"
    ],
    answer: "B. Vitamin dan serat"
  },
  {
    question: "9. Apakah akibat kekurangan zat makanan dalam diet harian?",
    choices: [
      "A. Berat badan bertambah",
      "B. Tenaga bertambah",
      "C. Mudah jatuh sakit",
      "D. Tulang menjadi kuat"
    ],
    answer: "C. Mudah jatuh sakit",
    image: "img/sakit.jpg"
  },
  {
    question: "10. Fungsi utama air dalam badan ialah:",
    choices: [
      "A. Memberi rasa kenyang",
      "B. Menggantikan gula dalam badan",
      "C. Mengawal suhu badan dan menyahtoksik",
      "D. Menyerap cahaya matahari"
    ],
    answer: "C. Mengawal suhu badan dan menyahtoksik",
    image: "img/minum air.jpg"
  }
  // Add more questions as needed
];

// --- Quiz Logic ---
function startQuiz() {
  const name = document.getElementById('name').value;
  const className = document.getElementById('class').value;
  const bgMusic = document.getElementById("bg-music");
  bgMusic.volume = 0.3;
  bgMusic.play().catch(e => console.log("Autoplay blocked:", e));

  if (name && className) {
    studentData.name = name;
    studentData.class = className;
    score = 0;
    document.getElementById('quiz-form').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    showQuestion(0);
  }
}

function showQuestion(index) {
  if (index >= questions.length) {
    showLeaderboard();
    return;
  }

  const question = questions[index];
  const quizContainer = document.getElementById('quiz-section');

  let html = `<h2>${question.question}</h2>`;
  if (question.image) {
    html += `<img src="${question.image}" class="img-fluid rounded mb-3" style="max-height: 200px;">`;
  }

  question.choices.forEach(choice => {
    html += `<button class="btn btn-outline-light btn-block mt-2" onclick="checkAnswer(${index}, '${choice}')">${choice}</button>`;
  });

  quizContainer.innerHTML = html;
}

function checkAnswer(index, selected) {
  const isCorrect = selected === questions[index].answer;
  if (isCorrect) score++;
  handleAnswer(isCorrect);
  showQuestion(index + 1);
}

function handleAnswer(isCorrect) {
  const correctSound = document.getElementById("correct-sound");
  const wrongSound = document.getElementById("wrong-sound");

  if (isCorrect) {
    correctSound.play();
  } else {
    wrongSound.play();
  }
}

// --- Leaderboard ---
function saveLeaderboardEntry(name, className, score) {
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  leaderboard.push({ name, className, score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function loadLeaderboard() {
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  const leaderboardList = document.getElementById('leaderboard');
  leaderboardList.innerHTML = '';
  leaderboard.forEach(entry => {
    const li = document.createElement('li');
    li.className = 'list-group-item bg-transparent text-white';
    li.textContent = `${entry.name} (${entry.className}) - Skor: ${entry.score}`;
    leaderboardList.appendChild(li);
  });
}

function showLeaderboard() {
  const quizContainer = document.getElementById('quiz-section');
  quizContainer.innerHTML = `<h2 class='text-center text-success'>Tahniah, ${studentData.name} dari ${studentData.class}!</h2>
    <p class='text-center'>Skor anda: ${score}/${questions.length}</p>
    <ul id="leaderboard" class="list-group mt-4"></ul>`;

  saveLeaderboardEntry(studentData.name, studentData.class, score);
  loadLeaderboard();
}

function resetLeaderboard() {
  if (confirm("Adakah anda pasti mahu menetapkan semula leaderboard?")) {
    localStorage.removeItem("leaderboard");
    loadLeaderboard();
  }
}

function answerAgain() {
  document.getElementById("name").value = "";
  document.getElementById("class").value = "";
  document.getElementById("quiz-form").style.display = "block";
  document.getElementById("quiz-section").style.display = "none";
  document.getElementById("quiz-section").innerHTML = "";
  score = 0;
}

function initializeQuiz() {
  document.getElementById("quiz-form").style.display = "block";
  document.getElementById("quiz-section").style.display = "none";
  document.getElementById("leaderboard-section").style.display = "none";
  document.getElementById("retry-btn").style.display = "none";
  document.getElementById("quiz-section").innerHTML = "";
  
  const bgMusic = document.getElementById("bg-music");
  bgMusic.currentTime = 0;
  bgMusic.play().catch(e => console.log("Autoplay blocked:", e));
  
  window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', initializeQuiz);
document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("bg-music").play();
});
