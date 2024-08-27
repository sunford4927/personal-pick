
from flask_restx import Resource
from flask import request, jsonify
from db_utils import setQuery, PostCartQuery

# 장바구니에 상품 insert하는 서버, 이미 있는 제품이라면 수량과 총가격 업데이트
class ppAddCart(Resource):
    def post(self):
        # 프론트엔드에서 받은 JSON 데이터를 파싱
        value = request.get_json()
        # print("addcart : ", value)

        data = value['data']
       
        # 데이터에서 필요한 값들을 추출
        userid = data['userid']
        idx = int(data['categorynumber'])
        price = int(data['cosmeticprice'])
        buy_cnt = int(data['cosmeticcount'])
        total_price = price * buy_cnt

        try:
            # 사용자가 동일한 상품을 장바구니에 이미 담았는지 확인하는 쿼리
            check_sql = "SELECT buy_cnt FROM result_cart_item WHERE user_id = %s AND idx = %s"
            existing_item = setQuery(check_sql, (userid, idx))

            if existing_item:
                # 만약 동일한 상품이 이미 장바구니에 있다면, 수량과 총 금액을 업데이트
                new_buy_cnt = existing_item[0]['buy_cnt'] + buy_cnt  # 기존 수량에 새로 추가된 수량 더함
                new_total_price = price * new_buy_cnt  # 새로운 총 금액 계산

                # 업데이트 쿼리 실행
                update_sql = """
                    UPDATE result_cart_item
                    SET buy_cnt = %s, total_price = %s
                    WHERE user_id = %s AND idx = %s
                """
                update_values = (new_buy_cnt, new_total_price, userid, idx)
                PostCartQuery(update_sql, update_values)

            else:
                    # 장바구니에 항목이 없으면 새로 추가
                    insert_sql = """
                        INSERT INTO result_cart_item (user_id, idx, cos_name, price, buy_cnt, total_price, cos_img_src, is_selected)
                        SELECT
                            %s AS user_id,
                            %s AS idx,
                            p.cos_name,
                            p.price,
                            %s AS buy_cnt,
                            %s AS total_price,
                            p.cos_img_src,
                            TRUE AS is_selected
                        FROM
                            result_product p
                        WHERE
                            p.idx = %s
                    """
                    insert_values = (userid, idx, buy_cnt, total_price, idx)
                    PostCartQuery(insert_sql, insert_values)

        except Exception:
            return jsonify({"message": "An error occurred."}), 500

        return jsonify({"message": "Operation completed successfully."})



# 해당 사용자가 장바구니에 담은 데이터 보내주는 서버
class ppOrderCart(Resource):
    def get(self):
        # 요청에서 사용자 ID를 파싱
        value = request.args.to_dict()
        userid = value.get('userid')

        sql = """
            SELECT
                rci.user_id,
                rci.idx,
                rci.cos_name,
                rci.price,
                rci.buy_cnt,
                rci.total_price,
                rci.cos_img_src,
                rci.is_selected,
                rp.brand_name,
                rp.vol
            FROM
                result_cart_item rci
            JOIN
                result_product rp
            ON
                rci.idx = rp.idx
            WHERE
                rci.user_id = %s
        """
        data = setQuery(sql, (userid,))
        return jsonify(data)
    

# 사용자가 구매했다고 체크박스에 체크하고 주문하기 누르면 그때 is_seleted 데이터 업데이트하는 쿼리문
# true 값만 주문하기 페이지에 보내면 됨
    def post(self):
        value = request.get_json()
        data = value['data']

        user_id = data[0]['user_id']  # 사용자 ID는 모든 항목에서 동일하다고 가정

        # SQL 쿼리의 CASE 문을 사용하여 업데이트 쿼리 생성
        case_statements = []
        values = []

        for item in data:
            idx = item.get('idx')
            is_selected = item.get('is_selected')

            if idx is not None and is_selected is not None:
                case_statements.append(f"WHEN %s THEN %s")
                values.extend([idx, is_selected])

 
        case_statements_str = ' '.join(case_statements)
        update_sql = f"""
            UPDATE result_cart_item
            SET is_selected = CASE idx
                {case_statements_str}
                ELSE is_selected
            END
            WHERE user_id = %s
        """
        
        # 사용자 ID 추가
        values.append(user_id)

        # 쿼리 실행
        PostCartQuery(update_sql, values)



    
# 사용자가 주문하기 누르면 체크박스 선택한 애들 데이터만 전송
class ppOrder(Resource):
    def get(self):
        # 요청에서 사용자 ID를 파싱
        value = request.args.to_dict()
        userid = value.get('userid')

        sql = """
            SELECT
                rci.user_id,
                rci.idx,
                rci.cos_name,
                rci.price,
                rci.buy_cnt,
                rci.total_price,
                rci.cos_img_src,
                rci.is_selected,
                rp.brand_name,
                rp.vol
            FROM
                result_cart_item rci
            JOIN
                result_product rp
            ON
                rci.idx = rp.idx
            WHERE
                rci.user_id = %s and is_selected = 1;
        """
        data = setQuery(sql, (userid,))
        return jsonify(data)
    



    



    
   


