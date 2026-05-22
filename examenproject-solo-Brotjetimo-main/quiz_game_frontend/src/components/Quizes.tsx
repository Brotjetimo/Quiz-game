import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type QuizTypes = {
    quiz_id: number;
    quiz_title: string;
    quiz_timer_amount: number;
    quiz_score_x_amount: number;
    version: string;
};

export default function QuizQuestions() {
    const [quizes, setQuizes] = useState<QuizTypes[]>([]);

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

    function resetQuiz(quizId: number): boolean {
        const selectedAnswers = JSON.parse(localStorage.getItem(`selectedAnswers_quiz_${quizId}`) || '');

        // returns {} if there are no selected answers, by checking the object keys we can check if there are any
        if (!selectedAnswers || Object.keys(selectedAnswers).length !== 0) {
            const result = confirm("Do you want to reset the quiz?");
            if (result) {
                localStorage.removeItem(`selectedAnswers_quiz_${quizId}`);
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        loadQuizes();
    }, []);

    return (
        <>
            {quizes.map((quiz) => (
                <div key={quiz.quiz_id}>
                    <Link to={"/quiz/" + quiz.quiz_id} onClick={() => resetQuiz(quiz.quiz_id)}>
                        {quiz.quiz_title}
                    </Link>
                    <ul>
                        <li>Quiz id: {quiz.quiz_id}</li>
                        <li>Timer amount: {quiz.quiz_timer_amount}</li>
                        <li>Score modifier amount: {quiz.quiz_score_x_amount}</li>
                        <li>Version: {quiz.version}</li>
                    </ul>
                </div>
            ))}
        </>
    );
}