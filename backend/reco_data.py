import pandas as pd
import os

# 현재 파일의 디렉토리 경로
path = os.path.dirname(os.path.abspath(__file__))

class reco_data:
    
    def __init__(self):
        # 추천 성분 파일 읽어오기
        self.df_ing_reco = pd.read_csv(f'{path}/data/ing_reco.csv', encoding='utf-8')
        self.df_ing_reco = self.df_ing_reco.drop(columns=['Unnamed: 0'])
        # print(self.df_ing_reco)

        # 성분-효과 파일 읽어오기
        self.df_ing_effect = pd.read_csv(f'{path}/data/ing_effect.csv', encoding='utf-8')
        # print('2 :',self.df_ing_effect)

        # 실제 화장품 성분 읽어오기
        self.df_ing = pd.read_csv(f'{path}/data/result_ingredient.csv', encoding='utf-8')
        self.df_ing= self.df_ing.drop(columns = ['ing_idx', 'eng_name', 'score', 'use',
                                    'risk_none', 'risk_low', 'risk_medium', 'risk_high'])
        # print('3 :',self.df_ing)

        # 화장품 데이터
        self.df_product = pd.read_csv(f'{path}/data/result_product.csv', encoding='utf-8')
        # print('4 :',self.df_product)

        # 리뷰 파일 읽어오기
        self.df_review = pd.read_csv(f'{path}/data/result_review_all.csv', encoding='utf-8')
        self.df_review = self.df_review.drop(columns = ['review_idx', 'user_age','review'])
        # print('5 :',self.df_review)

        # users 파일 읽어오기
        self.df_user = pd.read_csv(f'{path}/data/result_users.csv', encoding='utf-8')
        # df_user = df_user.drop(columns = ['user_id', 'user_pw', 'user_name', 'user_email', 'user_address'])
        # print('6 :',self.df_user)

        # 나이 -> 연령대 변경
        def categorize_age(age):
            if age < 20:
                return '미성년자'
            elif 20 <= age < 30:
                return '20대'
            elif 30 <= age < 40:
                return '30대'
            elif 40 <= age < 50:
                return '40대'
            else:
                return '50대 이상'
        self.df_user['user_age_group'] = self.df_user['user_age'].apply(categorize_age)

        # 사용할 유저 정보 저장
        self.user = '더무아'
        self.user_data = {
            '나이': self.df_user[self.df_user['user_nm']==self.user]['user_age_group'].values[0],
            '성별': self.df_user[self.df_user['user_nm']==self.user]['user_sex'].values[0],
            '피부타입': self.df_user[self.df_user['user_nm']==self.user]['skin_type'].values[0]
        }
        # print('user : ', self.user)

    def get_data(self):
        # print('user : ', self.user)
        return self.df_ing_reco, self.df_ing_effect, self.df_ing, self.df_product, self.df_review, self.df_user
    # , self.user, self.user_data
    # print('user : ', __init__, get_data)

    # def test():
        
    #     # os.path.join(base_dir, 'data', 'ing_reco.csv')
    #     a = pd.read_csv(f'{path}/data/ing_reco.csv', encoding='utf-8')
    #     print(a)

    # test()





