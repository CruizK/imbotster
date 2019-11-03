def generate_yml():
    questions = open("questionyquestions")
    train_data = open("train_data.yml","w")
    train_data.write("conversations:\n")
    for question in questions:
        question = "- - "+question
        train_data.write(question)
    questions.close()
    train_data.close()
generate_yml()
    