from flask_restx import Resource
from flask import request, jsonify
from db_utils import PostQuery, setQuery

# 회원가입
class testJoin(Resource):
    def post(self):
        data = request.get_json()
        print(data)

        sql = "INSERT INTO users (user_id, user_pw, user_name, user_nm, user_email, user_age, user_sex) VALUES(%s, %s, %s, %s, %s, %s, %s)"
        value = data['user_id'], data['user_pw'], data['user_name'], data['user_nm'], data['user_email'], data['user_age'], data['user_sex']
        
        return PostQuery(sql, value)

# 로그인
class testLogin(Resource):
    def post(self):
        data = request.get_json()
        print(data)

        sql = "SELECT * FROM users WHERE user_id = %s AND user_pw = %s"
        value = data['user_id'], data['user_pw']

        result = setQuery(sql, value)
        return jsonify(result)

# 로그인 한 유저의 유저 데이터 select
class testUserData(Resource):
    def get(self):
        user_name = request.args.get('user_name')

        result = setQuery(f'SELECT * FROM users WHERE user_name LIKE "%{user_name}%"')
        return jsonify(result)

# 로그인 한 유저의 주문/배송 데이터 select
class testOrderData(Resource):
    def get(self):
        user_name = request.args.get('user_name')
        print('user_name : ',user_name)
        
        sql =f'''SELECT t.order_id, t.user_id, t.order_date, t.order_status
                FROM test_orders t
                INNER JOIN users u ON t.user_id = u.user_id
                WHERE u.user_name = "{user_name}"'''

        result = setQuery(sql)
        return jsonify(result)
    

class testCategory(Resource):
    def get(self):
        user_name = request.args.get('user_name')
        print('user_name : ',user_name)
        
        sql =f'''SELECT t.order_id, t.user_id, t.order_date, t.order_status
                FROM test_orders t
                INNER JOIN users u ON t.user_id = u.user_id
                WHERE u.user_name = "{user_name}"'''

        result = setQuery(sql)
        return jsonify(result)