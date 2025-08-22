"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

interface Question {
  id: string | number;
  question: string;
  options: string[];
  answer: string;
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

interface codingQuestion {
  id: string | number;
  problemStatement: string;
  sampleInput: string[];
  sampleOutput: string[];
  constraints: string;
}

interface TechnicalTestData {
  name: string;
  description: string;
  duration: number;
  noOfQuestions: number;
  technicalQuestions: codingQuestion[];
}

interface TestResult {
  passed: number;
  total: number;
}

export default function TestStartPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();

  const [testData, setTestData] = useState<TestData | null>(null);
  const [codingTestData, setCodingTestData] = useState<TechnicalTestData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string | number, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState("python");
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);
  const [questionIdArray, setQuestionIdArray] = useState<string[]>([]);
  const [answerArray, setAnswerArray] = useState<string[]>([]);
  const [passedTestCasesArray, setPassedTestCasesArray] = useState<string[]>([]);
  const [confirmPopup, setConfirmPopup] = useState(false)
  const [score, setScore] = useState(0);
  const [enableNext, setEnableNext] = useState(false)
  const [testCaserunning, setTestCaseRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const res = await axios.get(`/api/mentor/test/${id}/manageTests`);
        const test = res.data?.test;
        console.log(test);
        if (!test) {
          console.error("Invalid test structure:", res.data);
          return;
        }

        if (Array.isArray(test.questions)) {
          setTestData(test);
        }
        else if (Array.isArray(test.technicalQuestions)) {
          setCodingTestData(test);
        }

        setTimeLeft(test.duration * 60);
      } catch (error) {
        console.error("Error fetching test data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTestData();
  }, [id]);

  const handleTestSubmit = () => {
    if (testData?.questions?.length) {
      handleSubmit();
    }
    else {
      handleSubmitCodingTest();
    }
  }

  useEffect(() => {
    if (timeLeft <= 0) {
      handleTestSubmit();
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = (questionId: string | number, selectedOption: string) => {
    const value = selectedOption && selectedOption.trim() !== "" ? selectedOption : "-";
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = (questionId: string | number) => {
    if (!testData) return;

    let updatedAnswers = { ...answers };
    let updatedAnswerArray = [...answerArray];
    let updatedIdArray = [...questionIdArray];
    if (!answers[questionId]) {
      updatedAnswers[questionId] = "-";
      updatedAnswerArray.push("-");
    } else {
      updatedAnswerArray.push(answers[questionId]);
    }
    updatedIdArray.push(String(questionId));
    setAnswers(updatedAnswers);
    setAnswerArray(updatedAnswerArray);
    setQuestionIdArray(updatedIdArray);

    if (currentQuestionIndex < testData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit(updatedIdArray, updatedAnswerArray);
    }
  };

  const handleSubmit = async (
    finalQuestionIds = questionIdArray,
    finalAnswerArray = answerArray
  ) => {
    if (!testData) return;
    setIsSubmitting(true);
    const candidateData: CandidateInfo = JSON.parse(localStorage.getItem("candidateInfo") || "{}");
    if (!candidateData.name || !candidateData.email || !candidateData.mobile) {
      alert("Candidate info missing. Please re-enter the test.");
      router.push(`/test/${id}`);
      return;
    }
    let score = 0;
    let correctnessArray: string[] = [];
    for (const question of testData.questions) {
      const userAnswer = answers[question.id];
      if (userAnswer && userAnswer === question.answer) {
        score = score + 1;
        correctnessArray.push("C");
      } else if (userAnswer && userAnswer !== question.answer && userAnswer !== "-") {
        correctnessArray.push("IC");
      } else {
        correctnessArray.push("-");
      }
    }

    const totalQuestions = testData.questions.length;
    const percentage = (score / totalQuestions) * 100;
    const status = percentage >= 70 ? "PASSED" : "FAILED";

    try {
      await axios.post(`/api/mentor/test/${id}/submitTest`, {
        userEmail: candidateData.email,
        userMobile: candidateData.mobile,
        userName: candidateData.name,
        score: percentage,
        status,
        testId: id,
        question_ids: finalQuestionIds,
        answers: finalAnswerArray,
        isCorrect: correctnessArray,
      });

      toast(`Test submitted successfully! You scored ${percentage}/(${totalQuestions * 10}) (${status})`);
      router.push("/thank-you");
    } catch (error) {
      setIsSubmitting(false)
      console.error("Error submitting result:", error);
      alert("Failed to submit result. Please try again.");
    }
  };

  const handleRunCode = async () => {
    setTestCaseRunning(true);
    if (!codingTestData) return;
    const question = codingTestData.technicalQuestions[currentQuestionIndex];
    if (!question) return;

    try {
      setTestResult(null);
      const res = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,
          testCases: question.sampleInput || []
        }),
      });
      const data = await res.json();
      console.log(data)
      if (data.error) {
        setGeneratedOutput(data.error);
        setTestResult({
          passed: 0,
          total: question.sampleInput.length,
        });
        return;
      }
      if (data.results) {
        setTestCaseRunning(false)
      }
      const outputs = data.results || [];
      let passedCount = 0;
      const outputStrings: string[] = [];

      let firstOutput = "";
      if (outputs[0]) {
        const out = outputs[0];
        if (typeof out === "object" && out !== null) {
          firstOutput = out.stdout || out.output || out.stderr || "";
        } else {
          firstOutput = String(out);
        }
      }

      outputs.forEach((out: any, idx: number) => {
        const expected = question.sampleOutput[idx]?.trim() || "";
        let actual = "";

        if (typeof out === "object" && out !== null) {
          actual = out.stdout ?? out.output ?? out.stderr ?? "";
        } else {
          actual = String(out);
        }

        outputStrings.push(actual);

        try {
          if (actual.trim() === expected.trim()) passedCount++;
        } catch {
          if (actual === expected) passedCount++;
        }
      });

      setGeneratedOutput(firstOutput);
      setTestResult({
        passed: passedCount,
        total: question.sampleInput.length,
      });
    } catch (err) {
      setTestCaseRunning(false)
      console.error("Error running code:", err);
      setGeneratedOutput("Error running code.");
      setTestResult({ passed: 0, total: question.sampleInput.length });
    }
  };

  const handleSubmitCode = () => {
    setConfirmPopup(false);
    if (!codingTestData) return;

    const question = codingTestData.technicalQuestions[currentQuestionIndex];
    if (!question) return;

    const updatedId = [...questionIdArray, String(question.id)];
    const updatedCode = [...answerArray, code];
    setQuestionIdArray(updatedId);
    setAnswerArray(updatedCode);

    if (testResult) {
      const updatedPassed = [...passedTestCasesArray, `${testResult.passed} / ${testResult.total}`];
      setPassedTestCasesArray(updatedPassed);

      const questionScore = (testResult.passed / testResult.total) * 100;
      setScore(prev => prev + questionScore);
    }
    setEnableNext(true);
  };

  const handleSubmitCodingTest = async () => {
    if (!codingTestData) return;

    const candidateData: CandidateInfo = JSON.parse(localStorage.getItem("candidateInfo") || "{}");
    if (!candidateData.name || !candidateData.email || !candidateData.mobile) {
      toast("Candidate info missing. Please re-enter the test.");
      router.push(`/test/${id}`);
      return;
    }

    const finalScore = Math.round(score / codingTestData.noOfQuestions);
    const status = finalScore >= 70 ? "PASSED" : "FAILED";

    try {
      await axios.post(`/api/mentor/test/${id}/submitTest`, {
        userEmail: candidateData.email,
        userMobile: candidateData.mobile,
        userName: candidateData.name,
        score: finalScore,
        status,
        testId: id,
        question_ids: questionIdArray,
        answers: answerArray,
        test_cases_passed: passedTestCasesArray,
      });

      toast(`Test submitted successfully! You scored ${finalScore}/ (${status})`);
      router.push("/thank-you");
    } catch (error) {
      console.error("Error submitting result:", error);
      alert("Failed to submit result. Please try again.");
    }
  };

  const handleNextQuestion = () => {
    if (!codingTestData) return;
    if (currentQuestionIndex < codingTestData.technicalQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCode("");
      setGeneratedOutput(null);
      setTestResult(null);
      setEnableNext(false)
    } else {
      handleSubmitCodingTest();
    }
  };

  if (loading) return <div className="p-10 text-center">Loading test...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {testData?.questions?.length && (
        <>
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
            <p className="mb-4 whitespace-pre-line">{testData.questions[currentQuestionIndex].question}</p>
            <div className="space-y-2">
              {testData.questions[currentQuestionIndex].options?.map((opt, index) => (
                <label
                  key={index}
                  className={`block p-2 border rounded cursor-pointer ${answers[testData.questions[currentQuestionIndex].id] === opt ? "bg-blue-100 border-blue-500" : ""
                    }`}
                >
                  <input
                    type="radio"
                    name={`q-${testData.questions[currentQuestionIndex].id}`}
                    value={opt}
                    checked={answers[testData.questions[currentQuestionIndex].id] === opt}
                    onChange={() => handleOptionSelect(testData.questions[currentQuestionIndex].id, opt)}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => handleNext(testData.questions[currentQuestionIndex].id)}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {currentQuestionIndex < testData.questions.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
        </>
      )}
      {codingTestData?.technicalQuestions?.length && (
        <>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">{codingTestData.name}</h1>
            <div className="text-red-600 font-bold">
              Time Left: {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
            </div>
          </div>
          <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            {(() => {
              const question =
                codingTestData.technicalQuestions[currentQuestionIndex];
              if (!question) return null;
              return (
                <div key={question.id}>
                  <h3>Question {currentQuestionIndex + 1} / {codingTestData.noOfQuestions}</h3>
                  <p>
                    <strong>Problem Statement:</strong> {question.problemStatement}
                  </p>
                  <p>
                    <strong>Constraints:</strong> {question.constraints}
                  </p>
                  {question.sampleInput && question.sampleOutput && (
                    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                      <p>
                        <strong>Sample Input:</strong> {question.sampleInput[0]}
                      </p>
                      <p>
                        <strong>Sample Output:</strong> {question.sampleOutput[0]}
                      </p>
                    </div>
                  )}
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="border p-2 rounded-md mt-2"
                  >
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                  </select>

                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Write your code here..."
                    style={{
                      width: "100%",
                      height: "200px",
                      marginTop: "10px",
                    }}
                  />

                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={handleRunCode}
                      disabled={enableNext}
                      className="px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-600 text-white disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
                    >
                      Run Code
                    </button>
                    <button
                      onClick={() => setConfirmPopup(true)}
                      disabled={enableNext}
                      className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
                    >
                      Submit Code
                    </button>
                    <button
                      onClick={handleNextQuestion}
                      disabled={!enableNext}
                      className={`px-4 py-2 rounded-md text-white transition-colors duration-300 bg-indigo-600 hover:bg-indigo-700 cursor-pointer disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed`}
                    >
                      {currentQuestionIndex < codingTestData.technicalQuestions.length - 1 ? "Next" : "Submit"}
                    </button>
                  </div>
                  {testCaserunning ? (<div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />) : (<div>
                    {testResult && (
                      <>
                        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                          <p>
                            <strong>Sample Input:</strong> {question.sampleInput[0]}
                          </p>
                          <p>
                            <strong>Sample Output:</strong> {question.sampleOutput[0]}
                          </p>
                          {generatedOutput !== null && (
                            <p>
                              <strong>Your Output:</strong> {generatedOutput}
                            </p>
                          )}
                        </div>
                        <div className="mt-3 text-green-600 font-bold">
                          {testResult.passed} / {testResult.total} Test Cases Passed
                        </div>
                      </>
                    )}
                  </div>)}
                </div>
              );
            })()}
          </div>
        </>
      )}

      {confirmPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Submission</h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to submit your code? <br />
              <span className="font-semibold text-red-500">This action cannot be undone.</span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmPopup(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitCode}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
