# 数当てゲーム
class Kazuate():
    def action():
        import random

        MAX = 1000                  # 当てさせる最大値
        MAX_STAGE = 10              # 入力できる最大回数
        print('1～{}の数を{}回以内で当ててください。'.format(MAX, MAX_STAGE))

        stage = 1
        answer = random.randint(1, MAX)

        while stage <= MAX_STAGE:
            print(stage, '回目 いくつかな：', end='')
            n = int(input())

            if n < 1 or n > MAX:    # 範囲外の値はやり直し
                continue

            if n == answer:         # 正解
                print('正解。', stage, '回で当たりました。')
                break
            elif n > answer:
                print('もっと小さな数です。')
            else:
                print('もっと大きな数です。')

            stage += 1

        else:
            print('残念。正解は', answer, 'でした。')
