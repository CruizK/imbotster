from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from chatterbot.trainers import ChatterBotCorpusTrainer
from webscraper import get_response

# Create a new instance of a ChatBot
bot = ChatBot(
    'Terminal',
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    database_uri='sqlite:///database.db'
)

# #Populate corpus
# def build_corpus(file):
#     qlist=[]
#     Tags = ['name', 'beautiful-colours', 'countries', 'top-ten-dream-jobs', 'season', 'best-movies', 'best-countries-take-holiday', 'overrated-jobs', 'fast-food-holiday-menu-items', 'best-restaurants', 'best-digital-camera-brands', 'best-social-media-sites', 'songs', 'popular-us-states', 'old', 'how-are-you', 'surprise-me', 'sup', 'likes', 'favorite-pizza-toppings', 'most-popular-celebrities']
    
#     with open('questionyquestions') as f:
#         # for question in f:
#         #     qlist.append(statement.replace("\n",""))

# #Train bot on game corpus
# def train():
#     with open('game_corpus.yml', 'r+') as f:
#         def build_corpus(f)
#         corpus_trainer = ChatterBotCorpusTrainer(bot)
#         corpus_trainer.train('game_corpus')

corpus_trainer = ChatterBotCorpusTrainer(bot)
# # corpus_trainer.train('chatterbot.corpus.english.greetings')
# # trainer = ListTrainer(bot)

corpus_trainer.train('test')


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