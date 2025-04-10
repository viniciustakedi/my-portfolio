import { useEffect, useRef, useState } from "react";
import { currentQuestionContentAtom, isQuizLoadingAtom, quizContentAtom } from "@/contexts/quizzes";
import { findQuizById, getQuestionById } from "@/services/get";
import { replyQuizQuestion } from "@/services/patch";
import { enqueueSnackbar } from "notistack";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import Image from "next/image";

export default function QuizQuestions() {
  const [currentQuestion, setCurrentQuestion] = useAtom(currentQuestionContentAtom);
  const [isQuizLoading, setIsQuizLoading] = useAtom(isQuizLoadingAtom);
  const [quizContent, setQuizContent] = useAtom(quizContentAtom);

  const [countDownValue, setCountDownValue] = useState<number>(3);
  const [isCountDownActive, setIsCountDownActive] = useState<boolean>(true);

  useEffect(() => {
    Promise.resolve().then(async () => {
      await getQuiz();
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDownValue((prevCount) => prevCount - 1);
    }, 1000);

    if (quizContent.questionsAnswers.length > 0) {
      setIsCountDownActive(false);
      clearInterval(interval);
      return;
    }

    if (countDownValue === -1) {
      setIsCountDownActive(false);
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [countDownValue]);


  const getQuiz = async () => {
    const quizId = localStorage.getItem('quizId');
    if (quizId) {
      const quiz = await findQuizById(quizId);
      if (quiz.statusCode === 200) {
        setQuizContent(quiz.data);

        if (!quiz.data.isFinished) {
          await getQuestion(quiz.data.currentQuestion);
        }
      } else {
        localStorage.removeItem('quizId');
      }
    }
  }

  const getQuestion = async (questionId: string) => {
    const question = await getQuestionById(questionId);

    if (question.statusCode === 200) {
      setCurrentQuestion(question.data);
    } else {
      enqueueSnackbar('Erro ao carregar pergunta!', { variant: 'error' });
    }
  }

  const replyQuestion = async (optionId: string) => {
    setIsQuizLoading(true);
    const sendReply = await replyQuizQuestion(quizContent._id, currentQuestion._id, optionId);

    if (sendReply.statusCode === 200) {
      enqueueSnackbar('Resposta enviada!', { variant: 'success' });
    } else {
      enqueueSnackbar('Erro ao responder pergunta!', { variant: 'error' });
    }

    await getQuiz();
    setIsQuizLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
      {(
        isCountDownActive && (
          <motion.h1
            className="text-6xl font-bold text-white font-italic"
            key={countDownValue}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                opacity: 0,
                y: -50
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.15
                }
              }
            }}
          >
            {countDownValue === 0 ? 'GO!' : countDownValue}
          </motion.h1>
        )
      )}
      {(
        !isCountDownActive && (
          <>
            <div className="lg:w-4/6 md=:w-5/6 w-full">
              <div className="relative w-full flex mt-8 items-center rounded-md flex-col bg-black">
                <Image
                  src={currentQuestion.thumbnail}
                  alt="question-thumbnail"
                  className="opacity-20 rounded-md object-cover w-full h-96"
                  width={500}
                  height={250}
                />
                <h1 className="absolute lg:top-1/2 md:top-1/2 top-14 lg:text-2xl md:text-2x1 text-lg text-center font-bold" >{currentQuestion.question}</h1>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4 mt-4 w-full">
                {(
                  currentQuestion.options.map((option) => (
                    <button
                      key={option._id}
                      className="bg-blue rounded-md px-4 py-6 text-white w-full font-medium hover:bg-dark-blue transition-all"
                      onClick={() => replyQuestion(option._id)}
                    >
                      {option.value}
                    </button>
                  ))
                )}
              </div>
            </div>
          </>
        )
      )}
    </div>
  )
}
