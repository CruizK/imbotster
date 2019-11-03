from chatterbot.logic import LogicAdapter
from ymlHandler import generate_yml_from_db

class MyLogicAdapter(LogicAdapter):
    myAnswerDict = {}

    def __init__(self, chatbot, **kwargs):
        super().__init__(chatbot, **kwargs)


    def can_process(self, statement):
        True

    def process(self, input_statement, additional_response_selection_parameters):
        import random

        # Randomly select a confidence between 0 and 1
        confidence = 1
        print(input_statement)
        # For this example, we will just return the input as output
        selected_statement = self.getRandomAnswer(input_statement)
        selected_statement.confidence = confidence  
        print(selected_statement)
        return selected_statement
    
    def getRandomAnswer(self,question):
        if not myAnswerDict:
            myAnswerDict = generate_yml_from_db()
        return myAnswerDict[question][1]