from flask_restx import Resource
from flask import request, jsonify
from db_utils import setQuery, PostCartQuery
from db_connection import db_connection

class ppAddCart(Resource):
    def post(self):
        value = request.get_json()
        print("addcart : ", value)

        data = value['data']
        print("cart data: ", data)
        
        userid = data['userid']
        idx = int(data['categorynumber'])
        price = int(data['cosmeticprice'])
        buy_cnt = int(data['cosmeticcount'])
        total_price = price * buy_cnt

        try:
            # 동일한 상품이 장바구니에 있는지 확인
            check_sql = "SELECT buy_cnt FROM result_cart_item WHERE user_id = %s AND idx = %s"
            existing_item = setQuery(check_sql, (userid, idx))

            if existing_item and existing_item[0]:
                print('existing_item:', existing_item[0])
                # 수량과 총 금액 업데이트
                new_buy_cnt = existing_item[0]['buy_cnt'] + buy_cnt
                new_total_price = price * new_buy_cnt

                update_sql = """
                    UPDATE result_cart_item
                    SET buy_cnt = %s, total_price = %s
                    WHERE user_id = %s AND idx = %s
                """
                update_values = (new_buy_cnt, new_total_price, userid, idx)
                update_result = PostCartQuery(update_sql, update_values)
                print('Update Result:', update_result)
                message = "Cart item updated successfully." if update_result > 0 else "Failed to update cart item."
            else:
                # 장바구니에 새 항목 추가
                insert_sql = """
                    INSERT INTO result_cart_item (user_id, idx, cos_name, price, buy_cnt, total_price, cos_img_src, is_selected)
                    SELECT %s, %s, p.cos_name, p.price, %s, %s, p.cos_img_src, TRUE
                    FROM result_product p
                    WHERE p.idx = %s
                """
                insert_values = (userid, idx, buy_cnt, total_price, idx)
                insert_result = PostCartQuery(insert_sql, insert_values)
                print('Insert Result:', insert_result)
                message = "Item added to cart successfully." if insert_result > 0 else "Failed to add item to cart."

        except Exception as e:
            print(f"An error occurred: {e}")
            message = "An error occurred while processing your request."

        return jsonify({"message": message})

class ppOrderCart(Resource):
    def get(self):
        value = request.args.to_dict()
        id = value['userid']

        # 장바구니 항목 조회
        data = setQuery("SELECT * FROM result_cart_item WHERE user_id = %s", (id,))
        
        return jsonify(data)





# from flask_restx import Resource
# from flask import request, jsonify
# from db_utils import setQuery, PostCartQuery
# from db_connection import db_connection

# class ppAddCart(Resource):
#     def post(self):
#         # 프론트엔드에서 받은 JSON 데이터를 파싱
#         value = request.get_json()
#         print("addcart : ", value)

#         # 데이터에서 필요한 값들을 추출
#         data = value['data']
#         print("cart data: ", data)
        
#         userid = data['userid']  # 사용자 ID
#         idx = int(data['categorynumber'])  # 상품 ID, 정수로 변환
#         price = int(data['cosmeticprice'])  # 상품 가격, 정수로 변환
#         buy_cnt = int(data['cosmeticcount'])  # 구매 수량, 정수로 변환
#         total_price = price * buy_cnt  # 총 금액 계산 (상품 가격 * 구매 수량)

#         try:
#             # 사용자가 동일한 상품을 장바구니에 이미 담았는지 확인하는 쿼리
#             check_sql = "SELECT buy_cnt FROM result_cart_item WHERE user_id = %s AND idx = %s"
#             existing_item = setQuery(check_sql, (userid, idx))

#             if existing_item and existing_item[0]:  # 리스트가 비어있지 않고 첫 번째 요소가 존재하는지 확인
#                 print('existing_item:', existing_item[0])
#                 # 만약 동일한 상품이 이미 장바구니에 있다면, 수량과 총 금액을 업데이트
#                 new_buy_cnt = existing_item[0]['buy_cnt'] + buy_cnt  # 기존 수량에 새로 추가된 수량 더함
#                 new_total_price = price * new_buy_cnt  # 새로운 총 금액 계산

