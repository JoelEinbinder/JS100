var root, View, TextView, ResizingView, ListView, ScrollView;
(function() {
    var debugging = false;
    var debug, panel, editor = null;
    var debugsize = 500;
    function toggleDebug(){

        if (debugging){
            debugging = false;
            debug.removeView(root);
            root.metrics = {
                x:0,
                y:0,
                scalar:{
                    height:1,
                    width: 1
                }
            };
            root.refreshFrame();

            return;
        }
        if (!debug){
            debug = new View({
                hitTest: function(x,y,event){
                    var ret = panel.hitTest(x ,y,event);
                    if (ret){
                        return ret;
                    }
                    return this;
                },
                click: function(e){
                    var f = View.prototype.hitTest.apply(this,[e.clientX, e.clientY, "click"]);
                    if (f){
                        panel.setFocus(f);
                    }
                }
            });
            panel = new ScrollView({
                metrics:{
                    x: -debugsize,
                    y: 0,
                    width: debugsize,
                    height: 0,
                    scalar:{
                        width:0,
                        height: 1,
                        x: 1,
                        y: 0
                    }
                },
                focus: null,
                backgroundColor:"black",
                setFocus: function(v){
                    this.focus = v;
                    this.subviews = [];
                    var lv = new ListView({
                        metrics:{
                            x:0,
                            y:0,
                            scalar:{
                                width:1,
                            }
                        },
                        resizesToContent:true,
                        backgroundColor:"black"
                    });
                    this.addSubview(lv)
                    for (var i in v) {
                        lv.addSubview(new TextView({
                            text: i+":",
                            metrics: {},
                            color:"white",
                            fontSize: 20,
                            font:"Courier",
                            decoration:"bold",
                            prop:i,
                            click:function(){

                                panel.editProperty(this.prop)
                            }
                        }));
                        lv.addSubview(new TextView({
                            text: ""+v[i],
                            metrics: {},
                            color:"white",
                            fontSize: 20,
                            font:"Courier",
                            prop:i,
                            click:function(){
                                panel.editProperty(this.prop)
                            }
                        }));
                        lv.addSubview(new View({
                            metrics:{
                                x:0,y:0,
                                height:50

                            }
                        }));
                    }
                    this.setDirty();
                },
                editProperty: function(prop){
                    this.subviews = [];
                    if (this.focus[prop] instanceof Function)
                        editor = new RTE(this.focus[prop] + "");
                    else
                        editor = new RTE('"' + this.focus[prop] + '"\n');
                    //console.log(this.focus,prop,editor);
                    editor.prop = prop;
                    this.addSubview(editor);
                    this.scroll(0,0);
                }
            });
            debug.refreshFrame();
            debug.addSubview(panel);
        }
        debugging = true;
        root.metrics = {
            x:0,
            y:0,
            width:-debugsize,
            height: 0,
            scalar:{
                height:1,
                width: 1
            }
        };
        debug.addSubview(root);

    }
    document.addEventListener("DOMContentLoaded", init);
    var canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    window.onresize = resize;
    var setup = false;
    function resize(){
        setup = true;
        canvas.setAttribute("width",window.innerWidth);
        canvas.setAttribute("height",window.innerHeight);
        if (debugging){
            debug.refreshFrame();
        }
        else
            root.refreshFrame();
        paint(0, true)
    }
    function wholeFrame(){
        if (!setup){
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }
        }
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
            if (debugging) {
                debug.tick();
                ctx.drawImage(debug.paint(), 0, 0);
            }
            else {
                root.tick();
                ctx.drawImage(root.paint(), 0, 0);
            }
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
                    if (typeof v.metrics.alpha == "number")
                        ctx.globalAlpha = v.metrics.alpha;
                    ctx.drawImage(v.paint(), v.frame.x, v.frame.y);
                    ctx.globalAlpha = 1;
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
                if (this.superview.layoutSubview)
                    this.superview.layoutSubview(this);
                else {
                    if (this.metrics) {
                        var frame = {
                            x: this.metrics.x,
                            y: this.metrics.y,
                            width: this.metrics.width,
                            height: this.metrics.height
                        };
                        for (var i in frame) {
                            if (!frame[i]) {
                                frame[i] = 0;
                            }
                        }
                        if (this.metrics.scalar) {
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
            }
            else{
                this.frame = wholeFrame();
            }
        },
        checkFrame: function(){
            var oldframe = this.frame;
            this.computeFrame();
            if (this.firstFrame){
                this.setDirty();
                this.firstFrame = false;
                return true;
            }
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
        makeAnimation: function(end,length, done){
            var start = {
                alpha: (typeof this.metrics.alpha == "number") ? this.metrics.alpha : 1,
                x: this.metrics.x || 0,
                y: this.metrics.y || 0,
                width: this.metrics.width || 0,
                height: this.metrics.height || 0,
                scalar:{
                    x:0,y:0,width:0,height:0
                }
            };
            if (this.metrics.scalar) {
                start.scalar.x = this.metrics.scalar.x || 0;
                start.scalar.y = this.metrics.scalar.y || 0;
                start.scalar.width = this.metrics.scalar.width || 0;
                start.scalar.height = this.metrics.scalar.height || 0;
            }
            this.animation = new Animation({
                start: start,
                end: end,
                length: length,
                duration: length,
                done: done
            });
        },
        tick: function(){

            if (this.animation){
                this.metrics = this.animation.tick();
                if (this.animation.duration <= 0){
                    if (this.animation.done)
                        this.animation.done();
                    this.animation = null;
                }
                this.refreshFrame();
            }
            if (this.subviews)
                for (var i = 0; i < this.subviews.length; i++){
                    if (this.subviews[i].tick())
                        this.subviews[i].tick();
                }
        },
        removeView: function(v){
            if (this.subviews)
                for (var i = 0; i < this.subviews.length; i++){
                    if (this.subviews[i] == v){
                        this.subviews.splice(i,1);
                        this.refreshFrame();
                        return;
                    }
                }

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
            ctx.textBaseline = "top";
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
        /*render: function(){
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
        },*/
        layoutSubview:function(subview){
            var xx = 0,
                yy = 0;
            for (var i = 0; i < this.subviews.length; i++){
                var v = this.subviews[i];
                if (v == subview){
                    var w = 0;
                    var wx = 0;
                    var h = 0;
                    var hx = 0;
                    var frame = {x: 0, y: 0, width:0, height:0};
                    if (subview.metrics && subview.metrics.width)
                        w = subview.metrics.width;
                    if (subview.metrics && subview.metrics.height)
                        h = subview.metrics.height;

                    if (subview.metrics && subview.metrics.scalar && subview.metrics.scalar.width)
                        wx = subview.metrics.scalar.width;
                    if (subview.metrics && subview.metrics.scalar && subview.metrics.scalar.height)
                        hx = subview.metrics.scalar.height;

                    if (this.horizontal) {
                        frame.height = this.frame.height;
                        frame.width = w + wx * this.frame.width;
                    }
                    else {
                        frame.width = this.frame.width;
                        frame.height = h + hx * this.frame.height;
                    }

                    frame.x = xx;
                    frame.y = yy;
                    subview.frame = frame;
                }
                else{
                    if (this.horizontal)
                        xx += Math.floor(v.frame.width);
                    else
                        yy += Math.floor(v.frame.height);
                }
            }
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
                    if (typeof v.metrics.alpha == "number")
                        ctx.globalAlpha = v.metrics.alpha;
                    ctx.drawImage(v.paint(), v.frame.x - this.scrollx, v.frame.y - this.scrolly);
                    ctx.globalAlpha = 1;
                }
            }
            return canvas;
        },
        hitTest: function(x,y,event){
            if (x > this.frame.x && x < this.frame.x + this.frame.width)
                if (y > this.frame.y && y < this.frame.y + this.frame.height){
                    if (this.subviews)
                        for (var i = 0; i < this.subviews.length; i++){
                            var hit = this.subviews[i].hitTest(x-this.frame.x + this.scrollx,y-this.frame.y + this.scrolly,event);
                            if (hit)
                                return hit;
                        }
                    if (!event || this[event])
                        return this;
                }
            return false;
        },

        wheel: function(e){
            this.scroll(e.deltaX, e.deltaY);
        },
        scroll: function(dx,dy){
            this.scrollx += dx;
            this.scrolly += dy;
            var innerWidth = 0;
            var innerHeight = 0;
            for (var i = 0; i < this.subviews.length; i++){
                innerWidth = Math.max(innerWidth,this.subviews[i].frame.x + this.subviews[i].frame.width);
                innerHeight = Math.max(innerHeight,this.subviews[i].frame.y + this.subviews[i].frame.height);
            }
            this.scrollx = Math.min(this.scrollx,innerWidth - this.frame.width);
            this.scrolly = Math.min(this.scrolly,innerHeight - this.frame.height);
            this.scrollx = Math.max(this.scrollx,0);
            this.scrolly = Math.max(this.scrolly,0);
            this.setDirty();
        },
        mousedrag: function(e){
            if (e.which != 0){
                this.scroll(-e.movementX, -e.movementY);
            }
        },
        touchmove: function(e){
            if (e.touches.length == 1){
                this.scroll(-e.clientX,-e.clientY)
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
        var me = this;
        this.image.onload = function(){
            me.setDirty();
        };
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
        setSrc: function(src){
            this.src = src;
            this.image = new Image();
            var me = this;
            this.image.onload = function(){
                me.setDirty();
            };
            this.image.src = src;
        },
        src: ""
    });
    function Animation(e){
        for (var i in e){
            this[i] = e[i];
        }
    }
    function blend(start,end,ratio){
        if (typeof end == "undefined")
            return start;
        if (typeof start == "number"){
            return start*(1-ratio) + end * ratio;
        }
        if (typeof start == "object"){
            var ret = {};
            for (var i in start){
                ret[i] = blend(start[i],end[i],ratio);
            }
            return ret;
        }
        return end;
    }
    Animation.prototype = {
        duration: 10,
        length: 10,
        start: {},
        end: {},
        tick: function(){
            this.duration --;
            if (this.duration <= 0) {
                return blend(this.start,this.end,1);
            }
            var ratio = this.duration / this.length;
            return blend(this.start,this.end,1-ratio);

        }

    };
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
    canvas.addEventListener("touchmove",function(e){
        if (e.touches.length >= 1) {

            if (target) {

                e.touches[0].movementX = e.touches[0].clientX - lastx;
                e.touches[0].movementY = e.touches[0].clientY - lasty;
                lastx = e.touches[0].clientX;
                lasty = e.touches[0].clientY;
                target.mousedrag(e.touches[0]);
            }
        }
    });
    canvas.addEventListener("touchend",dragdone);
    canvas.addEventListener("touchstart",function(e){
        if (e.touches.length == 1) {
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            lastx = x;
            lasty = y;
            var hit = false;
            if (root)
                hit = root.hitTest(x, y, "mousedrag");

            target = hit;
        }
    });
    canvas.addEventListener("touchcancel",dragdone);
    canvas.addEventListener("touchleave",dragdone);
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
            canvas.style.cursor = "inherit";
            if (root.hitTest(e.clientX, e.clientY, "click")){
                canvas.style.cursor = "pointer";
            }
        }
    });
    canvas.addEventListener("mouseup",dragdone);
    canvas.addEventListener("mouseout",dragdone);
    function dragdone(e){
        if (e.touches.length == 1){
            if (root.hitTest(e.touches[0].clientX, e.touches[0].clientY, "click") == target){
                target.click(e.touches[0]);
            }
        }
        target = false;
    }
    function eventPasser(e){
        var x = e.clientX;
        var y = e.clientY;
        var hit = false;
        if (debugging)
            hit = debug.hitTest(x,y, e.type);
        else if (root)
            hit = root.hitTest(x,y, e.type);

        //console.log(e.type,hit);
        if (hit)
            hit[e.type](e);
    }
    document.addEventListener("keydown", function(e){
        if (e.ctrlKey && e.which == 65){
            if (editor){
                //console.log("got editor!")
                panel.focus[editor.prop] = eval("["+editor.getText()+"]")[0];
                panel.focus.refreshFrame();
                panel.focus.setDirty();
                panel.setFocus(panel.focus);
                editor = null;
            }
            else
                toggleDebug();
        }
    });

})();





