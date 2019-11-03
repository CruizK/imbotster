from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from chatterbot.trainers import ChatterBotCorpusTrainer
from webscraper import get_response

bot = ChatBot(
	'Terminal',
	logic_adapters=[
        "own_adapter.MyLogicAdapter"
    ]
	)

corpus_trainer = ChatterBotCorpusTrainer(bot)
corpus_trainer.train()


print('SPEAK SPEAK SPEAK SPEAK SPEAK')

# The following loop will execute each time the user enters input
while True:
    try:
        user_input = input()

        bot_response = bot.get_response(user_input)

        print(bot_response)

    # Press ctrl-c or ctrl-d on the keyboard to exit
    except (KeyboardInterrupt, EOFError, SystemExit):
        break

