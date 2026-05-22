import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type QuizTypes = {
    quiz_id: number;
    quiz_title: string;
    quiz_timer_amount: number;
    quiz_score_x_amount: number;
    version: string;
};

type QuestionTypes = {
    question_id: number;
    quiz_id: number;
    question: string;
    answer: string;
    fake_answer_1: string;
    fake_answer_2: string;
    fake_answer_3: string;
    randomisedAnswers?: string[];
};

export default function Quizes() {
    // to get the routeid from the page route
    const { id } = useParams();
    const routeId = Number(id);

    // to prevent data being shown/progress being shown in other quizes
    const storageKey = `selectedAnswers_quiz_${routeId}`;
    const storedAnswers = JSON.parse(localStorage.getItem(storageKey) || '{}');

    const [quizes, setQuizes] = useState<QuizTypes[]>([]);
    const [questions, setQuestions] = useState<QuestionTypes[]>([]);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({ ...storedAnswers });
    // keeps track of the selected answers and sets the aswers when the page gets reloaded via local storage.

    // mainly needed for filtering and calculating the score
    async function loadQuizes(): Promise<void> {
        const res = await fetch("http://localhost:3000/quizes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const currentQuizes = await res.json();
        setQuizes(currentQuizes);
    }

    async function loadQuestions(): Promise<void> {
        const res = await fetch("http://localhost:3000/questions");
        const currentQuestions = await res.json();

        const filtered = currentQuestions.filter(
            (quiz: QuestionTypes) => quiz.quiz_id === routeId
        );

        const randomisedQuestions = filtered.map((q: QuestionTypes) => ({
            ...q,
            randomisedAnswers: randomiseArray([
                q.answer,
                q.fake_answer_1,
                q.fake_answer_2,
                q.fake_answer_3
            ])
        }));

        setQuestions(randomisedQuestions);
    }

    function handleAnswer(questionId: number, selected: string) {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: selected
        }));
    }

    // checks the progress for the progress bar on only quizes with the current id
    const answeredCount = questions.filter(
        (currentQuiz) => selectedAnswers[currentQuiz.question_id]
    ).length;

    // makes sure that the score only increses with the right selection and decreases with a wrong one.
    const calculatedScore = questions.reduce((total, question) => {
        const quiz = quizes.find(quiz => quiz.quiz_id === question.quiz_id);
        const scoreModifier = quiz ? quiz.quiz_score_x_amount : 1;

        if (selectedAnswers[question.question_id] === question.answer) {
            return total + 10 * scoreModifier;
        }
        return total;
    }, 0);

    function randomiseArray(array: string[]) {
        return [...array].sort(() => Math.random() - 0.5);
    }

    // when the component is loaded, it will fetch the quizes and questions from the backend
    useEffect(() => {
        loadQuizes();
        loadQuestions();
    }, []);

    // stores the answers in local storage when the user selects an anwer
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(selectedAnswers));
    }, [selectedAnswers]);

    const question = questions[currentQuestion];

    return (
        <>
            {quizes.filter((quiz) => quiz.quiz_id === routeId).map((quiz) => (
                <div key={quiz.quiz_id}>
                    <h2>{quiz.quiz_title}</h2>
                </div>
            ))}

            {/* Makes sure that the question only gets displayed once instead of x4 for each answer. */}
            {question && (
                <div key={"question: " + question.question_id} className="question-box__container">
                    <h3 className="question-box__question">{question.question}</h3>

                    {question.randomisedAnswers?.map((answer) => (
                        <label key={answer}>
                            <input
                                type="radio"
                                name={`question-${question.question_id}`}
                                value={answer}
                                checked={selectedAnswers[question.question_id] === answer}
                                onChange={() => handleAnswer(question.question_id, answer)}
                            />
                            {answer}
                        </label>
                    ))}
                </div>
            )}

            <button
                onClick={() =>
                    setCurrentQuestion((prev) => Math.max(prev - 1, 0)) // makes sure that the question number does not go below 0
                }
            >
                Previous
            </button>
            <button
                onClick={() =>
                    setCurrentQuestion((prev) =>
                        Math.min(prev + 1, questions.length - 1) // makes sure that the question number does not go above the total amount of questions
                    )
                }
            >
                Next
            </button>

            {/* shows the current amount of answered questions in relation to the total amount of questions */}
            <div className="question-box__progress">
                <progress value={answeredCount} max={questions.length} />
                <p>Selected answers: {answeredCount}</p>
            </div>

            <h2>Score: {calculatedScore}</h2>
        </>
    );
}