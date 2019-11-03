from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from chatterbot.trainers import ChatterBotCorpusTrainer
from webscraper import get_response
import ruamel.yaml

with open('train_data') as f:

	bot = ChatBot(
		'Terminal',
		storage_adapter='chatterbot.storage.SQLStorageAdapter',
		database_uri='sqlite:///database.db'
		)

	corpus_trainer = ChatterBotCorpusTrainer(bot)
	corpus_trainer.train(f.name.split(".")[0])

	def add_answer(question, answer):
		yaml = ruamel.yaml.YAML()
		text = yaml.load(f)
		text[question].append(answer)

	def get_answer():


# print('SPEAK SPEAK SPEAK SPEAK SPEAK')

# # The following loop will execute each time the user enters input
# while True:
#     try:
#         user_input = input()

#         bot_response = bot.get_response(user_input)

#         print(bot_response)

#     # Press ctrl-c or ctrl-d on the keyboard to exit
#     except (KeyboardInterrupt, EOFError, SystemExit):
#         break

