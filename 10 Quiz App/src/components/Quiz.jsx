import React, { useCallback, useState } from 'react';
import QUESTIONS from '../questions';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer';

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);

  // We can derive which question is currently active from the userAnswers array.

  /*
  For e.g., userAnswers = ['A', 'B'] => 2 answers given (i.e, 2 questions answered)
  The next question shown should be the 3rd question.
  The index of that next question would be 2 (because indexes start at 0)
  */

  const activeQuestionIndex = userAnswers.length;

  // Fallback Ui when quiz is completed
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  if (quizIsComplete) {
    return (
      <div id='summary'>
        <img src={quizCompleteImg} alt='Trophy icon' />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  // Sort function: Used to determine the order of the elements. It is expected to return a negative value if the first argument is less than the second argument, zero if they're equal, and a positive value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
  // Sorts an array in place. This method mutates the array and returns a reference to the same array.

  // shuffledAnswers.sort((a, b) => negative number);  => Then a and b are swapped, if positive number, then the numbers remain as it is.

  // Math.random gives a random no. between [0, 1), so if we deduct 0.5 from it, then in some cases we will get a negative no., so options will be swapped, and in some not swapped.

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  );

  return (
    <div id='quiz'>
      <div id='question'>
        {/* Here, we are providing a timer of 10 secs to the user. If he doesn't select any answer before the timer expires, then nothing will be registered as the answer in the userAnswers array. */}

        {/* Whenever the key changes on a component, even if that component is not part of a list, whenever it changes React will destroy the old component instance and create a new one. So it will unmount and remount it basically. */}

        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {shuffledAnswers.map((answer) => (
            <li key={answer} className='answer'>
              <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
