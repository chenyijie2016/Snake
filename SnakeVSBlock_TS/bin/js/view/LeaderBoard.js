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
            _this.returnButton.label = 'return';
            _this.returnButton.labelFont = 'Arial';
            _this.returnButton.labelColors = '#FFFFFF,#FF0000,#FF0000,#FF0000';
            _this.returnButton.labelSize = 30;
            return _this;
        }
        LeaderBoard.prototype.setLeaderBoard = function (data) {
            this.removeChildren();
            this.addChild(this.returnButton);
            // for (let i = 0; i < data.length; i++) {
            // }
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