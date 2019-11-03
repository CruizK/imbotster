from webscraper import get_response
from ymlHandler import write_qDict
from ymlHandler import generate_qDict

qlist=[]
qDict=generate_qDict()
i=0
for question in qDict:
    qlist.append(question)
    print(i+1,":",question)
    i=i+1

print("\n\nChoose a menu option: ")

Tags = ['name', 'beautiful-colours', 'countries', 'top-ten-dream-jobs', 'season', 'best-movies', 'best-countries-take-holiday', 'overrated-jobs', 'fast-food-holiday-menu-items', 'best-restaurants', 'best-digital-camera-brands', 'best-social-media-sites', 'songs', 'popular-us-states', 'old', 'how-are-you', 'surprise-me', 'sup', 'likes', 'favorite-pizza-toppings', 'most-popular-celebrities']
while True:
  try:
      qno = int(input())
      if(qno==-1):
          write_qDict(qDict)
          break
      print(qlist[qno-1])
      ans = input()
      qDict[qlist[qno-1]].append(ans)
      print(qDict[qlist[qno-1]])
      print("Enter another question number. Or Ctrl C to exit")
  # Press ctrl-c or ctrl-d on the keyboard to exit
  except (KeyboardInterrupt, EOFError, SystemExit):
      break
