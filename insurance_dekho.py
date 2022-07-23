import bs4
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import requests

url = "https://www.insurancedekho.com/companies"

option = webdriver.ChromeOptions()
# option.add_argument('headless')
driver = webdriver.Chrome("E:\\hackrx3\\chromedriver.exe",options=option)
driver.get(url)
companiesdiv = driver.find_element(By.CLASS_NAME, "popularInsurerMiddle")
soup = BeautifulSoup(companiesdiv.get_attribute("innerHTML"), "html.parser")
driver.quit()
companiesUl = soup.find("ul")
print(companiesUl.contents)
companiesList = companiesUl.find_all("span", class_="insurerName")
companiesUrl = []
for insurer in companiesList:
    href = insurer.find("a")
    companiesUrl.append(href['href'])

url = "https://www.insurancedekho.com/companies/bajaj-allianz/user-reviews"
driver.get(url)

