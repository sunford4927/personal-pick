from flask_restx import Resource
from flask import request, jsonify
from db_utils import setQuery, PostQuery

# from db_utils import PostQuery, setQuery

# import reco_data
from reco_data import reco_data
from reco_def import reco_simple 
from reco_def import reco_cosine
import pandas as pd
import numpy as np

data = reco_data()
df_ing_reco, df_ing_effect, df_ing, df_product, df_review, df_user, df_cos = data.get_data()
# print('aaaa : ',df_ing_reco)
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
        sub = request.args.get('sub')
        # print('sub : ', sub)
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

        user = request.args.get('user_nm')
        age = pd.to_numeric(request.args.get('user_age'))
        age = categorize_age(age)
        sex = request.args.get('user_sex')
        skin_type = request.args.get('skin_type')
        # user = 'hiinaa'
        # age = 27
        # sex = '여'
        # skin_type = '건성'
        # print('user : ', user, age, sex, skin_type)

        simple = reco_simple.get(age, sex, skin_type)
        cosine = reco_cosine.get(user)
        # print('sim : ', simple)
        # print('cos : ', cosine)
        
        # cosine 유사도 제품이 simple추천 항목에 포함되면 우선추천
        same = cosine.index.isin(simple.index)
        # 추천 항목에 추가
        reco = cosine[same]
        leng = len(reco)
        print('leng : ', leng)
        # 추가한 항목 제거 후 10개가 되도록
        if leng<10:
            # cosine = cosine[~same].head(10-leng)
            reco = pd.concat([reco, cosine[~same].head(10-leng)])
        else:
            cosine = cosine.head(10)
            reco = pd.concat([reco, cosine[~same].head(10)])
        
        # print('reco : ', reco)

        # 비구독자 전용
        reco_not_sub = df_product[df_product['cos_name'].isin(simple.index)].head(10)
        # print('not_sub : ', reco_not_sub)
        reco_not_sub = pd.DataFrame(reco_not_sub)

        # 구독자 전용
        reco_sub = df_product[df_product['cos_name'].isin(reco.index)]
        reco_sub = pd.DataFrame(reco_sub)
        # DataFrame을 JSON 형식의 Python 객체로 변환
        reco_not_sub = reco_not_sub.to_dict(orient='records')
        reco_sub = reco_sub.to_dict(orient='records')

        if sub=='true':
            reco_final = reco_sub
            # print('sub_1_reco_final', reco_final)
        else:
            reco_final = reco_not_sub
            # print('sub_0_reco_final : ', reco_final)

        # JSON 형식의 Python 객체를 JSON 응답으로 반환
        return jsonify(reco_final)


        # # return reco_final


# 구매 제품과 비슷한 성분 화장품 추천
class recoIng(Resource):
    def get(self):
        # print('요청받음')
        # db에 index 1부터 올려서 받은 값이 +1된 값임
        # idx=180
        idx = int(request.args.get('idx')) - 1 
        cos = df_product[df_product['idx']==idx]
        cos_name = cos['cos_name'].values[0]
        # print('제품 : ', cos)
        print('제품 이름 : ', cos_name)
        ing = df_ing[df_ing['cos_name'] == cos_name]['kor_name']
        print('ing : ', ing)
        # df_ing에서 ing를 포함하는 항목의 화장품 이름만
        cos_ing = df_ing[df_ing['kor_name'].isin(ing)]['cos_name']
        # print(cos_ing)

        # 빈도 계산, 상위 10개 추출
        cos_count = cos_ing.value_counts().head(10)
        print('빈도수  : ', cos_count)

        # 해당 화장품 정보 가져오기
        reco = df_product[df_product['cos_name'].isin(cos_count.index)]

        reco = pd.DataFrame(reco)
        # DataFrame을 JSON 형식의 Python 객체로 변환
        reco = reco.to_dict(orient='records')
        # print('reco : ', reco)
        # print('type : ', type(reco))
        # print('type2 : ', type(jsonify(reco)))

        return jsonify(reco)
    
# 피부타입 진단
class skinCheck(Resource):
    def post(self):
        print('요청받음')
        value = request.files['file']
        print(value.name)



        return 0
        



# print(1)
# recoIng.get('1')


