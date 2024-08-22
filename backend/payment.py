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

        payload = ("{\"paymentKey\":\"%s\",\"orderId\":\"%s\",\"amount\":%d}" %(value['data']['paymentKey'], value['data']['orderId'], value['data']['amount']))

        headers = {
            'Authorization': "Basic dGVzdF9za19leDZCSkdRT1ZESjJiZWFZb3c0UThXNHcyek5iOg==",
            'Content-Type': "application/json"
        }

        conn.request("POST", "/v1/payments/confirm", payload, headers)

        res = conn.getresponse()
        data = res.read()

        print(data.decode("utf-8"))


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