from llama_index import SimpleDirectoryReader, SimpleWebPageReader, GPTListIndex, GPTVectorStoreIndex, LLMPredictor, PromptHelper, ServiceContext, StorageContext, load_index_from_storage
from langchain import OpenAI
import sys
import os
import json
from dotenv import load_dotenv
load_dotenv()

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

def createVectorStoreIndex(directory):
    # Maximum input size
    max_input_size = 4096
    # Number of output tokens
    num_output = 256
    # Maximum chunk overlap
    max_chunk_overlap = 20
    chunk_size_limit = 600

    prompt_helper = PromptHelper(max_input_size, num_output, max_chunk_overlap, chunk_size_limit=chunk_size_limit)

    # Define LLM (Language Model)
    llm_predictor = LLMPredictor(llm=OpenAI(temperature=0, model_name="text-ada-001", max_tokens=num_output))
    service_context = ServiceContext.from_defaults(llm_predictor, prompt_helper)

    # Load data
    documents = SimpleDirectoryReader(directory).load_data()

    # Create vector index
    index = GPTVectorStoreIndex.from_documents(documents, service_context=service_context)

    # Store storage context in directory
    index.storage_context.persist(persist_dir="./src/gpt/vector_index")

    return index

createVectorStoreIndex("./src/gpt/data")