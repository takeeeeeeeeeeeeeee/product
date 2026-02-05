#計算を行う
#例外処理
class Enzan():
    def action():
        try:
            print('計算を行います。')
            a = int(input('aの値を整数で入力してください。:'))
            b = int(input('bの値を整数で入力してください。:'))

            print( 'a + b =',a+b)  
            print('a - b =',a-b)
            print('a × b =',a*b)  
            print('a ÷ b',a/b)   
            print('a ÷ bの余り',a % b) 
            print('aのb乗',a ** b)
            
        except ValueError:
            print('整数と認識出来ません。')
        except ZeroDivisionError:
            print('ゼロによる除算')
        else:
            print('正常終了')
        finally:
            print('お疲れ様でした。')
