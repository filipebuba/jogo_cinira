const STORAGE_KEY = "cinira-save";

const characters = [
  { id: "cinira", name: "Cinira", role: "Curiosa", power: "Recebe dicas extras nos desafios.", color: "#ec5f59", mark: "C", image: "assets/personagem-7.png" },
  { id: "leo", name: "Leo", role: "Estrategista", power: "Organiza melhor os caminhos do mapa.", color: "#246aa8", mark: "L", image: "assets/personagem-5.png" },
  { id: "maya", name: "Maya", role: "Pesquisadora", power: "Enxerga pistas em biblioteca e sala.", color: "#2f8a62", mark: "M", image: "assets/personagem-6.png" }
];

const regions = [
  {
    id: "entrada",
    name: "Entrada do Campus",
    subtitle: "Primeiros passos",
    image: "url('WhatsApp%20Image%202026-04-26%20at%2014.21.49.jpeg')",
    levels: ["Cadastro", "Boas-vindas", "Mapa", "Orientacao"]
  },
  {
    id: "corredores",
    name: "Corredores",
    subtitle: "Salas e laboratorios",
    image: "url('WhatsApp%20Image%202026-04-26%20at%2014.21.49%20(1).jpeg')",
    levels: ["Sala 101", "Sala 102", "Avisos", "Rotas"]
  },
  {
    id: "biblioteca",
    name: "Biblioteca",
    subtitle: "Pesquisa e conhecimento",
    image: "url('WhatsApp%20Image%202026-04-26%20at%2014.21.50.jpeg')",
    levels: ["Livros", "Silencio", "Fontes", "Estudo"]
  },
  {
    id: "formatura",
    name: "Portao da Aprovacao",
    subtitle: "Missao final",
    image: "url('WhatsApp%20Image%202026-04-26%20at%2014.21.50%20(1).jpeg')",
    levels: ["Projeto", "Equipe", "Apresentacao", "Aprovada"]
  }
];

const challenges = [
  [
    {
      question: "Qual e o primeiro passo para comecar a jornada?",
      tip: "Toda aventura precisa identificar quem esta jogando.",
      answers: ["Fazer login", "Fechar o campus", "Ignorar o mapa"],
      correct: 0
    },
    {
      question: "O que ajuda o aluno a se localizar no campus?",
      tip: "Na entrada, placas e mapas mostram caminhos importantes.",
      answers: ["Mapa e sinalizacao", "Senha esquecida", "Tela bloqueada"],
      correct: 0
    },
    {
      question: "Como uma nova regiao e desbloqueada?",
      tip: "O jogo foi planejado em ciclos de quatro niveis.",
      answers: ["Completando 4 niveis", "Mudando o nome", "Abrindo o PDF"],
      correct: 0
    },
    {
      question: "Qual atitude combina com o inicio da vida universitaria?",
      tip: "O aluno precisa observar, perguntar e se organizar.",
      answers: ["Explorar com atencao", "Evitar informacoes", "Desistir do desafio"],
      correct: 0
    }
  ],
  [
    {
      question: "Para que servem avisos nos corredores?",
      tip: "Eles comunicam eventos, salas, regras e prazos.",
      answers: ["Orientar os estudantes", "Decorar sem funcao", "Bloquear o jogo"],
      correct: 0
    },
    {
      question: "O que um aluno deve fazer ao procurar uma sala?",
      tip: "A sinalizacao mostra blocos, salas e caminhos.",
      answers: ["Conferir placas e numero", "Entrar em qualquer sala", "Ignorar os corredores"],
      correct: 0
    },
    {
      question: "Qual espaco costuma apoiar atividades praticas?",
      tip: "Pense em aulas com equipamentos e experimentos.",
      answers: ["Laboratorio", "Portao", "Banco da praca"],
      correct: 0
    },
    {
      question: "Qual comportamento ajuda na convivencia academica?",
      tip: "Ambientes compartilhados precisam de cuidado coletivo.",
      answers: ["Respeitar regras e pessoas", "Fazer barulho sempre", "Esconder informacoes"],
      correct: 0
    }
  ],
  [
    {
      question: "Qual lugar combina mais com pesquisa e fontes?",
      tip: "Pense no espaco com livros, estudo e consulta.",
      answers: ["Biblioteca", "Bicicletario", "Portaria"],
      correct: 0
    },
    {
      question: "Ao usar uma fonte em trabalho academico, o que e importante fazer?",
      tip: "Trabalhos precisam mostrar de onde veio a informacao.",
      answers: ["Citar a fonte", "Apagar o autor", "Copiar sem conferir"],
      correct: 0
    },
    {
      question: "Qual atitude melhora o estudo em grupo?",
      tip: "Um grupo funciona melhor quando todos participam.",
      answers: ["Dividir tarefas", "Deixar tudo para uma pessoa", "Nao conversar"],
      correct: 0
    },
    {
      question: "Por que o silencio e importante em areas de estudo?",
      tip: "Ele ajuda outras pessoas a manterem concentracao.",
      answers: ["Favorece a concentracao", "Impede aprender", "Serve para travar fases"],
      correct: 0
    }
  ],
  [
    {
      question: "O que representa a tela 'Aprovada'?",
      tip: "Ela aparece quando uma missao importante termina.",
      answers: ["Conclusao de etapa", "Erro no login", "Regiao bloqueada"],
      correct: 0
    },
    {
      question: "Qual etapa vem antes de apresentar um projeto?",
      tip: "Uma boa apresentacao depende de preparo.",
      answers: ["Planejar e revisar", "Improvisar tudo", "Excluir os materiais"],
      correct: 0
    },
    {
      question: "O que uma equipe deve fazer durante o trabalho?",
      tip: "Organizacao evita confusao e atraso.",
      answers: ["Combinar responsabilidades", "Guardar duvidas", "Ignorar prazos"],
      correct: 0
    },
    {
      question: "Qual e a ideia central da jornada?",
      tip: "O jogo mistura exploracao, desafios e aprendizagem.",
      answers: ["Aprender avancando", "Bloquear conhecimento", "Evitar desafios"],
      correct: 0
    }
  ]
];

