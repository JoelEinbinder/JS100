var root, View;
(function() {
    document.addEventListener("DOMContentLoaded", init);
    var canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    window.onresize = resize;
    function resize(){
        canvas.setAttribute("width",window.innerWidth);
        canvas.setAttribute("height",window.innerHeight);
        if (root) {
            root.frame = {
                x: 0,
                y: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
        paint(true)
    }
    var ctx = canvas.getContext('2d');
    function init() {
        document.body.appendChild(canvas);
        resize();

    }
    function paint(once){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if (root) {
            ctx.drawImage(root.paint(), 0, 0);
        }
        else{
            ctx.fillRect(0,0,canvas.width,canvas.height);
        }
        if (!once)
           requestAnimationFrame(paint);
    }
    requestAnimationFrame(paint);

    View = function(e){
        this.frame = {
            x: 0,
            y: 0,
            width: 50,
            height: 50
        };
        this.subviews = [];
        for (var i in e){
            this[i] = e[i];
        }
    };
    View.prototype = {
        paint:function() {
            var canvas = document.createElement("canvas");
            canvas.width = this.frame.width;
            canvas.height = this.frame.height;
            var ctx = canvas.getContext('2d');

            if (this.backgroundColor) {
                ctx.fillStyle = this.backgroundColor;
                ctx.fillRect(0, 0, this.frame.width, this.frame.height);
            }
            if (this.strokeColor) {
                ctx.strokeStyle = this.strokeColor;
                ctx.strokeRect(0, 0, this.frame.width, this.frame.height);
            }
            for (var i = 0; i < this.subviews.length; i++){
                var v = this.subviews[i];
                ctx.drawImage(v.paint(), v.frame.x, v.frame.y);
            }
            return canvas;
        },
        addSubview: function(v){
            if (this.subviews) {
                this.subviews.push(v);
                v.superview = this;
                return true;
            }
            return false;
        },
        backgroundColor:false,
        strokeColor:"black"
    };
})();
root = new View();
root.addSubview(new View({
    backgroundColor:"red"
}));