from flask_restx import Resource
from flask import request, jsonify
from db_utils import PostQuery
import http.client
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