let state = loadState();
let activeRegion = 0;
let activeLevel = 0;
let activeChallenge = 0;

const screens = [...document.querySelectorAll(".screen")];
const loginForm = document.querySelector("#loginForm");
const playerName = document.querySelector("#playerName");
const playerClass = document.querySelector("#playerClass");
const characterGrid = document.querySelector("#characterGrid");
const characterThumbs = document.querySelector("#characterThumbs");
const characterPreview = document.querySelector("#characterPreview");
const selectedCharacterName = document.querySelector("#selectedCharacterName");
const selectedCharacterRole = document.querySelector("#selectedCharacterRole");
const selectedCharacterPower = document.querySelector("#selectedCharacterPower");
const regionTrack = document.querySelector("#regionTrack");
const welcomeText = document.querySelector("#welcomeText");
const progressSummary = document.querySelector("#progressSummary");
const levelRegion = document.querySelector("#levelRegion");
const levelTitle = document.querySelector("#levelTitle");
const challengeCount = document.querySelector("#challengeCount");
const challengeQuestion = document.querySelector("#challengeQuestion");
const challengeTip = document.querySelector("#challengeTip");
const answerGrid = document.querySelector("#answerGrid");
const finishTitle = document.querySelector("#finishTitle");
const finishText = document.querySelector("#finishText");

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-go]");
  if (target) showScreen(target.dataset.go);
});

document.querySelector("#openSettingsFromLogin").addEventListener("click", () => {
  updateProgressSummary();
  showScreen("settingsScreen");
});

document.querySelector("#openSettingsFromMap").addEventListener("click", () => {
  updateProgressSummary();
  showScreen("settingsScreen");
});

document.querySelector("#changeCharacter").addEventListener("click", () => {
  renderCharacters();
  showScreen("charactersScreen");
});

document.querySelector("#resetProgress").addEventListener("click", () => {
  state = createDefaultState();
  saveState();
  updateProgressSummary();
  renderRegions();
});

