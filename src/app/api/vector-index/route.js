import { NextResponse } from "next/server";
import { spawn } from "child_process";

export async function POST(request) {
  await createVectorIndexWithPythonScript();

  return NextResponse.json(
    { message: "Vector index created" },
    {
      status: 201,
    }
  );
}

function createVectorIndexWithPythonScript() {
  const python = spawn("python3", ["./src/gpt/vector-index.py"]);
  return new Promise((resolve, reject) => {
    python.stdout.on("data", (data) => {});

    python.on("error", (error) => {
      console.log({ error });
    });

    python.on("close", (data) => {
      resolve();
    });
  });
}
