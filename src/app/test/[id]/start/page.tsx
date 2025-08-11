


"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

interface Question {
  id: string | number;
  question: string;
  options: string[];
  answer: string; // correct answer
}

interface TestData {
  duration: number;
  questions: Question[];
  name: string;
  description: string;
}

interface CandidateInfo {
  name: string;
  email: string;
  mobile: string;
}

export default function TestStartPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();

  const [testData, setTestData] = useState<TestData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string | number, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const res = await axios.get(`/api/mentor/test/${id}/manageTests`);
        const test = res.data?.test;

        if (!test || !Array.isArray(test.questions)) {
          console.error("Invalid test structure:", res.data);
          return;
        }

        setTestData(test);
        setTimeLeft(test.duration * 60);
      } catch (error) {
        console.error("Error fetching test data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTestData();
  }, [id]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(); // auto submit when time runs out
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = (questionId: string | number, selectedOption: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleNext = () => {
    if (!testData) return;
    if (currentQuestionIndex < testData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!testData) return;

    const candidateData: CandidateInfo = JSON.parse(localStorage.getItem("candidateInfo") || "{}");
    if (!candidateData.name || !candidateData.email || !candidateData.mobile) {
      alert("Candidate info missing. Please re-enter the test.");
      router.push(`/test/${id}`);
      return;
    }

    // ✅ Step 1: Calculate Score
    let score = 0;
    for (const question of testData.questions) {
      const userAnswer = answers[question.id];
      if (userAnswer && userAnswer === question.answer) {
        score += 1;
      }
    }

    // ✅ Step 2: Determine status
    const totalQuestions = testData.questions.length;
    const percentage = (score / totalQuestions) * 100;
    const status = percentage >= 70 ? "PASSED" : "FAILED";

    // ✅ Step 3: Submit result
    try {
      await axios.post(`/api/mentor/test/${id}/submitTest`, {
        userEmail: candidateData.email,
        userMobile: candidateData.mobile,
        userName: candidateData.name,
        score,
        status,
      });

      alert(`Test submitted successfully! You scored ${score}/${totalQuestions} (${status})`);
      router.push("/thank-you");
    } catch (error) {
      console.error("Error submitting result:", error);
      alert("Failed to submit result. Please try again.");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading test...</div>;
  if (!testData || !Array.isArray(testData.questions) || testData.questions.length === 0)
    return <div className="p-10 text-center">No test data found.</div>;

  const question = testData.questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">{testData.name}</h1>
        <div className="text-red-600 font-bold">
          Time Left: {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
        </div>
      </div>

      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">
          Question {currentQuestionIndex + 1} of {testData.questions.length}
        </h2>
        <p className="mb-4 whitespace-pre-line">{question.question}</p>

        <div className="space-y-2">
          {question.options?.map((opt, index) => (
            <label
              key={index}
              className={`block p-2 border rounded cursor-pointer ${
                answers[question.id] === opt ? "bg-blue-100 border-blue-500" : ""
              }`}
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                value={opt}
                checked={answers[question.id] === opt}
                onChange={() => handleOptionSelect(question.id, opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {currentQuestionIndex < testData.questions.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
}
