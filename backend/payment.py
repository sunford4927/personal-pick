from flask_restx import Resource
from flask import request, jsonify
from db_utils import PostQuery
import http.client
import json
class payment(Resource):
    def post(self):
        value = request.get_json()
        print("value : ",value['data']['paymentKey'])
        conn = http.client.HTTPSConnection("api.tosspayments.com")
        

        payload = ("{\"paymentKey\":\"%s\",\"orderId\":\"%s\",\"totalAmount\":%d}" %(value['data']['paymentKey'], value['data']['orderId'], value['data']['totalAmount']))

        headers = {
            'Authorization': "Basic dGVzdF9za19leDZCSkdRT1ZESjJiZWFZb3c0UThXNHcyek5iOg==",
            'Content-Type': "application/json"
        }

        conn.request("POST", "/v1/payments/confirm", payload, headers)

        res = conn.getresponse()
        data = res.read()

        # data2 = value
        # print('data1 : ',value['data']['paymentKey'])

        data2 = request.get_json()
        print("data2 : ",data2['data']['paymentKey'])

        sql = '''INSERT INTO result_order (
        user_id, order_name, payment_key,
        address, order_date, price, delivery_state)
        VALUES(%s, %s, %s, %s, %s, %s, %s)'''
        # user_id 받아오기
        value2 = (value['data']['user_id'],
        # order_name
        data2['data']['orderName'],
        # payment_key
        data2['data']['paymentKey'],
        # address
        data2['data']['address'],
        # order_date
        '2024-08-22',
        # price
        data2['data']['totalAmount'],
        # delivery_state
        '배송 준비')
        # print('sql : ',sql)
        print('value2 : ',value2)

        print('12345 : ',PostQuery(sql, value2))
        return PostQuery(sql, value2)

       


class Clearpayment(Resource):
    def post(self):
        value = request.get_json()
        print(value)
        conn = http.client.HTTPSConnection("api.tosspayments.com")
        payload = json.dumps({
            "cancelReason": "고객 변심"
        }).encode('utf-8')  # UTF-8로 인코딩
        headers = {
            'Authorization': "Basic dGVzdF9za19leDZCSkdRT1ZESjJiZWFZb3c0UThXNHcyek5iOg==",
            'Content-Type': "application/json"
        }
        url = "/v1/payments/%s/cancel" % (value['data'])
        print(url)
        # conn.request 호출 부분 수정
        conn.request("POST", url, body=payload, headers=headers)
        res = conn.getresponse()
        data = res.read()
        print(data.decode("utf-8"))