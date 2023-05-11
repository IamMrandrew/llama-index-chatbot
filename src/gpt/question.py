from llama_index import SimpleDirectoryReader, SimpleWebPageReader, GPTListIndex, GPTVectorStoreIndex, LLMPredictor, PromptHelper, ServiceContext, StorageContext, load_index_from_storage
from langchain import OpenAI
import sys
import os
import json
import time
from dotenv import load_dotenv
load_dotenv()

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

def answer(question):
    # Rebuild storage context from directory
    storage_context = StorageContext.from_defaults(persist_dir="./src/gpt/vector_index")

    # Load index from storage context
    index = load_index_from_storage(storage_context)
    query_engine = index.as_query_engine()
    
    return query_engine.query(question)

response = answer(sys.argv[1])
print(response)