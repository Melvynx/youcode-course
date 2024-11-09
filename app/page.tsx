import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { CircleDollarSign, PencilLine, Rocket, Star } from "lucide-react";
import Link from "next/link";

const FAQValues = [
  {
    question: "What are the limits for course creation on YouCode?",
    answer:
      "With YouCode, the only limits are your creativity and the content you are legally allowed to share. There are no restrictions on the number of courses or lessons you can create.",
  },
  {
    question: "Can I integrate quizzes or exercises into my YouCode courses?",
    answer:
      "Absolutely! YouCode supports the integration of various types of interactive activities like quizzes, coding exercises, and more.",
  },
  {
    question: "How does YouCode ensure the quality of the courses offered?",
    answer:
      "We have a dedicated team for quality assurance of courses. Moreover, the YouCode community can leave reviews and report inappropriate content.",
  },
  {
    question: "Does YouCode offer tracking tools for course creators?",
    answer:
      "Yes, we provide detailed analytics so you can monitor your students' progress and engagement with your courses.",
  },
  {
    question: "Can I customize the appearance of my courses on YouCode?",
    answer:
      "Yes, YouCode offers customization options so you can align the look of your courses with your brand or personal preferences.",
  },
  {
    question:
      "What support does YouCode provide to content creators in case of issues?",
    answer:
      "We have a responsive support team that can be contacted directly via our platform for any technical issues or questions.",
  },
];

export default async function Home() {
  await prisma.course.findMany({
    include: {
      lessons: {
        include: {
          users: true,
        },
      },
    },
  });

  return (
    <div>
      {/* HERO */}
      <div className="m-auto my-8 flex max-w-6xl flex-col gap-4 px-6 lg:my-16 lg:flex-row xl:my-24 xl:gap-8">
        <div className="flex flex-1 flex-col gap-4 lg:gap-6">
          <h1 className="bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-6xl font-extrabold text-transparent">
            Create courses in seconds
          </h1>
          <h2 className="text-2xl font-bold">
            YouCode is the YouTube of education. You will create online courses
            in seconds.
          </h2>
          <div className="flex items-center gap-8">
            <div className="flex">
              {Array.from({ length: 8 }).map((_, i) => (
                <Avatar key={i} className="-mr-4">
                  <AvatarFallback>{i + 1}</AvatarFallback>
                  <AvatarImage src={`/images/review/${(i % 4) + 1}.png`} />
                </Avatar>
              ))}
            </div>
            <div className="flex flex-col gap-0.5 text-yellow-500 dark:text-yellow-400">
              <p className="whitespace-nowrap  font-extrabold">
                +500 teachers trust us.
              </p>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={32} fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/HvgVzQPAoNg"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
      {/* VALUES */}
      <div className="bg-primary py-8 text-primary-foreground xl:py-16">
        <div className="m-auto flex max-w-5xl flex-col gap-3 px-6 xl:flex-row xl:gap-6">
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <PencilLine size={32} />
            <Typography variant="h3">MDX Based</Typography>
            <Typography variant="large">
              YouCode is based on MDX. You can write your courses in Markdown
              and React.
            </Typography>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <CircleDollarSign size={32} />
            <Typography variant="h3">Free to use</Typography>
            <Typography variant="large">
              You want to publish your courses for free? YouCode is free to use.
            </Typography>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <Rocket size={32} />
            <Typography variant="h3">NextReact project</Typography>
            <Typography variant="large">
              Re-build this app from scratch in{" "}
              <Link
                href="https://codelynx.dev/nextreact/courses"
                className="underline"
              >
                NextReact
              </Link>
            </Typography>
          </div>
        </div>
      </div>
      {/* CTA */}
      <div className="my-8 flex flex-col items-center gap-4 lg:my-16 xl:my-24">
        <h2 className="bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-4xl font-extrabold text-transparent">
          Start building your course today
        </h2>
        <Link
          href="/admin/courses/new"
          className={cn(buttonVariants(), "px-6 py-8 text-xl font-bold")}
        >
          BUILD YOUR FIRST COURSE
        </Link>
      </div>
      {/* FAQ */}
      <div
        className="bg-secondary py-8 text-secondary-foreground xl:py-16"
        style={{
          // @ts-ignore
          "--border": "240 3.7% 25%",
        }}
      >
        <div className="m-auto flex max-w-5xl flex-col gap-3 px-6 xl:gap-6">
          <h2 className="text-4xl font-extrabold">FAQ</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQValues.map((value, i) => (
              <AccordionItem value={i + value.question} key={i}>
                <AccordionTrigger>{value.question}</AccordionTrigger>
                <AccordionContent>{value.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      {/* CTA */}
      <div className="my-8 flex flex-col items-center gap-4 lg:my-16 xl:my-24">
        <h2 className="bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-4xl font-extrabold text-transparent">
          Try it ! It's free
        </h2>
        <Link
          href="/admin/courses/new"
          className={cn(buttonVariants(), "px-6 py-8 text-xl font-bold")}
        >
          BUILD YOUR FIRST COURSE
        </Link>
      </div>
      <div className="my-8 flex flex-col items-center gap-4 lg:my-16 xl:my-24">
        <Link
          href="https://codelynx.dev/nextreact/courses"
          className="text-xl font-bold underline"
        >
          Clique ici pour suivre une Formation NextJS gratuite et de qualité 🚀
        </Link>
      </div>
    </div>
  );
}
