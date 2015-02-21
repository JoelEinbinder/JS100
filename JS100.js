var root, View, TextView, ResizingView, ListView, ScrollView;
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
        this.metrics = {
            x: 0,
            y: 0,
            width: 50,
            height: 50
        };
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
        dirty: true,
        firstFrame: true,
        getCanvas: function(){
            var canvas = document.createElement("canvas");
            canvas.width = this.frame.width;
            canvas.height = this.frame.height;
            return canvas;
        },
        setDirty:function(){
            this.dirty = true;
            this.cache = null;
            if (this.superview)
                this.superview.setDirty()
        },
        render:function(){
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
        paint:function() {
            if (!this.dirty)
                return this.cache;
            var canvas = this.render();
            this.dirty = false;
            this.cache = canvas;
            return canvas;
        },
        getCenter:function(){
            return {x:this.frame.x + this.frame.width/2, y: this.frame.y + this.frame.height/2 };
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
        checkFrame: function(){
            if (this.firstFrame){
                this.setDirty();
                this.firstFrame = false;
                return true;
            }

            var oldframe = this.frame;
            this.computeFrame();
            if (this.frame.x == oldframe.x && this.frame.y == oldframe.y && this.frame.width == oldframe.width && this.frame.height == oldframe.height){
                return false;
            }
            this.setDirty();
            return true;
        },
        bubbleFrame: function(up){
            if (up){
                if (this.superview) {
                    if (this.superview.checkFrame())
                        this.superview.bubbleFrame(up);
                }
            }
            else {
                if (this.subviews)
                    for (var i = 0; i < this.subviews.length; i++) {
                        if (this.subviews[i].checkFrame())
                            this.subviews[i].bubbleFrame(up);
                    }
            }
        },
        refreshFrame: function(){
            if (this.checkFrame())
                this.updatedFrame();
        },
        updatedFrame: function(){
            this.bubbleFrame(true);
            this.bubbleFrame(false);
        },
        setMetrics: function(m){
            this.metrics = m;
            this.refreshFrame();
        },
        addSubview: function(v){
            if (this.subviews) {
                this.subviews.push(v);
                v.superview = this;
                v.refreshFrame();
                return true;
            }
            return false;
        },
        hitTest: function(x,y,event){
            if (x > this.frame.x && x < this.frame.x + this.frame.width)
                if (y > this.frame.y && y < this.frame.y + this.frame.height){
                    if (this.subviews)
                        for (var i = 0; i < this.subviews.length; i++){
                            var hit = this.subviews[i].hitTest(x-this.frame.x,y-this.frame.y,event);
                            if (hit)
                                return hit;
                        }
                    if (!event || this[event])
                        return this;
                }
            return false;
        },
        backgroundColor:null,
        strokeColor:"black"
    };
    TextView = function(e){
        this.metrics = {
            x: 0,
            y: 0,
            width: 50,
            height: 50
        };
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
        justify:"left",
        font: "Verdana, Geneva, sans-serif",
        decoration: "",
        render: function(){
            var canvas = this.getCanvas();
            var ctx = canvas.getContext('2d');
            //build up lines
            var text = this.text;
            ctx.font = this.decoration + " " + this.fontSize + "px " + this.font;
            ctx.fillStyle = this.color;
            ctx.textBaseline = "hanging";
            var lines = this.generateLines();
            for (var i = 0; i < lines.length; i++){
                var x;
                switch(this.justify){
                    default:
                    case "left":
                        x = 0;
                        break;
                    case "right":
                        x = canvas.width - ctx.measureText(lines[i]).width;
                        break;
                    case "center":
                        x = (canvas.width - ctx.measureText(lines[i]).width)/2;
                        break;
                }
                ctx.fillText(lines[i],x,i*this.fontSize);
            }

            //ctx.fillText(this.text,0,0);

            return canvas;
        },
        setText: function(text){
            this.text = text;
            this.refreshFrame();
        },
        setFont: function(font){
            this.font = font;
            this.refreshFrame();
        },
        setFontSize: function(fontSize){
            this.fontSize = fontSize;
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

    ListView = function(e){
        View.apply(this,[e]);
    };
    ListView.prototype = merge(View.prototype,{
        resizesToContent:false,
        computeFrame:function(){
            View.prototype.computeFrame.apply(this);
            if (this.resizesToContent) {
                if (this.horizontal) {
                    this.frame.width = 0;
                    if (this.subviews)
                        for (var i = 0; i < this.subviews.length; i++)
                            this.frame.width += this.subviews[i].frame.width;
                }
                else {
                    this.frame.height = 0;
                    if (this.subviews)
                        for (var i = 0; i < this.subviews.length; i++)
                            this.frame.height += this.subviews[i].frame.height;
                }
            }
        },
        render: function(){
            var canvas = this.getCanvas();

            var ctx = canvas.getContext('2d');
            var xx = 0;
            var yy = 0;
            if (this.subviews)
                for (var i = 0; i < this.subviews.length; i++){
                    ctx.drawImage(this.subviews[i].paint(),xx,yy);
                    if (this.horizontal)
                        xx += this.subviews[i].frame.width;
                    else
                        yy += this.subviews[i].frame.height;

                }
            return canvas;
        },
        horizontal: false
    });
    ScrollView = function(e){
        View.apply(this,[e]);
    };
    ScrollView.prototype = merge(View.prototype, {
        scrollx: 0,
        scrolly: 0,
        render: function () {
            var canvas = this.getCanvas();
            var ctx = canvas.getContext('2d');
            if (this.subviews){
                for (var i = 0; i < this.subviews.length; i++) {
                    var v = this.subviews[i];
                    ctx.drawImage(v.paint(), v.frame.x - this.scrollx, v.frame.y - this.scrolly);
                }
            }
            return canvas;
        },
        wheel: function(e){
            this.scroll(e.deltaX, e.deltaY);
        },
        scroll: function(dx,dy){
            this.scrollx += dx;
            this.scrolly += dy;
            this.scrollx = Math.max(this.scrollx,0);
            this.scrolly = Math.max(this.scrolly,0);
            var innerWidth = 0;
            var innerHeight = 0;
            for (var i = 0; i < this.subviews.length; i++){
                innerWidth = Math.max(innerWidth,this.subviews[i].frame.x + this.subviews[i].frame.width);
                innerHeight = Math.max(innerHeight,this.subviews[i].frame.y + this.subviews[i].frame.height);
            }
            this.scrollx = Math.min(this.scrollx,innerWidth - this.frame.width);
            this.scrolly = Math.min(this.scrolly,innerHeight - this.frame.height);
            this.setDirty();
        },
        mousedrag: function(e){
            if (e.which != 0){
                this.scroll(-e.movementX, -e.movementY);
            }
        }
    });
    ImageView = function(e){
        this.metrics = {
            x: 0,
            y: 0,
            width: 50,
            height: 50
        };
        this.frame = {
            x: 0,
            y: 0,
            width: 50,
            height: 50
        };
        this.image = new Image();
        this.image.onload = this.onload;
        for (var i in e){
            this[i] = e[i];
        }
        if (this.src.length > 0)
            this.image.src = this.src;
    };
    ImageView.prototype = merge(View.prototype, {
        render: function(){
            var canvas = this.getCanvas();
            if (this.image)
                canvas.getContext('2d').drawImage(this.image,0,0,canvas.width,canvas.height);
            return canvas;
        },
        onload: function(){
            this.setDirty();
        },
        setSrc: function(src){
            this.src = src;
            this.image.src = src;
        },
        src: ""
    });

        canvas.addEventListener("wheel",eventPasser);
    var lastx, lasty;
/*    canvas.addEventListener("mousemove",function(e){
        var x = e.clientX;
        var y = e.clientY;

        var hit = false;
        if (root)
            hit = root.hitTest(x,y, "mousedrag");

        if (hit)
            hit["mousedrag"](e);
        lastx = x;
        lasty = y;
    });*/
    var lastx, lasty, target;
    canvas.addEventListener("click",eventPasser);
    canvas.addEventListener("mousedown",function(e){
        var x = e.clientX;
        var y = e.clientY;
        lastx = x;
        lasty = y;
        var hit = false;
        if (root)
            hit = root.hitTest(x,y, "mousedrag");

        target = hit;
    });

    canvas.addEventListener("mousemove",function(e){
        if (target) {
            e.movementX = e.clientX - lastx;
            e.movementY = e.clientY - lasty;
            lastx = e.clientX;
            lasty = e.clientY;
            target.mousedrag(e);
        }
        else{
            canvas.cursor = "normal";
            if (root.hitTest(e.clientX, e.clientY, "click")){
                canvas.cursor = "pointer";
            }
        }
    });
    canvas.addEventListener("mouseup",dragdone);
    canvas.addEventListener("mouseout",dragdone);
    function dragdone(){
        target = false;
    }
    function eventPasser(e){
        var x = e.clientX;
        var y = e.clientY;
        var hit = false;
        if (root)
            hit = root.hitTest(x,y, e.type);

        if (hit)
            hit[e.type](e);
    }
})();
