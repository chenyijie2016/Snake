(function(){
    (function(LayaSample){
        //初始化引擎
        var WebGL = laya.webgl.WebGL;
        Laya.init(375, 667, WebGL);
        var Stage   = Laya.Stage;
        var Text    = Laya.Text;
        var Browser = Laya.Browser;
        var WebGL   = Laya.WebGL;
        (function(){
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
            Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
            Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
            Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
            //设置stage颜色
            Laya.stage.bgColor = "black";
            //加载资源
            Laya.loader.load("res/atlas/ui.atlas",Laya.Handler.create(this,onLoaded),null,Laya.Loader.ATLAS);
        })();

    })();
    function onLoaded(){
        LayaSample.gameStart = new GameStart();
        Laya.stage.addChild(LayaSample.gameStart);
    }
})(window.LayaSample || (window.LayaSample = {}));


