from flask_restx import Resource
from flask import jsonify,request
from db_utils import setQuery, PostQuery

# 배송지 목록 정보 반환 클래스 // 세원이 화면
class ppAddressList(Resource):
    def get(self):
        value = request.args.to_dict()
        user_id = value['userid']

        data = setQuery(""" SELECT * FROM result_address
                            where user_id = %s""", user_id)

        return jsonify(data)
    


# 배송지 추가 클래스 // 상현 화면
class ppInsertAdd(Resource):
    def post(self):
        value = request.get_json()['data']
        # print(value)

        user_id = value['user_id']
        user_address = value['user_address']
        phone_num = value['phone_num']
        msg = value['msg']
        default_address = value['default_address']
        receive_name = value['receive_name']

        insert_sql = """
        INSERT INTO result_address (
            user_id,
            user_address,
            phone_num,
            msg,
            default_address,
            receive_name
        ) VALUES (%s, %s, %s, %s, %s, %s)
        """
        data = (user_id, user_address, phone_num, msg, default_address, receive_name)

        PostQuery(insert_sql, data)



class ppEditAddress(Resource):

# 배송지 수정 화면 들어가면 그때 반환되는 사용자 데이터
    def get(self):
        value = request.args.to_dict()
        idx = value['address_idx']

        data = setQuery(""" SELECT * FROM result_address
                            where address_idx = %s""", idx)

        return jsonify(data)
    

# 사용자가 get으로 받은 데이터를 수정하고 수정 버튼을 눌렀을 때 update 하는 클래스
    def post(self):
        value = request.get_json()['data']
        print(value)

        address_idx = value['address_idx']
        user_id = value['user_id']
        user_address = value['user_address']
        phone_num = value['phone_num']
        msg = value['msg']
        default_address = value['default_address']
        receive_name = value['receive_name']

        # 업데이트 쿼리문
        update_sql = """
                        UPDATE result_address
                        SET user_id = %s,
                            user_address = %s,
                            phone_num = %s,
                            msg = %s,
                            default_address = %s,
                            receive_name = %s
                        WHERE address_idx = %s
                        """
        data = (user_id, user_address, phone_num, msg, default_address, receive_name, address_idx)

        # PostQuery 함수 호출
        PostQuery(update_sql, data)


# 사용자가 배송지 목록에서 삭제 버튼 누를 시 
    def delete(self):
        # address_idx = request.get_json()['data']
        address_idx = request.args.get('address_idx')
        print('address_idxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx : ', address_idx)

        # address_idx = value['address_idx']
       
        # 삭제쿼리문
        del_sql = """
                    delete from result_address 
                    where address_idx = %s
                    """
        data = (address_idx)

        # PostQuery 함수 호출
        PostQuery(del_sql, data)







