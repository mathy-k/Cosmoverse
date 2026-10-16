/* =====================================================
   COSMOVerse - Space Knowledge Challenge
   Client-Side Form Validation using JavaScript + DHTML
   10-Question Comprehensive Astronomy Evaluation
   ===================================================== */

const QUIZ_ANSWERS = {
  q1: {
    correct: "Mars",
    question: "Which planet is known as the Red Planet in our Solar System?",
    explanation: "Mars appears reddish because its surface regolith is rich in iron oxide (rust) minerals."
  },
  q2: {
    correct: "Jupiter",
    question: "What is the largest planet in our Solar System?",
    explanation: "Jupiter is a gas giant with a mass more than 2.5 times that of all other planets in the Solar System combined."
  },
  q3: {
    correct: "Venus",
    question: "Which planet has the hottest surface temperature in our Solar System?",
    explanation: "Venus experiences a runaway greenhouse effect from its dense carbon dioxide atmosphere, reaching 465°C."
  },
  q4: {
    correct: "Saturn",
    question: "Which gas giant is famous for its extensive and bright ring system?",
    explanation: "Saturn's iconic rings span over 280,000 km across, made of 99% pure water ice particles."
  },
  q5: {
    correct: "Andromeda",
    question: "Which major spiral galaxy is closest to our Milky Way?",
    explanation: "The Andromeda Galaxy (M31) is approximately 2.5 million light-years away and contains nearly 1 trillion stars."
  },
  q6: {
    correct: "Event Horizon",
    question: "What is the boundary around a black hole beyond which nothing can escape?",
    explanation: "At the Event Horizon, escape velocity equals the speed of light, preventing any matter or radiation from escaping."
  },
  q7: {
    correct: "James Webb Space Telescope",
    question: "Which infrared observatory orbits at the Sun-Earth L2 Lagrange point?",
    explanation: "JWST was launched on December 25, 2021, and observes the earliest stars and galaxies formed after the Big Bang."
  },
  q8: {
    correct: "Sputnik 1",
    question: "What was humanity's first artificial satellite launched into space?",
    explanation: "Sputnik 1 was launched by the Soviet Union on October 4, 1957, orbiting Earth for three weeks and initiating the Space Age."
  },
  q9: {
    correct: "Perseverance",
    question: "Which NASA rover is currently exploring Jezero Crater on Mars?",
    explanation: "Perseverance landed in Jezero Crater in February 2021, searching for signs of ancient microbial habitability."
  },
  q10: {
    correct: "13.8 Billion Years",
    question: "What is the scientifically estimated age of our Universe?",
    explanation: "Cosmic Microwave Background measurements by ESA's Planck space observatory date the universe to ~13.787 billion years."
  }
};

/* ================= NAME VALIDATION ================= */
function validateName() {
  const name = document.getElementById("name");
  const error = document.getElementById("nameError");
  if (!name || !error) return true;

  const namePattern = /^[A-Za-z ]+$/;
  if (name.value.trim() === "") {
    error.innerHTML = "⚠ Please enter your cadet name.";
    error.style.color = "#ff4f70";
    name.classList.add("invalid-field");
    name.classList.remove("valid-field");
    return false;
  }
  if (!namePattern.test(name.value.trim())) {
    error.innerHTML = "⚠ Name should contain letters only.";
    error.style.color = "#ff4f70";
    name.classList.add("invalid-field");
    name.classList.remove("valid-field");
    return false;
  }
  error.innerHTML = "✓ Valid cadet callsign.";
  error.style.color = "#5cff8d";
  name.classList.add("valid-field");
  name.classList.remove("invalid-field");
  return true;
}

