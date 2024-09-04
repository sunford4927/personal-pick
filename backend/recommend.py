from flask_restx import Resource
from flask import request, jsonify
# from db_utils import PostQuery, setQuery

# import reco_data
from reco_data import reco_data
from reco_def import reco_simple 
from reco_def import reco_cosine
import pandas as pd
import numpy as np

data = reco_data()
df_ing_reco, df_ing_effect, df_ing, df_product, df_review, df_user = data.get_data()
# reco_data 실행하고 data에 저장
# class ppAddressList(Resource):
#     def get(self):
#         value = request.args.to_dict()
#         user_id = value['userid']

#         data = setQuery(""" SELECT * FROM result_address
#                             where user_id = %s""", user_id)

#         return jsonify(data)

class abc(Resource):
    # print(df_ing_effect)
    def get(self):
        # return 0
        # print('recommend  121314')
        user = request.args.get('user_nm')
        # user = 'hiinaa'
        # user = self
        # user_age = request.args.get('user_age')
        # user_sex = request.args.get('user_sex')
        # skin_type = request.args.get('skin_type')
        # print('user_nm : ', user)
        # print('user_age : ',user_age)
        # print('user_sex : ',user_sex)
        # print('skin_type : ',skin_type)
        user_data = {
            '나이': df_user[df_user['user_nm']==user]['user_age_group'].values[0],
            '성별': df_user[df_user['user_nm']==user]['user_sex'].values[0],
            '피부타입': df_user[df_user['user_nm']==user]['skin_type'].values[0]
        }
        print('user_nm : ', user)
        print('user_data : ', user_data)

        # simple = reco_simple.get(user_data)
        # print('simple : ', simple)
        # cosine = reco_cosine.get(user)
        # print('cosine : ', cosine)

        # 단순 추천 최고점 화장품 중 랜덤 한개
        # simple_reco = simple[simple == max(simple)]
        # print('simple_reco : ', simple_reco)

        # 협업 필터링 최고점 화장품 중 랜덤 네개
        # cos_reco = cosine[cosine == max(cosine)]
        # print('cos_reco : ', cos_reco)
        # if len(cos_reco) > 4 :
        #     temp = np.random.choice(cos_reco.index, size=4, replace = False)
        #     size = 2
        # else:
        #     size = 6 - len(cos_reco)
        #     # 4개 미만일 경우 모두 선택
        #     temp = cos_reco.index
        # # print('temp1 : ', temp)
        # ran_cos = cos_reco.loc[temp]
        # # print('ran_cos : ', ran_cos)

        # temp = np.random.choice(simple_reco.index, size, replace=False)
        # # print('temp : ', temp)
        # ran_simple = simple_reco.loc[temp]
        # # print('ran_simple : ', ran_simple)

        # final_reco = pd.concat([ran_cos, ran_simple]).to_dict()
        # print('final_reco : ', final_reco)

        # return jsonify(final_reco)
        return 0

 
    # get('hiinaa')
