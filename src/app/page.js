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
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [isAsked, setIsAsked] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  return (
    <main>
      <Box position="relative" h="100vh">
        <AbsoluteCenter axis="both" w="100%" p="32px">
          <Center>
            <VStack spacing={2} w={["100%", "960px"]}>
              <Textarea
                variant="filled"
                placeholder="Ask a question"
                w="100%"
                value={question}
              />
              <Button
                isLoading={isThinking}
                colorScheme="teal"
                variant="solid"
                w="100%"
              >
                Send
              </Button>
            </VStack>
          </Center>
          {isAsked && (
            <Center pt="32px">
              <Text fontSize="lg" w={["100%", "1096px"]}>
                🤖: {answer}
              </Text>
            </Center>
          )}
        </AbsoluteCenter>
      </Box>
    </main>
  );
}