/* ================= EMAIL VALIDATION ================= */
function validateEmail() {
  const email = document.getElementById("email");
  const error = document.getElementById("emailError");
  if (!email || !error) return true;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === "") {
    error.innerHTML = "⚠ Please enter your communication email.";
    error.style.color = "#ff4f70";
    email.classList.add("invalid-field");
    email.classList.remove("valid-field");
    return false;
  }
  if (!emailPattern.test(email.value.trim())) {
    error.innerHTML = "⚠ Please enter a valid email format.";
    error.style.color = "#ff4f70";
    email.classList.add("invalid-field");
    email.classList.remove("valid-field");
    return false;
  }
  error.innerHTML = "✓ Valid uplink address.";
  error.style.color = "#5cff8d";
  email.classList.add("valid-field");
  email.classList.remove("invalid-field");
  return true;
}

/* ================= PLANET VALIDATION ================= */
function validatePlanet() {
  const planet = document.getElementById("planet");
  const error = document.getElementById("planetError");
  if (!planet || !error) return true;

  if (planet.value === "") {
    error.innerHTML = "⚠ Please designate an assigned planet.";
    error.style.color = "#ff4f70";
    planet.classList.add("invalid-field");
    planet.classList.remove("valid-field");
    return false;
  }
  error.innerHTML = "✓ Planetary sector designated.";
  error.style.color = "#5cff8d";
  planet.classList.add("valid-field");
  planet.classList.remove("invalid-field");
  return true;
}

/* ================= INDIVIDUAL QUESTION VALIDATION ================= */
function validateQuestion(qNum) {
  const answer = document.querySelector(`input[name="q${qNum}"]:checked`);
  const error = document.getElementById(`q${qNum}Error`);
  if (!answer) {
    if (error) {
      error.innerHTML = "⚠ Please select an orbital telemetry answer.";
      error.style.color = "#ff4f70";
    }
    return false;
  }
  if (error) {
    error.innerHTML = "✓ Answer locked in.";
    error.style.color = "#5cff8d";
  }
  return true;
}

function validateQuestion1() { return validateQuestion(1); }
function validateQuestion2() { return validateQuestion(2); }

/* ================= INTEREST VALIDATION ================= */
function validateInterests() {
  const interests = document.querySelectorAll('input[name="interest"]:checked');
  const error = document.getElementById("interestError");
  if (!error) return true;

  if (interests.length === 0) {
    error.innerHTML = "⚠ Please select at least one space topic of interest.";
    error.style.color = "#ff4f70";
    return false;
  }
  error.innerHTML = "✓ Topics logged.";
  error.style.color = "#5cff8d";
  return true;
}

/* ================= FEEDBACK VALIDATION ================= */
function validateFeedback() {
  const feedback = document.getElementById("feedback");
  const error = document.getElementById("feedbackError");
  if (!feedback || !error) return true;

  const text = feedback.value.trim();
  if (text === "") {
    error.innerHTML = "⚠ Please enter your telemetry observations / feedback.";
    error.style.color = "#ff4f70";
    feedback.classList.add("invalid-field");
    feedback.classList.remove("valid-field");
    return false;
  }
  if (text.length < 10) {
    error.innerHTML = "⚠ Observations must contain at least 10 characters.";
    error.style.color = "#ff4f70";
    feedback.classList.add("invalid-field");
    feedback.classList.remove("valid-field");
    return false;
  }
  error.innerHTML = "✓ Telemetry observation accepted.";
  error.style.color = "#5cff8d";
  feedback.classList.add("valid-field");
  feedback.classList.remove("invalid-field");
  return true;
}

/* ================= CHARACTER COUNTER ================= */
function updateCount() {
  const feedback = document.getElementById("feedback");
  const counter = document.getElementById("charCount");
  if (feedback && counter) {
    counter.innerHTML = `${feedback.value.length} / 150 characters`;
  }
  validateFeedback();
}