document.querySelector("#confirmCharacter").addEventListener("click", () => {
  if (!state.characterId) state.characterId = characters[0].id;
  saveState();
  renderRegions();
  showScreen("mapScreen");
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.playerName = playerName.value.trim() || "Jogador";
  state.playerClass = playerClass.value.trim();
  saveState();
  renderCharacters();
  showScreen("charactersScreen");
});

function createDefaultState() {
  return {
    playerName: "",
    playerClass: "",
    characterId: "",
    completed: {}
  };
}

function loadState() {
  try {
    return { ...createDefaultState(), ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return createDefaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function showScreen(id) {
  screens.forEach((screen) => screen.classList.toggle("active", screen.id === id));
  if (id === "mapScreen") {
    renderRegions();
  }
}

function renderCharacters() {
  if (!state.characterId) state.characterId = characters[0].id;
  const selectedCharacter = characters.find((character) => character.id === state.characterId) || characters[0];

  if (characterGrid) {
    characterGrid.innerHTML = characters.map((character) => {
      const selected = state.characterId === character.id ? "selected" : "";
      return `
        <button class="character-card ${selected}" type="button" data-character="${character.id}">
          <span class="avatar" style="background:${character.color}">${character.mark}</span>
          <h3>${character.name}</h3>
          <p><strong>${character.role}</strong></p>
          <p>${character.power}</p>
        </button>
      `;
    }).join("");

    characterGrid.querySelectorAll("[data-character]").forEach((card) => {
      card.addEventListener("click", () => {
        state.characterId = card.dataset.character;
        saveState();
        renderCharacters();
      });
    });
  }

  characterThumbs.innerHTML = characters.map((character) => {
    const selected = state.characterId === character.id ? "selected" : "";
    return `
      <button class="character-thumb ${selected}" type="button" data-character="${character.id}" style="--accent:${character.color}">
        <img src="${character.image}" alt="${character.name}" />
        <span>${character.name}</span>
      </button>
    `;
  }).join("");

  characterPreview.innerHTML = `
    <div class="character-carousel">
      ${characters.map((character) => {
        const selected = character.id === selectedCharacter.id;
        const selectedIndex = characters.findIndex((item) => item.id === selectedCharacter.id);
        const characterIndex = characters.findIndex((item) => item.id === character.id);
        const side = selected ? "focus" : characterIndex < selectedIndex ? "left" : "right";
        return `
          <button class="carousel-card ${selected ? "focus" : "side " + side}" type="button" data-character="${character.id}" style="--accent:${character.color}" aria-label="${character.name}">
            <span class="scan-line"></span>
            <img src="${character.image}" alt="${character.name}" />
            <div class="hero-character-badge">${character.mark}</div>
            <div class="hero-character-caption">
              <span>${character.role}</span>
              <strong>${character.name}</strong>
            </div>
          </button>
        `;
      }).join("")}
      <div class="carousel-glow"></div>
    </div>
  `;

  characterPreview.querySelectorAll("[data-character]").forEach((card) => {
    card.addEventListener("click", () => {
      state.characterId = card.dataset.character;
      saveState();
      renderCharacters();
    });
  });

  selectedCharacterName.textContent = selectedCharacter.name;
  selectedCharacterRole.textContent = selectedCharacter.role;
  selectedCharacterPower.textContent = selectedCharacter.power;

  characterThumbs.querySelectorAll("[data-character]").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      state.characterId = thumb.dataset.character;
      saveState();
      renderCharacters();
    });
  });
}

