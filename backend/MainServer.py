from flask import Flask
from flask_restx import Api
from flask_cors import CORS
# from hello import test
from ppMain import ppMainPage, ppCategorySel
from ppDetail import ppDetailPage, ppGetReveiw, ppScoreAvg, ppScoreCnt, ppReviewCnt
from join import ppJoin
from ppLogin import ppLogin
from ppSearch import ppSearch, ppSearchList
from Test import testJoin, testLogin, testUserData, testOrderData

app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app) 
app.config['JSON_AS_ASCII'] = False
api = Api(app)

# api.add_resource(test, '/HelloTest')
api.add_resource(ppMainPage, '/MainPage')
api.add_resource(ppDetailPage, '/DetailPage')
api.add_resource(ppJoin, '/JoinPage')
api.add_resource(ppLogin, '/LoginPage')
api.add_resource(ppSearch, '/SearchPage')
api.add_resource(ppSearchList, '/SearchList')
api.add_resource(ppCategorySel, '/CategorySel')
api.add_resource(ppGetReveiw, '/ReviewPage')
api.add_resource(ppScoreAvg, '/ScoreAvg')
api.add_resource(ppScoreCnt, '/ScoreCnt')
api.add_resource(ppReviewCnt, '/ReviewCnt')

api.add_resource(testJoin, '/TestJoin')
api.add_resource(testLogin, '/TestLogin')
api.add_resource(testUserData, '/TestUserData')
api.add_resource(testOrderData, '/TestOrderData')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)
