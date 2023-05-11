"use client";

import {
  Box,
  AbsoluteCenter,
  VStack,
  Button,
  Textarea,
  Text,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { QuestionServices } from "@/services/QuestionServices";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [isAsked, setIsAsked] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    QuestionServices.createVectorIndex();
  }, []);

  const questionHandler = async () => {
    setIsAsked(false);
    setIsThinking(true);

    const answer = await QuestionServices.askQuestion(question);
    setAnswer(answer);
    setIsAsked(true);
    setIsThinking(false);
  };

  return (
    <main>
      <Box position="relative" h="100vh">
        <AbsoluteCenter axis="both" w="100%" p="32px">
          <QuestionStack
            question={question}
            setQuestion={setQuestion}
            questionHandler={questionHandler}
            isThinking={isThinking}
          />
          {isAsked && <AnswerStack answer={answer} />}
        </AbsoluteCenter>
      </Box>
    </main>
  );
}

function QuestionStack({ question, setQuestion, questionHandler, isThinking }) {
  const handleQuestionChange = (event) => setQuestion(event.target.value);

  return (
    <Center>
      <VStack spacing={2} w={["100%", "960px"]}>
        <Textarea
          variant="filled"
          placeholder="Ask a question"
          w="100%"
          value={question}
          onChange={handleQuestionChange}
        />
        <Button
          isLoading={isThinking}
          colorScheme="teal"
          variant="solid"
          w="100%"
          onClick={questionHandler}
        >
          Send
        </Button>
      </VStack>
    </Center>
  );
}

function AnswerStack({ answer }) {
  return (
    <Center pt="32px">
      <Text fontSize="lg" w={["100%", "960px"]}>
        🤖: {answer}
      </Text>
    </Center>
  );
}
