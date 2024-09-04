from flask_restx import Resource
from flask import jsonify, request
from db_utils import setQuery

# 메인화면 중 배너 데이터 전송 서버
class ppMainPage(Resource):

    def get(self):
        data = setQuery("""select idx, brand_name, cos_name, cos_img_src, 
                            grade, grade_count, price, vol
                            from result_product limit 100""")
        return jsonify(data)
    

# 메인 화면 중 카테고리 선택 후 데이터 전송 서버
class ppCategorySel(Resource):

    def get(self):
        data = request.args.to_dict()
        cateValue = data['category']
        # print("cateValue : ",cateValue)
        # data = setQuery('select * from result_product limit 6')
        data = setQuery(f'select * from result_product where category = "%{cateValue}%" limit 6')
        # data = setQuery("""select * from cos_data""")
        return jsonify(data)
    


# 메인 화면 중 나이대별 추천 데이터 전송 서버
class ppSuggestAge(Resource):

    def get(self):
        ageDic = request.args.to_dict()
        age = int(ageDic['age'])
        # print(type(age))
        oldAge = age + 9
        # print("oldAge" , oldAge)
        data = setQuery("select * from result_product where idx = 3")
        twoOldAge = age + 30
        if (age == 50) :
            data = setQuery(""" SELECT p.*
                                FROM result_product p
                                JOIN result_review r ON p.idx = r.cos_idx
                                JOIN result_users u ON r.user_idx = u.user_id
                                WHERE u.user_age BETWEEN %s AND %s
                                GROUP BY p.idx, p.brand_name, p.cos_name, p.cos_img_src, p.grade, p.grade_count, p.price, p.vol, p.ranking, p.category
                                 ORDER BY COUNT(*) DESC
                                LIMIT 6; """, (age, twoOldAge))
        elif (age < 50) :
            data = setQuery(""" SELECT p.*
                                FROM result_product p
                                JOIN result_review r ON p.idx = r.cos_idx
                                JOIN result_users u ON r.user_idx = u.user_id
                                WHERE u.user_age BETWEEN %s AND %s
                                GROUP BY p.idx, p.brand_name, p.cos_name, p.cos_img_src, p.grade, p.grade_count, p.price, p.vol, p.ranking, p.category
                                 ORDER BY COUNT(*) DESC
                                LIMIT 6;""", (age, oldAge))

        return jsonify(data)
            
 

# 피부 타입 별 랭킹 쿼리문 전송 서버
class ppSuggestSkinType(Resource):

    def get(self):
        TypeDic = request.args.to_dict()
        skintype = TypeDic['skintype']
        data = setQuery(""" SELECT p.*
                                FROM result_product p
                                JOIN result_review r ON p.cos_name = r.cos_name
                                JOIN result_users u ON r.user_nm = u.user_nm
                                WHERE u.skin_type = %s
                                AND (p.category = '스킨케어' OR p.category = '클렌징')
                                GROUP BY p.idx, p.brand_name, p.cos_name, p.cos_img_src, p.grade, p.grade_count, p.price, p.vol, p.ranking, p.category
                                ORDER BY COUNT(*) DESC
                                LIMIT 6; """, skintype)
        
        return jsonify(data)

