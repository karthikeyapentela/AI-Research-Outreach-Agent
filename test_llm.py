from llm_client import ask_llm

response = ask_llm(
    "Reply with exactly: My OpenRouter setup works!"
)

print("\nOpenRouter replied:\n")
print(response)