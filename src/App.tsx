import { useState, useEffect } from 'react';
import { hiraganaList, Hiragana } from './data/hiragana';
import './App.css';

// Types
interface AnswerResult {
  hiragana: Hiragana;
  isCorrect: boolean;
}

// Components
const MainMenu = ({ score, onStartGame }: { score: number; onStartGame: () => void }) => (
  <div className="main-menu">
    <h1>히라가나 퀴즈</h1>
    {score > 0 && (
      <div className="final-score">
        <p>최종 점수: {score}점</p>
      </div>
    )}
    <button onClick={onStartGame} className="start-button">
      시작하기
    </button>
  </div>
);

const GameScreen = ({ 
  currentHiragana, 
  options, 
  lives, 
  score, 
  showResult, 
  onAnswer, 
  onPlayAudio,
  selectedOption
}: { 
  currentHiragana: Hiragana | null; 
  options: Hiragana[]; 
  lives: number; 
  score: number; 
  showResult: 'correct' | 'incorrect' | null; 
  onAnswer: (hiragana: Hiragana) => void; 
  onPlayAudio: () => void;
  selectedOption: Hiragana | null;
}) => (
  <div className="game-screen">
    <div className="game-header">
      <div className="lives">
        {[...Array(lives)].map((_, i) => (
          <span key={i} className="heart">❤️</span>
        ))}
      </div>
      <div className="score">
        점수: {score}
      </div>
    </div>
    
    <div className="hiragana-container">
      <button onClick={onPlayAudio} className="speaker-button">
        🔊
      </button>
      <div className="hiragana-character">
        {currentHiragana?.character}
      </div>
    </div>

    <div className="options-container">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswer(option)}
          className={`option-button ${selectedOption && selectedOption.romaji === option.romaji ? 'selected' : ''}`}
          disabled={selectedOption !== null}
        >
          <span className="korean-text">{option.korean}</span>
          <span className="romaji-text">({option.romaji})</span>
        </button>
      ))}
    </div>

    {showResult && (
      <div className={`result ${showResult}`}>
        {showResult === 'correct' ? '✅' : '❌'}
      </div>
    )}
  </div>
);

const ResultsPage = ({ 
  answerResults, 
  onPlayAgain, 
  onBackToMenu 
}: { 
  answerResults: AnswerResult[]; 
  onPlayAgain: () => void; 
  onBackToMenu: () => void; 
}) => {
  const correctCount = answerResults.filter(result => result.isCorrect).length;
  const accuracy = Math.round((correctCount / answerResults.length) * 100);
  
  return (
    <div className="results-page">
      <h1>퀴즈 결과</h1>
      <div className="results-summary">
        <p>총 문제: {answerResults.length}개</p>
        <p>맞은 문제: {correctCount}개</p>
        <p>틀린 문제: {answerResults.length - correctCount}개</p>
        <p>정확도: {accuracy}%</p>
      </div>
      
      <div className="results-list">
        <h2>문제 상세</h2>
        <div className="results-container">
          {answerResults.map((result, index) => (
            <div key={index} className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="result-hiragana">{result.hiragana.character}</div>
              <div className="result-details">
                <div>한글: {result.hiragana.korean}</div>
                <div>로마자: {result.hiragana.romaji}</div>
              </div>
              <div className="result-indicator">
                {result.isCorrect ? '✅' : '❌'}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="results-actions">
        <button onClick={onPlayAgain} className="play-again-button">
          다시 하기
        </button>
        <button onClick={onBackToMenu} className="menu-button">
          메인 메뉴로
        </button>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  // State
  const [gameStarted, setGameStarted] = useState(false);
  const [currentHiragana, setCurrentHiragana] = useState<Hiragana | null>(null);
  const [options, setOptions] = useState<Hiragana[]>([]);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);
  const [remainingLives, setRemainingLives] = useState(3);
  const [showResultsPage, setShowResultsPage] = useState(false);
  const [answerResults, setAnswerResults] = useState<AnswerResult[]>([]);
  const [selectedOption, setSelectedOption] = useState<Hiragana | null>(null);

  // Game Functions
  const startGame = () => {
    setGameStarted(true);
    setLives(3);
    setRemainingLives(3);
    setScore(0);
    setAnswerResults([]);
    setShowResultsPage(false);
    setSelectedOption(null);
    generateNewQuestion();
  };

  const generateNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * hiraganaList.length);
    const correctHiragana = hiraganaList[randomIndex];
    
    // Generate two random wrong options
    const wrongOptions = hiraganaList
      .filter(h => h.romaji !== correctHiragana.romaji)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    // Combine and shuffle options
    const allOptions = [...wrongOptions, correctHiragana]
      .sort(() => Math.random() - 0.5);

    setCurrentHiragana(correctHiragana);
    setOptions(allOptions);
  };

  const handleAnswer = (selectedHiragana: Hiragana) => {
    // Prevent multiple selections
    if (selectedOption !== null) return;
    
    setSelectedOption(selectedHiragana);
    const isCorrect = selectedHiragana.romaji === currentHiragana?.romaji;
    
    if (isCorrect) {
      setShowResult('correct');
      setScore(prev => prev + 1);
    } else {
      setShowResult('incorrect');
      setRemainingLives(prev => prev - 1);
    }

    // Record the answer result
    setAnswerResults(prev => [...prev, {
      hiragana: currentHiragana!,
      isCorrect
    }]);

    // Play pronunciation of the selected answer
    playAudio(selectedHiragana);

    setTimeout(() => {
      setShowResult(null);
      setSelectedOption(null);
      if (remainingLives <= 1) {
        setGameStarted(false);
        setShowResultsPage(true);
      } else {
        generateNewQuestion();
      }
    }, 1000);
  };

  const playAudio = (hiragana?: Hiragana) => {
    const characterToSpeak = hiragana || currentHiragana;
    
    if (characterToSpeak) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(characterToSpeak.character);
      utterance.lang = 'ja-JP';
      
      // Try to get a Japanese voice
      const voices = window.speechSynthesis.getVoices();
      const japaneseVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('o-ren') ?? voice.lang.includes('ja') ?? voice.lang.includes('jp')
      );
      
      if (japaneseVoice) {
        utterance.voice = japaneseVoice;
      }
      
      // Adjust speech parameters for more natural sound
      utterance.rate = 0.8; // Slightly slower
      utterance.pitch = 1.0; // Normal pitch
      utterance.volume = 1.0; // Full volume
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePlayAgain = () => {
    setShowResultsPage(false);
    startGame();
  };

  const handleBackToMenu = () => {
    setShowResultsPage(false);
    setGameStarted(false);
  };

  // Update lives display when remainingLives changes
  useEffect(() => {
    setLives(remainingLives);
  }, [remainingLives]);

  // Render
  return (
    <div className="app">
      {!gameStarted && !showResultsPage ? (
        <MainMenu score={score} onStartGame={startGame} />
      ) : showResultsPage ? (
        <ResultsPage 
          answerResults={answerResults} 
          onPlayAgain={handlePlayAgain} 
          onBackToMenu={handleBackToMenu} 
        />
      ) : (
        <GameScreen 
          currentHiragana={currentHiragana}
          options={options}
          lives={lives}
          score={score}
          showResult={showResult}
          onAnswer={handleAnswer}
          onPlayAudio={() => playAudio()}
          selectedOption={selectedOption}
        />
      )}
    </div>
  );
}

export default App;
