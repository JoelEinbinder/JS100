(function() {
    /*
    myV = new View({
        backgroundColor: "#000",
        metrics: {
            scalar: {
                width: 1,
                height: 1
            }
        }
    });
    root.addSubview( myV );
    */

	var titleWrapper = new View({
		color: "rgb(0,0,255)",
        metrics: {
            x: 10,
            y: 10,
            scalar: {
                width: 0.1,
                height: 0.4
            }
        }
	});
	titleWrapper.addSubview(new TextView({
		metrics: {
			x: 10,
			y: 10,
			scalar: {
				width: 0.7,
				height: 0.6
			}
		},
		text: "Yo yo"
	}));
    root.addSubview(titleWrapper);

    function gridify( parent, n ) {
        for (var i = 0; i < n; i++) {

        }
    }
})();
