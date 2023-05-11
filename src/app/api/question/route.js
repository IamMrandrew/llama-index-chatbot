import { NextResponse } from "next/server";
import { spawn } from "child_process";

export async function POST(request) {
  const body = await request.json();
  const { question } = body;

  const answer = await execGPTPythonScript(question);

  return NextResponse.json({ answer: JSON.stringify(answer) });
}

function execGPTPythonScript(question) {
  let answer = "";
  const python = spawn("python3", ["./src/gpt/question.py", `"${question}"`]);
  return new Promise((resolve, reject) => {
    python.stdout.on("data", (data) => {
      answer += data.toString().trim();
    });

    python.on("error", (error) => {
      console.log({ error });
    });

    python.on("close", (data) => {
      resolve(answer);
    });
  });
}
