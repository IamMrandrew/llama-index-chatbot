export const QuestionServices = {
  createVectorIndex: async () => {
    const response = await fetch("/api/vector-index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  },
  askQuestion: async (question) => {
    const response = await fetch("/api/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });
    const data = await response.json();
    const answer = data.answer;

    return answer;
  },
};
