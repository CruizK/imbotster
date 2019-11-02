from webscraper import get_response
f = open("/home/jaideep/Desktop/HackSI/Imbotster_repo/imbotster/bot/questionyquestions")
qno = -1

qlist=[]

for i,statement in enumerate(f):
  qlist.append(statement.replace("\n",""))
  print(i,":",statement)
print("\n\nChoose a menu option: ")

Tags = ['name', 'beautiful-colours', 'countries', 'top-ten-dream-jobs', 'season', 'best-movies', 'best-countries-take-holiday', 'overrated-jobs', 'fast-food-holiday-menu-items', 'best-restaurants', 'best-digital-camera-brands', 'best-social-media-sites', 'songs', 'popular-us-states', 'old', 'how-are-you', 'surprise-me', 'sup', 'likes', 'favorite-pizza-toppings', 'most-popular-celebrities']

while True:
  try:
      qno = int(input())
      ans = get_response(Tags[qno])
      print(ans)

  # Press ctrl-c or ctrl-d on the keyboard to exit
  except (KeyboardInterrupt, EOFError, SystemExit):
      break
