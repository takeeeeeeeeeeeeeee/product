import Janken,Aisatu,Enzan,Tenki,Kazuate

janken = Janken.Janken
enzan = Enzan.Enzan
tenki = Tenki.Tenki
kazuate = Kazuate.Kazuate

while True:
    try:
        print('===================')
        print('何をしますか？')
        print('1: じゃんけん')
        print('2: 計算')
        print('3: 天気')
        print('4: 数当て')
        print('9: 終了')
        print('===================')

        act = int(input('整数で番号を入力:'))

        if act == 1:
            janken.action()

        elif act == 2:
            enzan.action()
    
        elif act == 3:
            tenki.action()

        elif act == 4:
            kazuate.action()


        elif act == 9:
            print('さようなら',Aisatu.name,'さん。')
            break
        else:
            print('機能内の数値を入力してください。')
    except ValueError:
        print('整数と認識出来ません。')
