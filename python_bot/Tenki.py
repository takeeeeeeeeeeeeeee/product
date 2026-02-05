#webスクレイピングをするためにreqestsとbs4を使用
class Tenki():
    def action():
        import requests
        from bs4 import BeautifulSoup
        #AreaCodeで地域の選択
        def GetYahooWeather(AreaCode):

            url = 'https://weather.yahoo.co.jp/weather/jp/12/4510.html'
            r = requests.get(url)
            soup = BeautifulSoup(r.text, 'html.parser')
            rs = soup.find(class_='forecastCity')
            rs = [i.strip() for i in rs.text.splitlines()]
            rs = [i for i in rs if i != ""]
            return print('[千葉県]\n', rs[0] , 'の天気は' , rs[1], '\n', rs[18] ,'の天気は' , rs[19] , 'です。')

        GetYahooWeather('4510')