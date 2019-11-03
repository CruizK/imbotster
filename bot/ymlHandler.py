import sqlite3

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
            qDict[question].append(str(answer.replace(": ","-")))
    train_data.close()
    return qDict
def write_qDict(answerDict):
    train_data = open("train_data.yml","w")
    train_data.write("conversations:\n")
    for question in answerDict:
        answerList = answerDict[question]
        question = "- - "+question+"\n"
        for answer in answerList:
            answer = str(answer).replace(": ","-")
            if("old" in question):
                answer = "\""+answer+"\""
            answer = "  - "+answer+"\n"
            train_data.write(question)
            train_data.write(answer)
    train_data.close()

def generate_yml_from_db():
    qList = []

    conn = None
    try:
        conn = sqlite3.connect('../server/database.db')
    except Error as e:
        print(e)

    cursor = conn.cursor()
    cursor.execute("SELECT questionText FROM questions")

    rows = cursor.fetchall()

    for row in rows:
        qList.append(row[0])
    print(qList)
    '''cursor.execute("SELECT question_id,answerText FROM answers order by question_id")

    rows = cursor.fetchall()
    answerDict = {}
    for row in rows:
        if(qList[row[0]-1] in answerDict):
            answerDict[qList[row[0]-1]].append(row[1])
        else:
            answerDict[qList[row[0]-1]] = [row[1]]
    write_qDict(answerDict)'''    

generate_yml_from_db()

