var root, View, TextView, ResizingView;
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
        root.refreshFrame();
        paint(0, true)
    }
    function wholeFrame(){
        return {
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
    function merge(from, to){
        var x = {};
        for (var i in from){
            x[i] = from[i];
        }
        for (var i in to){
            x[i] = to[i];
        }
        return x;
    }
    var ctx = canvas.getContext('2d');
    function init() {
        document.body.appendChild(canvas);
        resize();

    }
    function paint(time, once){
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
        getCanvas: function(){
            var canvas = document.createElement("canvas");
            canvas.width = this.frame.width;
            canvas.height = this.frame.height;
            return canvas;
        },
        paint:function() {
            var canvas = this.getCanvas();
            var ctx = canvas.getContext('2d');
            if (this.backgroundColor) {
                ctx.fillStyle = this.backgroundColor;
                ctx.fillRect(0, 0, this.frame.width, this.frame.height);
            }
            if (this.strokeColor) {
                ctx.strokeStyle = this.strokeColor;
                ctx.strokeRect(0, 0, this.frame.width, this.frame.height);
            }
            if (this.subviews)
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
                if (this.subviews)
                    for (var i = 0; i < this.subviews.length; i++) {
                        this.subviews[i].computeFrame();
                        this.subviews[i].bubbleFrame(up);
                    }
            }
        },
        refreshFrame: function(){
            this.computeFrame();
            this.updatedFrame();
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
    TextView = function(e){
        this.frame = {
            x: 0,
            y: 0,
            width: 50,
            height: 50
        };
        for (var i in e){
            this[i] = e[i];
        }
    };
    TextView.prototype = merge(View.prototype,{
        text: "test",
        color: "black",
        willResize: true,
        fontSize: 15,
        font: "Verdana, Geneva, sans-serif",
        paint: function(){
            var canvas = this.getCanvas();
            var ctx = canvas.getContext('2d');
            //build up lines
            var text = this.text;
            ctx.font = this.fontSize + "px " + this.font;
            ctx.fillStyle = this.color;
            ctx.textBaseline = "hanging";
            var lines = this.generateLines();
            for (var i = 0; i < lines.length; i++){
                ctx.fillText(lines[i],0,i*this.fontSize);
            }

            //ctx.fillText(this.text,0,0);

            return canvas;
        },
        setText: function(text){
            this.text = text;
            this.refreshFrame();
        },
        computeFrame:function(){
            View.prototype.computeFrame.apply(this);
            if (this.willResize) {
                var textHeight = this.generateLines().length * this.fontSize;
                this.frame.height = Math.max(this.frame.height, textHeight);
            }
        },
        generateLines: function(){
            var ctx = canvas.getContext('2d');
            ctx.save();
            ctx.font = this.fontSize + "px " + this.font;
            var cars = this.text.split("\n");
            var lines = [];
            for (var ii = 0; ii < cars.length; ii++) {
                var line = "";
                var words = cars[ii].split(" ");

                for (var n = 0; n < words.length; n++) {
                    var testLine = line + words[n] + " ";
                    var metrics = ctx.measureText(testLine);
                    var testWidth = metrics.width;

                    if (testWidth > this.frame.width) {
                        lines.push(line);
                        line = words[n] + " ";
                    }
                    else {
                        line = testLine;
                    }
                }

                lines.push(line);
            }
            ctx.restore();
            return lines;
        }
    });
    ResizingView = function(e){
        View.apply(this,[e]);
    };
    ResizingView.prototype = merge(View.prototype,{
        computeFrame:function(){
            View.prototype.computeFrame.apply(this);
            if (!this.fixedHorizontal)
                if (this.subviews)
                    for (var i = 0; i < this.subviews.length; i++)
                        this.frame.width = Math.max(this.frame.width,this.subviews[i].frame.x + this.subviews[i].frame.width);

            if (!this.fixedVertical)
                if (this.subviews)
                    for (var i = 0; i < this.subviews.length; i++)
                        this.frame.height = Math.max(this.frame.height,this.subviews[i].frame.y + this.subviews[i].frame.height);

        },
        fixedHorizontal: false,
        fixedVertical: false
    });
})();
root = new View();
root.addSubview(new ResizingView({
    backgroundColor:false,
    metrics:{
        x: -25,
        y: 100,
        width: 100,
        height: 65,
        scalar: {
            x:.5
        }
    }
}));
root.subviews[0].addSubview(new TextView({
    color:"blue",
    text:"This thing will wrap a lot",
    metrics:{
        scalar:{
            width:1,
            height:1
        }
    }
}));




