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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameOverUI = /** @class */ (function (_super) {
        __extends(GameOverUI, _super);
        function GameOverUI() {
            return _super.call(this) || this;
        }
        GameOverUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameOverUI.uiView);
        };
        GameOverUI.uiView = { "type": "View", "props": { "width": 414, "height": 736 } };
        return GameOverUI;
    }(View));
    ui.GameOverUI = GameOverUI;
})(ui || (ui = {}));
(function (ui) {
    var GameStartUI = /** @class */ (function (_super) {
        __extends(GameStartUI, _super);
        function GameStartUI() {
            return _super.call(this) || this;
        }
        GameStartUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameStartUI.uiView);
        };
        GameStartUI.uiView = { "type": "View", "props": { "height": 736 }, "child": [{ "type": "Button", "props": { "y": 643, "x": 187, "width": 165, "var": "gameStartButton", "stateNum": 2, "skin": "ui/btn_start.png", "pivotY": 48, "pivotX": 63, "height": 80 } }, { "type": "Button", "props": { "y": 544, "x": 125, "width": 164, "var": "leaderBoardButton", "labelStroke": 32, "labelSize": 30, "labelFont": "Arial", "labelColors": "#FFF,#F00,#F00,#F00", "labelBold": true, "label": "排行榜", "height": 42, "gray": false } }] };
        return GameStartUI;
    }(View));
    ui.GameStartUI = GameStartUI;
})(ui || (ui = {}));
(function (ui) {
    var GameViewUI = /** @class */ (function (_super) {
        __extends(GameViewUI, _super);
        function GameViewUI() {
            return _super.call(this) || this;
        }
        GameViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameViewUI.uiView);
        };
        GameViewUI.uiView = { "type": "View", "props": { "width": 414, "height": 736 } };
        return GameViewUI;
    }(View));
    ui.GameViewUI = GameViewUI;
})(ui || (ui = {}));
(function (ui) {
    var LeaderBoardUI = /** @class */ (function (_super) {
        __extends(LeaderBoardUI, _super);
        function LeaderBoardUI() {
            return _super.call(this) || this;
        }
        LeaderBoardUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.LeaderBoardUI.uiView);
        };
        LeaderBoardUI.uiView = { "type": "View", "props": { "width": 414, "height": 736 } };
        return LeaderBoardUI;
    }(View));
    ui.LeaderBoardUI = LeaderBoardUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map