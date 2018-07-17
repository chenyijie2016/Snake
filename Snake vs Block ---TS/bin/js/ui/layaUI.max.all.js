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
    var GameStartUI = /** @class */ (function (_super) {
        __extends(GameStartUI, _super);
        function GameStartUI() {
            return _super.call(this) || this;
        }
        GameStartUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameStartUI.uiView);
        };
        GameStartUI.uiView = { "type": "View", "props": { "height": 736 }, "child": [{ "type": "Text", "props": { "y": 218, "x": 172, "width": 51, "text": "VS", "height": 40, "fontSize": 35, "font": "Arial", "color": "#FFFFFF" } }, { "type": "Text", "props": { "y": 168, "x": 30, "width": 138, "text": "Snake", "height": 47, "fontSize": 40, "font": "Helvetica", "color": "#b2de3f", "bold": true } }, { "type": "Text", "props": { "y": 242, "x": 251, "width": 136, "text": "Block", "height": 46, "fontSize": 40, "font": "Helvetica", "color": "#dbe240", "bold": true } }, { "type": "Button", "props": { "y": 564, "x": 196, "width": 152, "var": "gameStartButton", "stateNum": 2, "skin": "ui/btn_start.png", "pivotY": 26, "pivotX": 75, "label": "label", "height": 57 } }] };
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
//# sourceMappingURL=layaUI.max.all.js.map