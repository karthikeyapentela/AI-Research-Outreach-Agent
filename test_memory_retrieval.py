from memory import (
    get_good_examples,
    get_recent_corrections,
    get_relevant_examples
)

print("GOOD EXAMPLES")
print(get_good_examples())

print("\nCORRECTIONS")
print(get_recent_corrections())

print("\nRELEVANT EXAMPLES")
print(
    get_relevant_examples(
        "battery recycling startup in India"
    )
)