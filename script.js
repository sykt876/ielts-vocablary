const words = {
  "agree to/with A": {
    "meaning": "Aに同意する、Aと一致する",
    "example": "I agree to your proposal.",
    "japanese": "私はあなたの提案に同意します。"
  },
  "assure A that S V": {
    "meaning": "AにSがVすることを保証する",
    "example": "I assure you that everything will be fine.",
    "japanese": "私はあなたに全てがうまくいくことを保証します。"
  },
  "establish": {
    "meaning": "設立する、確立する",
    "example": "The company was established in 1990.",
    "japanese": "その会社は1990年に設立されました。"
  }
  // 必要に応じて単語を追加
};

let currentIndex = 0;
let currentOrder = [];
let correctAnswers = 0;
let answeredCount = 0;
let wrongAnswers = [];

// テスト開始
function startTest(order) {
  currentIndex = 0;
  correctAnswers = 0;
  answeredCount = 0;
  wrongAnswers = [];

  currentOrder = order === 'random' ? shuffle(Object.keys(words)) : Object.keys(words);

  document.getElementById('order-selection').style.display = 'none';
  document.getElementById('word-container').style.display = 'block';

  loadQuestion();
}

// 配列をランダムに並べ替える
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 問題をロード
function loadQuestion() {
  const wordKey = currentOrder[currentIndex];
  const wordData = words[wordKey];

  document.getElementById("word").textContent = wordKey;

  const options = generateOptions(wordData.meaning);
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option, wordData);
    choicesDiv.appendChild(button);
  });

  document.getElementById("result").textContent = "";
  document.getElementById("example").textContent = "";
}

// 選択肢生成
function generateOptions(correctAnswer) {
  const allMeanings = Object.values(words).map(word => word.meaning);
  const options = [correctAnswer];

  while (options.length < 3) {
    const randomOption = allMeanings[Math.floor(Math.random() * allMeanings.length)];
    if (!options.includes(randomOption)) {
      options.push(randomOption);
    }
  }

  return shuffle(options);
}

// 答えをチェック
function checkAnswer(selectedAnswer, wordData) {
  const resultDiv = document.getElementById("result");
  const exampleDiv = document.getElementById("example");

  answeredCount++;

  if (selectedAnswer === wordData.meaning) {
    correctAnswers++;
    resultDiv.textContent = "正解！";
    exampleDiv.textContent = `例文: ${wordData.example} (${wordData.japanese})`;
  } else {
    wrongAnswers.push(currentOrder[currentIndex]);
    resultDiv.textContent = "不正解。正解は以下です：";
    exampleDiv.innerHTML = `
      正解: ${wordData.meaning}<br>
      例文: ${wordData.example}<br>
      日本語訳: ${wordData.japanese}
    `;
  }

  if (answeredCount % 10 === 0) {
    alert(`10問中 ${correctAnswers} 問正解しています！`);
  }
}

// 次の問題へ
function nextQuestion() {
  currentIndex++;
  if (currentIndex >= currentOrder.length) {
    displayFinalResults();
    return;
  }

  loadQuestion();
}

// 最終結果の表示
function displayFinalResults() {
  const totalQuestions = currentOrder.length;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

  alert(`テスト終了！\n合計: ${totalQuestions} 問\n正答数: ${correctAnswers} 問\n正答率: ${scorePercentage}%`);

  if (wrongAnswers.length > 0) {
    const retry = confirm("間違えた単語の復習をしますか？");
    if (retry) {
      currentOrder = [...wrongAnswers];
      currentIndex = 0;
      wrongAnswers = [];
      correctAnswers = 0;
      loadQuestion();
    } else {
      resetTest();
    }
  } else {
    alert("すべて正解です！おめでとうございます！");
    resetTest();
  }
}

// テストリセット
function resetTest() {
  document.getElementById('word-container').style.display = 'none';
  document.getElementById('order-selection').style.display = 'block';
}
