import Head from "next/head";
import { ButtonsChangeQuestion, ReviewContent } from "@/components/page-components/quiz/review";
import { useAtom } from "jotai";
import { quizContentAtom } from "@/contexts/quizzes";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function QuizReviewQuestions() {
  const [quizContent, setQuizContent] = useAtom(quizContentAtom);
  const route = useRouter();

  useEffect(() => {
    if (!quizContent.isFinished) {
      route.push('/quiz');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Quiz Review • Takedi</title>
        <meta
          name="description"
          content="Quiz de programação para você se divertir e treinar seus conhecimentos. Página de revisão."
          key="desc"
        />
      </Head>
      <main className="flex justify-center items-center flex-col w-full min-h-screen bg-gradient-to-r from-dark-black to-dark-blue">
        <ReviewContent />
        <ButtonsChangeQuestion />
      </main>
    </>
  )
}
