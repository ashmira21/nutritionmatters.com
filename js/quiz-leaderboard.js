// quiz-leaderboard.js

let studentData = {};
let score = 0;
let currentQuestionIndex = 0; // Added to track current question

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
];

// --- Quiz Logic ---
function startQuiz() {
  const nameInput = document.getElementById('name');
  const classInput = document.getElementById('class');
  
  if (!nameInput || !classInput) {
      console.error("Form inputs not found!");
      return;
  }

  const name = nameInput.value;
  const className = classInput.value;
  const bgMusic = document.getElementById("bg-music");
  
  if (bgMusic) {
      bgMusic.volume = 0.3;
      bgMusic.play().catch(e => console.log("Autoplay blocked:", e));
  }

  if (name && className) {
    studentData.name = name;
    studentData.class = className;
    score = 0;
    currentQuestionIndex = 0; // Reset index
    document.getElementById('quiz-form').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    
    // Initialize progress bar
    const progressBar = document.getElementById('progress-bar');
    if(progressBar) progressBar.style.width = "0%";
    
    showQuestion(currentQuestionIndex);
  } else {
      alert("Sila masukkan Nama dan Kelas.");
  }
}

function showQuestion(index) {
  if (index >= questions.length) {
    showLeaderboard();
    return;
  }

  const question = questions[index];
  const questionTextElement = document.getElementById('question-text');
  const questionImageElement = document.getElementById('question-image');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const nextButton = document.getElementById('next-btn');
  const progressText = document.getElementById('progress-text');
  const progressBar = document.getElementById('progress-bar');

  // Update Progress
  if (progressText) progressText.innerText = `Soalan ${index + 1} dari ${questions.length}`;
  if (progressBar) {
      let progressPercent = ((index) / questions.length) * 100;
      progressBar.style.width = progressPercent + "%";
  }

  // Set Question Text
  questionTextElement.innerText = question.question;

  // Set Image
  if (question.image) {
    questionImageElement.src = question.image;
    questionImageElement.style.display = 'block';
  } else {
    questionImageElement.style.display = 'none';
  }

  // Clear previous buttons
  answerButtonsElement.innerHTML = '';

  // Create Answer Buttons
  question.choices.forEach(choice => {
    const btn = document.createElement('button');
    // Remove "A. ", "B. " etc for clean display if desired, or keep as is. 
    // Keeping strictly as per your array logic:
    btn.innerText = choice; 
    btn.classList.add('btn', 'btn-option', 'w-100');
    
    // Check if this choice is the correct answer
    if (choice === question.answer) {
        btn.dataset.correct = "true";
    } else {
        btn.dataset.correct = "false";
    }

    btn.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(btn);
  });
  
  if(nextButton) nextButton.style.display = 'none';
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    const correctSound = document.getElementById("correct-sound");
    const wrongSound = document.getElementById("wrong-sound");
    const answerButtonsElement = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');

    if (isCorrect) {
        selectedBtn.classList.add('btn-success');
        score++;
        if(correctSound) correctSound.play();
    } else {
        selectedBtn.classList.add('btn-danger');
        if(wrongSound) wrongSound.play();
    }

    // Disable all buttons and highlight correct one
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('btn-success');
        }
        button.disabled = true;
    });

    if(nextButton) nextButton.style.display = 'block';
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
  const leaderboardList = document.getElementById('leaderboard-list');
  if(!leaderboardList) return;

  leaderboardList.innerHTML = '';
  leaderboard.forEach(entry => {
    const li = document.createElement('li');
    li.className = 'list-group-item bg-transparent text-white d-flex justify-content-between align-items-center';
    li.innerHTML = `
        <div>
            <i class="fas fa-user-graduate me-2"></i>
            <strong>${entry.name}</strong> <small class="text-muted">(${entry.className})</small>
        </div>
        <span class="badge bg-warning text-dark rounded-pill">${entry.score} mata</span>
    `;
    leaderboardList.appendChild(li);
  });
}

function showLeaderboard() {
  document.getElementById('quiz-section').style.display = 'none';
  document.getElementById('leaderboard-section').style.display = 'block';
  
  const progressBar = document.getElementById('progress-bar');
  if(progressBar) progressBar.style.width = "100%";

  saveLeaderboardEntry(studentData.name, studentData.class, score);
  loadLeaderboard();
}

function resetLeaderboard() {
  if (confirm("Adakah anda pasti mahu menetapkan semula leaderboard?")) {
    localStorage.removeItem("leaderboard");
    loadLeaderboard();
  }
}

// Initialize logic
document.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners if elements exist
    const quizForm = document.getElementById('student-info-form');
    if (quizForm) {
        quizForm.addEventListener('submit', e => {
            e.preventDefault();
            startQuiz();
        });
    }
    
    const nextButton = document.getElementById('next-btn');
    if(nextButton) {
        nextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        });
    }
});
