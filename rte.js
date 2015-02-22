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
            if (this.anchorSegment === this.segment && this.anchorOffset === this.offset) {
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
        formatter.visible = true;
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
    }
}
RTE.prototype = View.prototype;