/* ================= MAIN FORM VALIDATION & EVALUATION ================= */
function validateForm() {
  const nameValid = validateName();
  const emailValid = validateEmail();
  const planetValid = validatePlanet();

  // Validate all 10 questions
  let allQuestionsValid = true;
  let firstUnansweredQ = -1;

  for (let i = 1; i <= 10; i++) {
    const qValid = validateQuestion(i);
    if (!qValid) {
      allQuestionsValid = false;
      if (firstUnansweredQ === -1) firstUnansweredQ = i;
    }
  }

  const interestsValid = validateInterests();
  const feedbackValid = validateFeedback();

  // If cadet profile has errors, scroll to top
  if (!nameValid || !emailValid || !planetValid) {
    window.scrollTo({ top: 150, behavior: "smooth" });
    return false;
  }

  // If any question is unanswered, switch to that slide!
  if (!allQuestionsValid && firstUnansweredQ !== -1) {
    if (typeof goToSlide === "function") {
      goToSlide(firstUnansweredQ);
    }
    return false;
  }

  // If debrief inputs are invalid, switch to debrief slide (slide 11)
  if (!interestsValid || !feedbackValid) {
    if (typeof goToSlide === "function") {
      goToSlide(11);
    }
    return false;
  }

  // ALL VALID! Calculate Score & Render Holographic Scorecard
  let score = 0;
  const userAnswers = {};

  for (let i = 1; i <= 10; i++) {
    const chosen = document.querySelector(`input[name="q${i}"]:checked`)?.value;
    userAnswers[`q${i}`] = chosen;
    if (chosen === QUIZ_ANSWERS[`q${i}`].correct) {
      score += 10;
    }
  }

  const cadetName = document.getElementById("name").value.trim();
  const cadetEmail = document.getElementById("email").value.trim();
  const cadetPlanet = document.getElementById("planet").value;

  renderHolographicScorecard(cadetName, cadetEmail, cadetPlanet, score, userAnswers);

  return false; // prevent full page reload
}

