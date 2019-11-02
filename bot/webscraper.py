import requests
from bs4 import BeautifulSoup

def get_name():
	URL = "https://www.name-generator.org.uk/quick/"
	r = requests.get(URL)
	soup = BeautifulSoup(r.content, 'html5lib')

	name = soup.find('div', attrs = {'class': 'name_heading'}).text
	return name


def get_response(tag):
	URL = "https://www.thetoptens.com/lists/" + tag

	r = requests.get(URL);
	soup = BeautifulSoup(r.content, 'html5lib')

	res = soup.find('div', attrs = {'class': 'listgrid'}).