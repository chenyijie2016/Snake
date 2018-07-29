var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var LeaderBoard = /** @class */ (function (_super) {
        __extends(LeaderBoard, _super);
        function LeaderBoard() {
            var _this = _super.call(this) || this;
            _this.returnButton = new Laya.Button();
            _this.returnButton.on(Laya.Event.CLICK, _this, _this.onButtonClicked);
            _this.addChild(_this.returnButton);
            _this.returnButton.pos(Const.SCREEN_WIDTH / 2 - 40, Const.SCREEN_HEIGHT * 0.8);
            _this.returnButton.width = 80;
            _this.returnButton.height = 40;
            _this.returnButton.label = '返回';
            _this.returnButton.labelFont = 'Arial';
            _this.returnButton.labelColors = '#FFFFFF,#FF0000,#FF0000,#FF0000';
            _this.returnButton.labelSize = 30;
            return _this;
        }
        LeaderBoard.prototype.setLeaderBoard = function (data) {
            // data = [
            // 	{ nickname: 'tee', score: 45 },
            // 	{ nickname: 'ree', score: 11 },
            // 	{ nickname: 'ree', score: 10 },
            // 	{ nickname: 'ree', score: 11 },
            // 	{ nickname: 'ree', score: 11 },
            // 	{ nickname: 'ree', score: 8 },
            // 	{ nickname: 'ree', score: 7 },
            // 	{ nickname: 'ree', score: 6 },
            // ];
            this.removeChildren();
            this.addChild(this.returnButton);
            var text1 = new Laya.Text(), text2 = new Laya.Text();
            text1.text = '用户';
            text2.text = '分数';
            text1.font = text2.font = 'Hei';
            text1.color = text2.color = 'white';
            text1.fontSize = text2.fontSize = 25;
            text1.pos(100, 100);
            text2.pos(300, 100);
            this.addChild(text1);
            this.addChild(text2);
            console.log(data);
            if (data)
                for (var i = 0; i < data.length && i < 10; i++) {
                    var nicknameText = new Laya.Text();
                    var scoreText = new Laya.Text();
                    nicknameText.text = data[i].nickname;
                    scoreText.text = data[i].score.toString();
                    nicknameText.font = scoreText.font = 'Hei';
                    nicknameText.fontSize = scoreText.fontSize = 20;
                    nicknameText.color = scoreText.color = 'white';
                    nicknameText.pos(100, 150 + 40 * i);
                    scoreText.pos(300, 150 + 40 * i);
                    this.addChild(scoreText);
                    this.addChild(nicknameText);
                }
        };
        LeaderBoard.prototype.onButtonClicked = function () {
            _super.prototype.removeSelf.call(this);
            Laya.stage.addChild(GameMain.gameStart);
            Laya.stage.graphics.clear();
        };
        return LeaderBoard;
    }(ui.LeaderBoardUI));
    view.LeaderBoard = LeaderBoard;
})(view || (view = {}));
//# sourceMappingURL=LeaderBoard.js.map