/* ================= RENDER SCORECARD ================= */
function renderHolographicScorecard(name, email, planet, score, userAnswers) {
  const total = 100;
  const pct = score;
  const pass = score >= 50;

  let rankTitle = "🚀 CADET ORBITAL NAVIGATOR";
  let rankSeal = "🚀";
  let statusBadge = "QUALIFIED FOR ORBIT";
  let statusColor = "var(--accent-green)";

  if (score >= 90) {
    rankTitle = "🏆 COSMIC GRANDMASTER";
    rankSeal = "🌟";
    statusBadge = "OUTSTANDING - HIGHEST HONORS";
    statusColor = "var(--accent-gold)";
  } else if (score >= 70) {
    rankTitle = "🛸 SENIOR FLIGHT COMMANDER";
    rankSeal = "🛸";
    statusBadge = "QUALIFIED - ADVANCED WING";
    statusColor = "var(--primary-cyan)";
  } else if (score >= 50) {
    rankTitle = "🛰️ ORBITAL FLIGHT ACE";
    rankSeal = "🛰️";
    statusBadge = "QUALIFIED - STANDARD WING";
    statusColor = "var(--accent-green)";
  } else {
    rankTitle = "🚀 CADET TRAINEE";
    rankSeal = "🛠️";
    statusBadge = "RE-EVALUATION RECOMMENDED";
    statusColor = "var(--accent-red)";
  }

  // Build 10-Question Review Breakdown
  let reviewHtml = "";
  for (let i = 1; i <= 10; i++) {
    const qData = QUIZ_ANSWERS[`q${i}`];
    const userChoice = userAnswers[`q${i}`] || "None selected";
    const isCorrect = userChoice === qData.correct;

    reviewHtml += `
      <div class="review-card ${isCorrect ? 'correct' : 'incorrect'}">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <span class="review-badge ${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect ? '✓ CORRECT (+10 MARKS)' : '✗ INCORRECT (0 MARKS)'}
          </span>
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">QUESTION ${i} OF 10</span>
        </div>
        <h4 style="font-size: 15px; margin: 6px 0 10px; color: #fff;">${qData.question}</h4>
        <div style="font-size: 13.5px; margin-bottom: 4px;">
          Your Answer: <strong style="color: ${isCorrect ? 'var(--accent-green)' : 'var(--accent-red)'};">${userChoice}</strong>
        </div>
        ${!isCorrect ? `<div style="font-size: 13.5px; color: var(--accent-green);">Correct Answer: <strong>${qData.correct}</strong></div>` : ''}
        <div class="review-explanation">
          💡 <strong>Science Telemetry:</strong> ${qData.explanation}
        </div>
      </div>
    `;
  }

  const resultContainer = document.getElementById("successMessage");
  if (!resultContainer) return;

  resultContainer.style.display = "block";
  resultContainer.innerHTML = `
    <div class="cert-card" style="margin-top: 15px;">
      <div class="cert-seal">${rankSeal}</div>
      <span style="background: rgba(147, 51, 234, 0.25); color: var(--accent-neon-purple); border: 1px solid var(--accent-neon-purple); padding: 5px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; display: inline-block; margin-bottom: 12px;">
        ${statusBadge}
      </span>
      <h2 style="font-size: 28px; color: #fff; margin-bottom: 6px;">${rankTitle}</h2>
      <p style="font-size: 15.5px; color: var(--text-muted); margin-bottom: 25px;">
        Cadet <strong style="color: #fff;">${name}</strong> (${email}) • Assigned Planet: <strong style="color: var(--primary-cyan);">${planet}</strong>
      </p>

      <div class="kpi-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-bottom: 30px;">
        <div class="kpi-card">
          <div class="kpi-label">TOTAL ACCURACY SCORE</div>
          <div class="kpi-value" style="color: ${statusColor};">${score} / ${total}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">PERCENTAGE RATIO</div>
          <div class="kpi-value" style="color: var(--accent-green);">${pct}%</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">TELEMETRY STATUS</div>
          <div class="kpi-value" style="font-size: 20px; color: ${statusColor};">${pass ? 'PASSED ★' : 'NEEDS TRAINING'}</div>
        </div>
      </div>

      <h3 style="font-size: 18px; color: var(--primary-cyan); margin: 30px 0 16px; text-align: left; border-bottom: 1px dashed rgba(192,132,252,0.3); padding-bottom: 8px;">
        🔭 DETAILED 10-QUESTION FLIGHT TELEMETRY REVIEW
      </h3>

      <div style="margin-top: 15px;">
        ${reviewHtml}
      </div>

      <div class="btn-group" style="margin-top: 35px; justify-content: center; gap: 15px;">
        <button type="button" class="btn btn-secondary" onclick="resetForm()">↺ Retake Space Challenge</button>
        <a href="servlet-form.html" class="btn btn-primary">🚀 Official Cadet Registration →</a>
      </div>
    </div>
  `;

  // Hide the quiz form stepper and scroll to scorecard
  const formBox = document.getElementById("quizStepperBox");
  if (formBox) formBox.style.display = "none";
  resultContainer.scrollIntoView({ behavior: "smooth" });
}

/* ================= RESET FORM ================= */
function resetForm() {
  const form = document.getElementById("quizForm");
  if (form) form.reset();

  const fields = document.querySelectorAll(".valid-field, .invalid-field");
  fields.forEach(f => {
    f.classList.remove("valid-field");
    f.classList.remove("invalid-field");
  });

  const cards = document.querySelectorAll(".quiz-option-card");
  cards.forEach(c => c.classList.remove("selected"));

  const dots = document.querySelectorAll(".quiz-dot");
  dots.forEach(d => {
    d.classList.remove("answered");
    d.classList.remove("active");
  });

  const errors = document.querySelectorAll(".validation-message");
  errors.forEach(e => { e.innerHTML = ""; });

  const counter = document.getElementById("charCount");
  if (counter) counter.innerHTML = "0 / 150 characters";

  const success = document.getElementById("successMessage");
  if (success) {
    success.innerHTML = "";
    success.style.display = "none";
  }

  const formBox = document.getElementById("quizStepperBox");
  if (formBox) formBox.style.display = "block";

  // Reset Stepper to Slide 1
  if (typeof goToSlide === "function") {
    goToSlide(1);
  }

  if (typeof updateQuizProgress === "function") {
    updateQuizProgress();
  }

  window.scrollTo({ top: 150, behavior: "smooth" });
}