#datetimeで日付と時刻を表す
import datetime
date = datetime.datetime.now()

name = input('名前を入力してください。:')
#datetimeから時刻のみ抜き出して処理
if 5 <= date.hour <= 10:
    print(name,'さんおはようございます！')
elif 11 <= date.hour <= 18:
    print(name,'さんこんにちは！')
elif 19 <= date.hour <= 4:
    print(name,'さんこんばんは！')
