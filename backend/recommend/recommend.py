from reco_data import reco_data
from reco_def import reco_simple 
from reco_def import reco_cosine
import pandas as pd
import numpy as np

# reco_data 실행하고 data에 저장
data = reco_data()
df_ing_reco, df_ing_effect, df_ing, df_product, df_review, df_user = data.get_data()

# class reco_simple():
#     def recommend(user_data):
# 사용할 유저 정보 저장
user = '더무아'
user_data = {
    '나이': df_user[df_user['user_nm']==user]['user_age_group'].values[0],
    '성별': df_user[df_user['user_nm']==user]['user_sex'].values[0],
    '피부타입': df_user[df_user['user_nm']==user]['skin_type'].values[0]
}

simple = reco_simple.recommend(user_data)
cosine = reco_cosine.recommend_cosine(user)

# 단순 추천 최고점 화장품 중 랜덤 한개
simple_reco = simple[simple == max(simple)]
ran_simple = simple_reco.loc[np.random.choice(simple_reco.index, size=1, replace=False)]

# 협업 필터링 최고점 화장품 중 랜덤 네개
cos_reco = cosine[cosine == max(cosine)]
if len(cos_reco) > 4 :
    temp = np.random.choice(cos_reco.index, size=4, replace = False)
else:
    # 4개 미만일 경우 모두 선택
    temp = cos_reco.index
ran_cos = cos_reco.loc[temp]

final_reco = pd.concat([ran_cos, ran_simple])
print(final_reco)

# print(simple)
# print(cosine)
