import random
import requests
from bs4 import BeautifulSoup

def get_name():
	URL = "https://www.name-generator.org.uk/quick/"
	r = requests.get(URL)
	soup = BeautifulSoup(r.content, 'html.parser')
	name = soup.find('div', class_='name_heading').text
	return name

def get_season():
	URL = "https://7esl.com/seasons-vocabulary"
	class_ = "ez-toc-section"
	r = requests.get(URL)
	soup = BeautifulSoup(r.content, 'html.parser')

	res = soup.find_all("div", class_="thecontent")[0].find_all("span", class_=class_)
	# print(res)
	return res[random.randint(1,len(res)-2)].text

def getHowAreYou():
	URL = "https://pairedlife.com/etiquette/Funny-and-Witty-Responses-to-the-Question-How-Are-You"
	r = requests.get(URL)
	soup = BeautifulSoup(r.content, 'html.parser')
	res = soup.find_all("div", class_="txtd")[random.randint(0,9)].find_all("li")
	# print('[' in res[18].text)
	random_tag = res[random.randint(0,len(res)-1)]
	while(len(random_tag.find_all())!=0 or '[' in random_tag.text):
		random_tag = res[random.randint(0,len(res)-1)]
	return random_tag.text

def get_surprise_me():
	URL = "http://meanttobehappy.com/50-things-you-dont-know-about-me-and-may-not-want-to/"
	r = requests.get(URL)	
	soup = BeautifulSoup(r.content, 'html.parser')
	res = soup.find("div", class_="post-entry clearfix").find_all("p")
	random_tag = res[random.randint(6,60)]
	while(len(random_tag.find_all())!=0 or '[' in random_tag.text and len(random_tag.text)!=0):
		random_tag = res[random.randint(0,len(res)-1)]
	return random_tag.text.split('.')[1]

def get_whatsup():
	URL = "https://funny.allwomenstalk.com/funny-replies-for-when-youre-asked-whats-up/"
	r = requests.get(URL)	
	soup = BeautifulSoup(r.content, 'html.parser')
	res = soup.find_all("h2", class_="body-h3")
	return res[random.randint(0,len(res)-1)].text[3:]


def get_likes():
	URL ="https://www.quora.com/What-are-the-20-things-you-like-to-do-the-most"
	r = requests.get(URL)	
	soup = BeautifulSoup(r.content, 'html.parser')
	res = soup.find_all("span", class_="ui_qtext_rendered_qtext")[2].find("ol").find_all("li")
	return res[random.randint(0,len(res)-1)].text

def get_response(tag):
	if(tag=='old'):
		return random.randint(10,52)
	elif(tag=='name'):
		return get_name()
	elif(tag=='season'):
		return get_season()
	elif(tag=="how-are-you"):
		return getHowAreYou()
	elif(tag=='surprise-me'):
		return get_surprise_me()
	elif(tag=='likes'):
		return get_likes()
	elif(tag=='sup'):
		return get_whatsup()
	URL = "https://www.thetoptens.com/" + tag
	class_ = "i"
	r = requests.get(URL)
	soup = BeautifulSoup(r.content, 'html.parser')

	res = soup.find_all("div", class_=class_)
	return res[random.randint(0,len(res)-1)].find('b').text

# get_response('name')
# get_response('beautiful-colours')	
# get_response('countries')
# get_response('top-ten-dream-jobs')
# get_response('season')
# get_response('best-movies')
# get_response('best-countries-take-holiday')
# get_response('overrated-jobs')
# get_response('fast-food-holiday-menu-items')
# get_response('best-restaurants')
# get_response('best-digital-camera-brands')
# get_response('best-social-media-sites')
# get_response('songs')
# get_response('popular-us-states')
# get_response('old')
# get_response('how-are-you')
# get_response('surprise-me')
# get_response('sup')
# get_response('likes')
# get_response('favorite-pizza-toppings')
# get_response('most-popular-celebrities')
