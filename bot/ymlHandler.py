def generate_yml():
    questions = open("questionyquestions")
    train_data = open("train_data.yml","w")
    train_data.write("conversations:\n")
    for question in questions:
        question = "- - "+question
        train_data.write(question)
    questions.close()
    train_data.close()
# generate_yml()

def generate_qDict():
    train_data = open("train_data.yml")
    qDict={}
    for i,statement in enumerate(train_data):
        if(i==0):
            continue
        if(statement[0:4]=="- - "):
            question = statement.replace("- - ","").replace("\n","")
            qDict[question] =[]
        else:
            answer = statement.replace("- ","").replace("\n","")
            qDict[question].append(answer)
    train_data.close()
    return qDict

def write_qDict(questionDict):
    train_data = open("train_data.yml","w")
    train_data.write("conversations:\n")
    for question in questionDict:
        answerList = questionDict[question]
        question = "- - "+question+"\n"
        train_data.write(question)
        for answer in answerList:
            answer = "- "+answer+"\n"
            train_data.write(answer)
    train_data.close()