#                 # 업데이트 쿼리 실행
#                 update_sql = """
#                     UPDATE result_cart_item
#                     SET buy_cnt = %s, total_price = %s
#                     WHERE user_id = %s AND idx = %s
#                 """
#                 update_values = (new_buy_cnt, new_total_price, userid, idx)
#                 update_result = PostCartQuery(update_sql, update_values)
#                 print('Update Result:', update_result)
#                 if update_result > 0:
#                     message = "장바구니에 추가해서 잘 담겼슈."  # 성공 메시지
#                 else:
#                     message = "장바구니에 제품 담는 거 실패했슈"  # 실패 메시지
#             else:
#                 # 장바구니에 동일한 상품이 없을 경우 새로 추가
#                 insert_sql = """INSERT INTO result_cart_item (user_id, idx, cos_name, price, buy_cnt, 
#                                                                 total_price, cos_img_src, is_selected)
#                                 SELECT
#                                 %s AS user_id,                        -- 사용자 ID
#                                 %s AS idx,                            -- 상품 ID
#                                 p.cos_name,                           -- 상품 이름 (result_product 테이블에서 가져옴)
#                                 p.price,                              -- 상품 가격 (result_product 테이블에서 가져옴)
#                                 %s AS buy_cnt,                        -- 구매 수량
#                                 %s AS total_price,                    -- 총 금액
#                                 p.cos_img_src,                        -- 상품 이미지 URL (result_product 테이블에서 가져옴)
#                                 TRUE AS is_selected                   -- 기본값: TRUE (상품 선택 여부)
#                                 FROM
#                                 result_product p
#                                 WHERE
#                                 p.idx = %s;                           -- 상품 ID에 대한 조건"""
                
#                 insert_values = (userid, idx, buy_cnt, total_price, idx)
#                 insert_result = PostCartQuery(insert_sql, insert_values)
#                 print('Insert Result:', insert_result)
#                 if insert_result > 0:
#                     message = "장바구니에 잘 담겼슈."  # 성공 메시지
#                 else:
#                     message = "장바구니에 제품 담는 거 실패했슈"  # 실패 메시지

#         except Exception as e:
#             # 오류 발생 시 오류 메시지 출력
#             print(f"An error occurred: {e}")
#             message = "An error occurred while processing your request."

#         # 결과를 JSON 형태로 반환
#         return jsonify({"message": message})

# class ppOrderCart(Resource):
#     def get(self):
#         # 요청에서 사용자 ID를 파싱
#         value = request.args.to_dict()
#         id = value['userid']
        
#         # 해당 사용자의 장바구니 데이터를 조회하는 쿼리
#         data = setQuery("select * from result_cart_item where user_id = %s", (id,))
        
#         # 조회한 데이터를 JSON 형태로 반환
#         return jsonify(data)








# from flask_restx import Resource
# from flask import request, jsonify
# from db_utils import testQuery, setQuery, PostCartQuery
# from db_connection import db_connection

# class ppAddCart(Resource):
#     def post(self):
#         # 프론트엔드에서 받은 JSON 데이터를 파싱
#         value = request.get_json()
#         print("addcart : ", value)

#         # 데이터에서 필요한 값들을 추출
#         data = value['data']
#         print("cart data: ", data)
        
#         userid = data['userid']  # 사용자 ID
#         idx = int(data['categorynumber'])  # 상품 ID, 정수로 변환
#         price = int(data['cosmeticprice'])  # 상품 가격, 정수로 변환
#         buy_cnt = int(data['cosmeticcount'])  # 구매 수량, 정수로 변환
#         total_price = price * buy_cnt  # 총 금액 계산 (상품 가격 * 구매 수량)

#         # 사용자가 동일한 상품을 장바구니에 이미 담았는지 확인하는 쿼리
#         check_sql = "SELECT buy_cnt FROM result_cart_item WHERE user_id = %s AND idx = %s"
#         existing_item = setQuery(check_sql, (userid, idx))
#         print('existing_item',existing_item[0])

#         if existing_item:
#             # 만약 동일한 상품이 이미 장바구니에 있다면, 수량과 총 금액을 업데이트
#             new_buy_cnt = existing_item[0]['buy_cnt'] + buy_cnt  # 기존 수량에 새로 추가된 수량 더함
#             new_total_price = price * new_buy_cnt  # 새로운 총 금액 계산