function RTE(startText) {
    var me = this;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    var fonts = [
        {
            font: "20px Georgia",
            height: 20
        },
        {
            font: "40px Georgia",
            height: 40
        },
        {
            font: "70px Georgia",
            height: 70
        },
        {
            font: "30px Georgia Italic",
            height: 30
        }
    ];

    function Segment(o) {
        this.lines = [];
        this.y = 0;
        this.font = fonts[0];
        for (var i in o) {
            this[i] = o[i];
        }
        this.calcLines();
    }

    Segment.prototype.lh = function () {
        return this.font.height + 5;
    };
    Segment.prototype.text = "";
    Segment.prototype.getIndent = function (i) {
        return Math.max(getIndent(this.y + this.lh() * i), getIndent(this.y + this.lh() * (i + 1)));
    };
    Segment.prototype.calcLines = function () {
        var lines = [];
        var text = this.text;
        var lastsubstr = text;
        var start = 0;
        ctx.font = this.font.font;
        for (var i = 0; i < this.text.length; i++) {
            var substr = text.substring(start, i);
            if (ctx.measureText(substr).width + this.getIndent(lines.length) > canvas.width - 20) {
                lines.push(lastsubstr);
                start = i - 1;
            }

            lastsubstr = substr;

        }
        if (text.length > start) {
            lines.push(text.substring(start));
        }
        this.lines = lines;
    };
    Segment.prototype.offsetPosition = function (offset) {
        var total = 0;
        var x = this.getIndent(0);
        var y = 0;
        ctx.font = this.font.font;
        for (var i = 0; i < this.lines.length; i++) {
            total += this.lines[i].length;
            if (total >= offset) {
                y = i * this.lh();
                x = ctx.measureText(this.lines[i].substring(0, offset - total + this.lines[i].length)).width + this.getIndent(i);
                break;
            }
        }
        return {
            x: x,
            y: y
        };
    };

    Segment.prototype.calcHeight = function () {
        return Math.max(this.lh() * this.lines.length, this.lh());
    };
    Segment.prototype.draw = function (y) {
//    var x = h;
        if (!this.y && y !== 0)
            this.y = y - this.lh();

        this.y = (y - this.y) * .2 + this.y;
        if (Math.abs(this.y - y) < .01) {
            this.y = y;
        }
        this.calcLines();

        if (cursor.segment === this) {
            ctx.fillStyle = "rgba(0,0,0,.05)";
            ctx.fillRect(2.5, this.y + 2.5, canvas.width - 5, this.calcHeight() - 5);
        }
        var offset = 0;
        for (var i = 0; i < this.lines.length; i++) {
            ctx.fillStyle = "rgba(0,0,0,.8)";
            ctx.fillText(this.lines[i], this.getIndent(i), this.y + offset + this.font.height);
            offset += this.lh();
        }
        return offset;
    };
    Segment.prototype.click = function (x, y, dragging) {
        if (y > this.y && y < this.y + this.calcHeight()) {
            var offset = this.getOffset(x, y - this.y);
            selectLine(this, offset, dragging);
            return true;
        }
        return false;
    };
    Segment.prototype.getOffset = function (x, y) {
        this.calcLines();
        var offset = 0;
        var height = 0;
        for (var i = 0; i < this.lines.length; i++) {
            height += this.lh();
            if (height > y) {
                break;
            }
            offset += this.lines[i].length;
        }

        if (offset < this.text.length) {
            var text = this.lines[i];
            ctx.font = this.font.font;
            var lastWidth = 0;
            for (var j = 0; j < text.length; j++) {
                var width = ctx.measureText(text.substring(0, j)).width - this.getIndent(i);
                if (width > x) {
                    if (width - x > x - lastWidth) {
                        j--;
                    }
                    break;
                }
                lastWidth = width;
            }
            offset += j;
        }
        return offset;
    };
    function Formatter(o) {
        for (var i in o) {
            this[i] = o[i];
        }
    }

    Formatter.prototype.x = 0;
    Formatter.prototype.y = 0;
    Formatter.prototype.w = 0;
    Formatter.prototype.h = 0;
    Formatter.prototype.alpha = 0;
    Formatter.prototype.visible = false;
    Formatter.prototype.draw = function () {
        if (this.visible)
            this.alpha += .2;
        else
            this.alpha -= .2;


        this.alpha = Math.min(this.alpha, 1);
        this.alpha = Math.max(this.alpha, 0);

        if (this.alpha <= 0)
            return;

        ctx.globalAlpha = this.alpha;
        var part = 0;
        var max = 0;
        var padding = 4;
        var widths = [];
        for (var i = 0; i < fonts.length; i++) {
            ctx.font = fonts[i].font;
            widths[i] = ctx.measureText("a").width;
            part = Math.max(widths[i], part);
            max = Math.max(max, fonts[i].height);
        }
        max = max / 2;
        var size = (part + 5) * fonts.length;
        ctx.fillStyle = 'rgba(0,0,0,.75)';
        this.w = size;
        this.h = max;
        //ctx.fillRect(this.x - this.w / 2, this.y - padding, this.w, max + padding * 2);
        roundedRectangle(this.x - this.w / 2, this.y - padding, this.w, max + padding * 2, 10);

        ctx.fillStyle = "#FFF";
        size = 0;
        for (var i = 0; i < fonts.length; i++) {
            ctx.font = fonts[i].font;
            ctx.fillText("a", size + this.x + (part - widths[i]) / 2 - this.w / 2, this.y + max + (fonts[i].height / 2 - max) / 2);
            size += part + 5;
        }
        ctx.globalAlpha = 1;

    };
    Formatter.prototype.click = function (x, y) {
        if (x > this.x - this.w / 2 && x < this.x + this.w / 2) {
            if (y > this.y && y < this.y + this.h) {
                var i = Math.floor(fonts.length * (x - this.x + this.w / 2) / (this.w));
                cursor.segment.font = fonts[i];
                draw();
                return true;
            }
        }
        return false;
    };
    function FloatImage(o) {
        for (var i in o) {
            this[i] = o[i];
        }
        if (!this.w && !this.h && this.img) {
            this.w = Math.min(this.img.width, canvas.width / 2);
            this.h = this.img.height * this.w / this.img.width;
        }
    }

    FloatImage.prototype = {
        img: null,
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        draw: function () {
            if (!this.img)
                return;
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        }
    };
    function Cursor(o) {
        for (var i in o) {
            this[i] = o[i];
        }
    }

    Cursor.prototype = {
        segment: null,
        offset: 0,
        collapsed: true,
        anchorSegment: null,
        anchorOffset: 0,
        draw: function () {
            var point = this.segment.offsetPosition(this.offset);
            ctx.fillStyle = "rgba(0,0,0,.6)";
            if (true){//this.anchorSegment === this.segment && this.anchorOffset === this.offset) {
                if (!document.hasFocus || document.hasFocus())
                    ctx.fillRect(Math.max(point.x - 1, 0), this.segment.y + point.y, 2, this.segment.lh());
            }
            else {
                var anchor = this.anchorSegment.offsetPosition(this.anchorOffset);
                var startx = (anchor.x < point.x) ? anchor.x : point.x;
                var starty = (this.anchorSegment.y + anchor.y < this.segment.y + point.y) ? this.anchorSegment.y + anchor.y : this.segment.y + point.y;
                var endx = (anchor.x > point.x) ? anchor.x : point.x;
                var endy = (this.anchorSegment.y + anchor.y > this.segment.y + point.y) ? this.anchorSegment.y + anchor.y : this.segment.y + point.y;

                roundedRectangle(startx, starty, endx - startx, endy - starty + this.segment.lh(), 3);
            }
            var xx = point.x;
            xx = Math.max(formatter.w / 2, xx);
            xx = Math.min(canvas.width - formatter.w / 2, xx);
            formatter.x = formatter.x + (xx - formatter.x) * .4;
            var yy = this.segment.y + point.y + this.segment.lh();
            formatter.y = formatter.y + (yy - formatter.y) * .4;
        },
        collapse: function () {
            this.segment = this.anchorSegment;
            this.offset = this.anchorOffset;
        }
    };
    var formatter = new Formatter();
    var segments = [];
    var floaters = [];
    var cursor = new Cursor();
    var lines = startText.split("\n");
    for (var i = 0 ; i < lines.length; i++) {
        segments.push(new Segment({
            text: lines[i]
        }));
    }
    selectLine(1);
    function draw(update) {
        var h = 0;
        for (var i = 0; i < segments.length; i++) {
            h = Math.max(h, segments[i].calcHeight() + segments[i].y);
        }
        canvas.height = h + 100;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgb(50,50,50)';
        var y = 0;//segments[0].lh();
        for (var i = 0; i < segments.length; i++) {
            var segment = segments[i];
            ctx.font = segment.font.font;
            segment.draw(y);
            y += segment.calcHeight();
        }
        cursor.draw();
        for (var i = 0; i < floaters.length; i++) {
            floaters[i].draw();
        }
        formatter.draw();


        me.setDirty();
        //ctx.strokeStyle = "#000";
        //ctx.strokeRect(0,0,canvas.width,canvas.height);
    }

    setInterval(function () {
        draw(true);
    }, 30);
    /*setInterval(function(){
     drawCursor = !drawCursor;
     },300);*/


    function resize() {
        canvas.width = 800;
        canvas.height = window.innerHeight;
        draw();
    }

    this.computeFrame = function(){
        if (!this.superview)
            return;
        this.frame = {x:0,y:0,width:this.superview.frame.width,height:this.superview.frame.height};
        canvas.width = this.frame.width;
        canvas.height = this.frame.height;
    };


    resize();
    window.onresize = resize;
    document.onkeypress = function (e) {
        insertText(String.fromCharCode(e.charCode));
        draw();
        e.preventDefault();
    };
    this.click = function (e) {
        clickScreen(e);
    };
    this.mousemove = function (e) {
        if (e.which === 1) {
            clickScreen(e, true);
        }
    };
    function clickScreen(e, dragging) {
        var offsetx = e.offsetX ? e.offsetX : e.layerX;
        var offsety = e.offsetY ? e.offsetY : e.layerY;
        if (formatter.visible && !dragging) {
            if (formatter.click(offsetx, offsety)) {
                return;
            }
        }
        //formatter.visible = true;
        for (var i = 0; i < segments.length; i++) {
            if (segments[i].click(offsetx, offsety, dragging)) {
                return;
            }
        }
    }

    document.onkeydown = function (e) {
        switch (e.which) {
            // backspace
            case 8:
                deleteText(cursor.segment, cursor.offset - 1, cursor.offset);
                draw();
                e.preventDefault();
                break;

            // tab
            case 9:
                insertText("    ");
                draw();
                e.preventDefault();
                break;
            case 38:
                moveUp();
                e.preventDefault();
                break;
            case 40:
                moveDown();
                e.preventDefault();
                break;
            case 37:
                moveLeft();
                e.preventDefault();
                break;
            case 39:
                moveRight();
                e.preventDefault();
                break;
            case 27:
                formatter.visible = !formatter.visible;
                e.preventDefault();
                break;
        }
    };
    function moveLeft() {
        if (cursor.offset > 0) {
            cursor.offset--;
            draw();
        }
        else {
            moveUp(true);
        }
    }

    function moveRight() {
        if (cursor.offset < cursor.segment.text.length) {
            cursor.offset++;
            draw();
        }
        else {
            moveDown(true);
            cursor.offset = 0;
        }
    }

    function moveUp(horiz) {
        var offsetPos = cursor.segment.offsetPosition(cursor.offset);
        if (horiz)
            selectPosition(canvas.width, cursor.segment.y + offsetPos.y - 1);
        else {
            selectPosition(offsetPos.x, cursor.segment.y + offsetPos.y - 1);
        }
        draw();

    }

    function getBottom() {
        return segments[segments.length - 1].y + segments[segments.length - 1].calcHeight();
    }

    function selectPosition(x, y, dragging) {
        if (y < 0) {
            y = 0;
            x = 0;
        }
        if (y > getBottom()) {
            y = getBottom() - 1;
            x = canvas.width;
        }
        for (var i = 0; i < segments.length; i++) {
            var segment = segments[i];
            if (y >= segment.y && y < segment.y + segment.calcHeight()) {
                selectLine(segment, segment.getOffset(x, y - segment.y), dragging);
                return;
            }
        }
    }

    function roundedRectangle(x, y, w, h, radius, topLeft, topRight, botLeft, botRight) {
        if (typeof topLeft === "undefined")
            topLeft = true;
        if (typeof topRight === "undefined")
            topRight = true;
        if (typeof botLeft === "undefined")
            botLeft = true;
        if (typeof botRight === "undefined")
            botRight = true;
        if (typeof radius === "undefined")
            radius = Infinity;

        radius = Math.min(radius, w / 2, h / 2);
        ctx.beginPath();
        if (topLeft) {
            ctx.moveTo(x, y + radius);
            ctx.arc(x + radius, y + radius, radius, Math.PI, -Math.PI / 2);

        }
        else {
            ctx.moveTo(x, y);
        }
        if (topRight) {
            ctx.lineTo(x + w - radius, y);
            ctx.arc(x + w - radius, y + radius, radius, -Math.PI / 2, 0);
        }
        else {
            ctx.lineTo(x + w, y);
        }

        if (topLeft) {
            ctx.lineTo(x + w, y + h - radius);
            ctx.arc(x + w - radius, y + h - radius, radius, 0, Math.PI / 2);
        }
        else {
            ctx.lineTo(x + w, y + h);
        }

        if (botLeft) {
            ctx.lineTo(x + radius, y + h);
            ctx.arc(x + radius, y + h - radius, radius, Math.PI / 2, Math.PI);
        }
        else {
            ctx.lineTo(x, y + h);
        }
        if (botRight) {
            ctx.lineTo(x, y + radius);
        }
        else {
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
    }

    function moveDown(horiz) {
        var offsetPos = cursor.segment.offsetPosition(cursor.offset);
        if (horiz)
            selectPosition(0, cursor.segment.y + offsetPos.y + cursor.segment.lh() + 1);
        else {
            selectPosition(offsetPos.x, cursor.segment.y + offsetPos.y + cursor.segment.lh() + 1);
        }
        draw();


    }

    function selectLine(line, offset, dragging) {
        if (typeof line === "number") {
            line = segments[line];
        }

        cursor.anchorSegment = line;
        if (typeof offset == "undefined") {
            cursor.anchorOffset = line.text.length;
        }
        else {
            cursor.anchorOffset = Math.min(offset, line.text.length);
        }
        if (!dragging) {
            cursor.collapse();
        }
    }

    function insertText(text) {
        formatter.visible = false;
        if (text === "\r" || text === "\n") {
            var s;
            if (cursor.offset < cursor.segment.text.length) {
                s = new Segment({
                    text: cursor.segment.text.substring(cursor.offset),
                    font: cursor.segment.font
                });
                cursor.segment.text = cursor.segment.text.substring(0, cursor.offset);
            }
            else {
                s = new Segment();
            }
            for (var i = 0; i < segments.length; i++) {
                if (segments[i] === cursor.segment) {
                    break;
                }
            }
            segments.splice(i + 1, 0, s);
            selectLine(s, 0);

            return;
        }
        cursor.segment.text = cursor.segment.text.substring(0, cursor.offset) + text + cursor.segment.text.substring(cursor.offset);
        cursor.offset += text.length;
    }

    function deleteText(segment, start, end) {
        formatter.visible = false;
        if (segment.text.length) {
            if (start >= 0) {
                segment.text = segment.text.slice(0, start) + segment.text.slice(end);
                if (segment === cursor.segment) {
                    if (cursor.offset > start) {
                        if (cursor.offset > end) {
                            cursor.offset -= (end - start);
                        }
                        else {
                            cursor.offset = start;
                        }
                    }
                }
            }
            else {
                if (segment !== segments[0]) {
                    var index = findSegment(segment);
                    if (index < 0)
                        return;
                    segments[index - 1].text += segment.text;
                    selectLine(segments[index - 1], segments[index - 1].text.length - segment.text.length);
                    segments.splice(index, 1);
                }
            }
        }
        else {
            if (segment !== segments[0]) {
                var index = findSegment(segment);
                if (index < 0)
                    return;
                selectLine(segments[index - 1]);
                segments.splice(index, 1);
            }
        }
    }

    function findSegment(segment) {
        for (var i = 0; i < segments.length; i++) {
            if (segment == segments[i]) {
                return i;
            }
        }
        return -1;
    }

    function getIndent(y) {
        for (var i = 0; i < floaters.length; i++) {
            if (y > floaters[i].y && y < floaters[i].y + floaters[i].h) {
                return floaters[i].w;
            }
        }
        return 0;
    }

    /*document.ondrop = function (e) {

     e.preventDefault();
     console.log(e.dataTransfer.files);
     var html = e.dataTransfer.getData('text/html');
     if (html.indexOf("<img") === 0) {
     //its an image
     var div = document.createElement("div");
     div.innerHTML = html;
     var img = div.firstChild;
     if (img.tagName.toLocaleLowerCase() === "img") {
     var src = img.src;
     img = new Image();
     img.src = src;
     addImage(img);
     return;
     }
     }
     };*/
    function addImage(img) {
        var point = cursor.segment.offsetPosition(cursor.offset);
        floaters.push(new FloatImage({
            img: img,
            x: 0,
            y: point.y + cursor.segment.y
        }))
    }

    /*canvas.ondragover = function (e) {
     console.log(e.dataTransfer.getData('text/uri-list'));
     e.preventDefault();
     };*/
    this.paint = function(){
        return canvas;
    };
    this.getText = function(){
        var t = "";
        for (var i = 0; i < segments.length; i++){
            if (i)
                t += "\n"
            t = t + segments[i].text;
        }
        return t;
    }
}
RTE.prototype = View.prototype;