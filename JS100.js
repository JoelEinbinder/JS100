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
        root.computeFrame();
        root.bubbleFrame(false);
        paint(true)
    }
    function wholeFrame(){
        return {
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
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
        computeFrame: function(){
            if (this.superview){
                if (this.metrics) {
                    var frame = {
                        x: this.metrics.x,
                        y: this.metrics.y,
                        width: this.metrics.width,
                        height: this.metrics.height
                    };
                    for (var i in frame){
                        if (!frame[i]){
                            frame[i] = 0;
                        }
                    }
                    if (this.metrics.scalar){
                        if (this.metrics.scalar.x)
                            frame.x += this.superview.frame.width * this.metrics.scalar.x;
                        if (this.metrics.scalar.y)
                            frame.y += this.superview.frame.height * this.metrics.scalar.y;
                        if (this.metrics.scalar.width)
                            frame.width += this.superview.frame.width * this.metrics.scalar.width;
                        if (this.metrics.scalar.height)
                            frame.height += this.superview.frame.height * this.metrics.scalar.height;
                    }
                    this.frame = frame;
                }
            }
            else{
                this.frame = wholeFrame();
            }
        },
        bubbleFrame: function(up){
            if (up){
                if (this.superview) {
                    this.superview.computeFrame();
                    this.superview.bubbleFrame(up);
                }
            }
            else {
                for (var i = 0; i < this.subviews.length; i++) {
                    this.subviews[i].computeFrame();
                    this.subviews[i].bubbleFrame(up);
                }
            }
        },
        updatedFrame: function(){
            this.bubbleFrame(true);
            this.bubbleFrame(false);
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
    backgroundColor:"red",
    metrics:{
        x: -25,
        y: 100,
        width: 50,
        height: 50,
        scalar: {
            x:.5
        }
    }
}));