#             # 업데이트 쿼리 실행
#             update_sql = """
#                 UPDATE result_cart_item
#                 SET buy_cnt = %s, total_price = %s
#                 WHERE user_id = %s AND idx = %s
#             """
#             update_values = (new_buy_cnt, new_total_price, userid, idx)
#             testQuery(update_sql, update_values)
#             message = "Cart item updated successfully."  # 성공 메시지
#         else:
#             # 장바구니에 동일한 상품이 없을 경우 새로 추가
#             insert_sql = """INSERT INTO result_cart_item (user_id, idx, cos_name, price, buy_cnt, 
#                                                             total_price, cos_img_src, is_selected)
#                             SELECT
#                             %s AS user_id,                        -- 사용자 ID
#                             %s AS idx,                            -- 상품 ID
#                             p.cos_name,                           -- 상품 이름 (result_product 테이블에서 가져옴)
#                             p.price,                              -- 상품 가격 (result_product 테이블에서 가져옴)
#                             %s AS buy_cnt,                        -- 구매 수량
#                             %s AS total_price,                    -- 총 금액
#                             p.cos_img_src,                        -- 상품 이미지 URL (result_product 테이블에서 가져옴)
#                             TRUE AS is_selected                   -- 기본값: TRUE (상품 선택 여부)
#                             FROM
#                             result_product p
#                             WHERE
#                             p.idx = %s;                           -- 상품 ID에 대한 조건"""
            
#             insert_values = (userid, idx, buy_cnt, total_price, idx)
#             PostCartQuery(insert_sql, insert_values)
#             message = "Item added to cart successfully."  # 성공 메시지

#         # 결과를 JSON 형태로 반환
#         return jsonify({"message": message})


# class ppOrderCart(Resource):
#     def get(self):
#         # 요청에서 사용자 ID를 파싱
#         value = request.args.to_dict()
#         id = value['userid']
        
#         # 해당 사용자의 장바구니 데이터를 조회하는 쿼리
#         data = setQuery("select * from result_cart_item where user_id = %s", id)
        
#         # 조회한 데이터를 JSON 형태로 반환
#         return jsonify(data)

















# from flask_restx import Resource
# from flask import request, jsonify
# from db_utils import testQuery, setQuery
# from db_connection import db_connection

# class ppAddCart(Resource):
#     def post(self):
#         value = request.get_json()
#         print("addcart : ", value)

#         data = value['data']
#         print("cart data: ", data)
        
#         # Extract data from the request
#         userid = data['userid']
#         idx = int(data['categorynumber'])  # Ensure idx is an integer
#         price = int(data['cosmeticprice'])  # Ensure price is an integer
#         buy_cnt = int(data['cosmeticcount'])  # Ensure buy_cnt is an integer
#         total_price = price * buy_cnt  # Calculate total_price

#         # SQL query with parameters
#         sql = """INSERT INTO result_cart_item (user_id, idx, cos_name, price, buy_cnt, 
#                                         total_price, cos_img_src, is_selected)
#                 SELECT
#                 %s AS user_id,                        -- 프론트에서 받은 사용자 ID
#                 %s AS idx,                            -- 프론트에서 받은 상품 ID
#                 p.cos_name,                           -- 상품 이름 (result_product 테이블에서 가져옴)
#                 p.price,                              -- 상품 가격 (result_product 테이블에서 가져옴)
#                 %s AS buy_cnt,                        -- 프론트에서 받은 수량
#                 %s AS total_price,                   -- 총 금액 (상품 가격 * 수량)
#                 p.cos_img_src,                        -- 상품 이미지 URL (result_product 테이블에서 가져옴)
#                 TRUE AS is_selected                   -- 기본값: TRUE (상품 선택 여부)
#                 FROM
#                 result_product p
#                 WHERE
#                 p.idx = %s;                           -- 상품 ID에 대한 조건"""
        
#         # Values to be inserted
#         values = (userid, idx, buy_cnt, total_price, idx)

#         # Execute the query
#         testQuery(sql, values)

#         return jsonify({"message": "Item added to cart successfully."})


# class ppOrderCart(Resource):

#     def get(self):
#         value = request.args.to_dict()
#         id = value['userid']
#         data = setQuery("select * from result_cart_item where user_id = %s", id)
#         return jsonify(data)
    