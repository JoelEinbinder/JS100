/**
 * Created by joel on 2/21/15.
 */
root = new View();
root.addSubview(new ResizingView({
    backgroundColor:false,
    metrics:{
        x: -25,
        y: 100,
        width: 0,
        height: 0,
        scalar: {
            x:.5
        }
    }
}));
var tv = new TextView({
    color:"blue",
    text:"This thing will wrap a lot",
    metrics:{
        width: 50,
        height: 50
    }
});
root.subviews[0].addSubview(tv);
var sv = new ScrollView({
    metrics:{
        x:100,y:20,width:50,height:50
    }
});
root.addSubview(sv);
var li = new ListView({
    metrics: {
        x: 0,
        y: 0,
        width: 50
    }
});
sv.addSubview(li);
li.addSubview(new TextView({
    metrics:{
        scalar:{
            width:1
        }
    },
    text:"woo lol ollolool adsf"
}));
li.addSubview(new ImageView({
    metrics:{
        scalar:{
            width:1
        },
        height: 20
    },
    src:"http://www.firecaster.com/firecaster.svg"
}));