(function() {
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
})();