function renderRegions() {
  const name = state.playerName || "Jogador";
  const selectedCharacter = characters.find((character) => character.id === state.characterId) || characters[0];
  welcomeText.textContent = `${name} • ${selectedCharacter.name}`;

  regionTrack.innerHTML = regions.map((region, regionIndex) => {
    const completedCount = getRegionCompletedCount(regionIndex);
    const unlocked = isRegionUnlocked(regionIndex);
    const status = unlocked ? `${completedCount}/4` : "Bloqueada";
    const levelButtons = region.levels.map((level, levelIndex) => {
      const done = isLevelDone(regionIndex, levelIndex);
      const disabled = unlocked ? "" : "disabled";
      return `<button class="level-button ${done ? "done" : ""}" ${disabled} data-region="${regionIndex}" data-level="${levelIndex}" type="button">${levelIndex + 1}</button>`;
    }).join("");

    return `
      <article class="region-card ${unlocked ? "" : "locked"}" style="--region-bg:${region.image}">
        <div>
          <div class="region-meta">
            <span class="pill">${status}</span>
            <span class="pill">${region.subtitle}</span>
          </div>
        </div>
        <div>
          <h3>${region.name}</h3>
          <p>${unlocked ? "Complete os 4 niveis para liberar a proxima regiao." : "Conclua a regiao anterior para entrar aqui."}</p>
          <div class="level-buttons">${levelButtons}</div>
        </div>
      </article>
    `;
  }).join("");

  regionTrack.querySelectorAll(".level-button:not(:disabled)").forEach((button) => {
    button.addEventListener("click", () => startLevel(Number(button.dataset.region), Number(button.dataset.level)));
  });
}

function startLevel(regionIndex, levelIndex) {
  activeRegion = regionIndex;
  activeLevel = levelIndex;
  activeChallenge = 0;
  levelRegion.textContent = regions[regionIndex].name;
  levelTitle.textContent = regions[regionIndex].levels[levelIndex];
  renderChallenge();
  showScreen("levelScreen");
}

function renderChallenge() {
  const regionChallenges = challenges[activeRegion] || challenges[0];
  const challenge = regionChallenges[(activeLevel + activeChallenge) % regionChallenges.length];
  challengeCount.textContent = `Desafio ${activeChallenge + 1} de 4`;
  challengeQuestion.textContent = challenge.question;
  challengeTip.textContent = document.querySelector("#tipsToggle").checked ? challenge.tip : "";
  answerGrid.innerHTML = challenge.answers.map((answer, index) => {
    return `<button class="answer-button" data-answer="${index}" type="button">${answer}</button>`;
  }).join("");

  answerGrid.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => checkAnswer(button, challenge));
  });
}

function checkAnswer(button, challenge) {
  const answer = Number(button.dataset.answer);
  const correct = answer === challenge.correct;
  button.classList.add(correct ? "correct" : "wrong");

  if (!correct) return;

  answerGrid.querySelectorAll("button").forEach((item) => item.disabled = true);
  setTimeout(() => {
    activeChallenge += 1;
    if (activeChallenge >= 4) finishLevel();
    else renderChallenge();
  }, 550);
}

function finishLevel() {
  const key = `${activeRegion}-${activeLevel}`;
  state.completed[key] = true;
  saveState();

  const regionDone = getRegionCompletedCount(activeRegion) === 4;
  const unlockedNext = regionDone && regions[activeRegion + 1];
  finishTitle.textContent = `${regions[activeRegion].levels[activeLevel]} concluido`;
  finishText.textContent = unlockedNext
    ? `Parabens! Voce completou ${regions[activeRegion].name} e liberou ${regions[activeRegion + 1].name}.`
    : regionDone
      ? "Parabens! Voce concluiu todas as missoes disponiveis."
      : "Nivel salvo. Continue completando os outros desafios desta regiao.";

  showScreen("finishScreen");
}

function getRegionCompletedCount(regionIndex) {
  return regions[regionIndex].levels.filter((_, levelIndex) => isLevelDone(regionIndex, levelIndex)).length;
}

function isLevelDone(regionIndex, levelIndex) {
  return Boolean(state.completed[`${regionIndex}-${levelIndex}`]);
}

function isRegionUnlocked(regionIndex) {
  if (regionIndex === 0) return true;
  return getRegionCompletedCount(regionIndex - 1) === 4;
}

function updateProgressSummary() {
  const completed = Object.values(state.completed).filter(Boolean).length;
  progressSummary.textContent = `${completed} de ${regions.length * 4} niveis concluidos. Regioes desbloqueadas: ${regions.filter((_, index) => isRegionUnlocked(index)).length}.`;
}

if (state.playerName) {
  playerName.value = state.playerName;
  playerClass.value = state.playerClass || "";
}

updateProgressSummary();
