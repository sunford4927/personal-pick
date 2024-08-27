from flask_restx import Resource
from flask import request, jsonify
from db_utils import testQuery, setQuery
from db_connection import db_connection

class ppAddCart(Resource):
    def post(self):
        value = request.get_json()
        print("addcart : ", value)

        data = value['data']
        print("cart data: ", data)
        
        # Extract data from the request
        userid = data['userid']
        idx = int(data['categorynumber'])  # Ensure idx is an integer
        price = int(data['cosmeticprice'])  # Ensure price is an integer
        buy_cnt = int(data['cosmeticcount'])  # Ensure buy_cnt is an integer
        total_price = price * buy_cnt  # Calculate total_price

        # SQL query with parameters
        sql = """INSERT INTO result_cart_item (user_id, idx, cos_name, price, buy_cnt, 
                                        total_price, cos_img_src, is_selected)
                SELECT
                %s AS user_id,                        -- 프론트에서 받은 사용자 ID
                %s AS idx,                            -- 프론트에서 받은 상품 ID
                p.cos_name,                           -- 상품 이름 (result_product 테이블에서 가져옴)
                p.price,                              -- 상품 가격 (result_product 테이블에서 가져옴)
                %s AS buy_cnt,                        -- 프론트에서 받은 수량
                %s AS total_price,                   -- 총 금액 (상품 가격 * 수량)
                p.cos_img_src,                        -- 상품 이미지 URL (result_product 테이블에서 가져옴)
                TRUE AS is_selected                   -- 기본값: TRUE (상품 선택 여부)
                FROM
                result_product p
                WHERE
                p.idx = %s;                           -- 상품 ID에 대한 조건"""
        
        # Values to be inserted
        values = (userid, idx, buy_cnt, total_price, idx)

        # Execute the query
        testQuery(sql, values)

        return jsonify({"message": "Item added to cart successfully."})


class ppOrderCart(Resource):

    def get(self):
        value = request.args.to_dict()
        id = value['userid']
        data = setQuery("select * from result_cart_item where user_id = %s", id)
        return jsonify(data)
    