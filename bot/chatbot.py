from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from chatterbot.trainers import ChatterBotCorpusTrainer
from webscraper import get_response
import random
import ruamel.yaml

bot = ChatBot(
	'Terminal',
	storage_adapter='chatterbot.storage.SQLStorageAdapter',
	database_uri='sqlite:///database.db'
	)

corpus_trainer = ChatterBotCorpusTrainer(bot)
corpus_trainer.train('train_data')

questions = ["What's your name?", "What's your favorite color?", 'Where are you from?', 'What do you like to do?', "What's your favorite season?", "What's your favorite movie?", 'Where is the most interesting place you’ve been?', "What's your dream job?", 'What is your favorite food?', 'What is your favorite fast food restaurants?', 'What is your favorite camera brand?', 'what is your favorite social media?', "What's your favorite song?", 'Where would you most like to travel to?', 'How old are you?', 'How are you?', "What's something most people don's know about you?", "What's up?", 'What do you like?', 'Best pizza toppings?', 'Who is your favorite person?']

print('SPEAK SPEAK SPEAK SPEAK SPEAK')

# The following loop will execute each time the user enters input
while True:
    try:
        user_input = questions[random.randint(0,20)]
        print ("Q:",user_input)
        bot_response = bot.get_response(user_input)

        print("A:",bot_response)

    # Press ctrl-c or ctrl-d on the keyboard to exit
    except (KeyboardInterrupt, EOFError, SystemExit):
        break

