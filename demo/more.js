(function () {
    root = new View();

    var title = new View({
        backgroundColor: "#3b5998",
        metrics: {
            x: 0,
            y: 0,
            height: 45,
            scalar: {
                width: 1
            }
        }
    });
    root.addSubview(title);

    title.addSubview(new TextView({
        metrics: {
            x: 0,
            y: 12.5,
            height: 20,
            scalar: {
                width: 1,
            }
        },
        justify: "center",
        color: "white",
        font:"Verdana",
        text: "More",
        fontSize: 20
    }));

    var content = new View({
        backgroundColor: false,
        metrics: {
            x: 0,
            y: 45,
            scalar: {
                width: 1,
                height: 0.9
            }
        },
        strokeColor: "white"
    })
    root.addSubview(content);

    var contentList = new ListView({
        metrics: {
            x: 0,
            y: 0,
            scalar: {
                width: 1,
                height: 1
            }
        },
    })

    var panelData = getPanelData();

    var profile = getPanels(panelData.data[0]);
    var favorites = getPanels(panelData.data[1]);

    for (var i = 0; i < profile.length; i++) {
        contentList.addSubview(profile[i]);
    }

    for (var i = 0; i < favorites.length; i++) {
        contentList.addSubview(favorites[i]);
    }

    content.addSubview(contentList);

    function getPanels(data) {
        var panel = [];
        for (var i = 0; i < data.numPanels; i++) {
            var panelRow = new View({
                metrics: {
                    x: 0,
                    y: 0,
                    height: 30,
                    scalar: {
                        width: 1
                    }
                },
                strokeColor: "gray"
            });

            panelRow.addSubview(new ImageView({
                metrics: {
                    x: 5,
                    y: 5,
                    width: 20,
                    height: 20
                },
                src:data.panels.img[i]
            }))

            panelRow.addSubview(new TextView({
                metrics: {
                    x: 30,
                    y: 5,
                    height: 20,
                    scalar: {
                        width:0.5
                    }
                },
                text: data.panels.name[i]
            }))

            if (data.panels.notification[i]) {
                notif = new View({
                    metrics: {
                        x: -40,
                        y: 5,
                        width: 35,
                        height: 20,
                        scalar: {
                            x: 1
                        }
                    },
                    backgroundColor: "blue"
                });

                notif.addSubview(new TextView({
                    metrics: {
                        x: 0,
                        y: 0,
                        scalar: {
                            width: 1,
                            height: 1
                        }
                    },
                    justified: "center",
                    text: data.panels.numNotification[i].toString()
                }))

                panelRow.addSubview(notif);

            };

            panel.push(panelRow);

        }
        return panel;
    }

    function getPanelData() {
        return {
            data: [
                {
                    "numPanels": 1,
                    "panels": {
                        "img": ["http://img1.wikia.nocookie.net/__cb20141108074537/powerlisting/images/5/5e/Amy-the-secret-life-of-the-american-teenager-19852399-500-375.jpg"],
                        "name": ["MattHo"],
                        "notification": [false],
                        "numNotification": [0]
                    }
                },
                {
                    "numPanels": 2,
                    "panels": {
                        "img": ["http://upload.wikimedia.org/wikipedia/en/2/28/Deep_Fried_Man_portrait_-_real_name_Daniel_Friedman_-_South_African_Comedian.jpg", "http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=33839070"],
                        "name": ["Friends","Plus"],
                        "notification": [true, false],
                        "numNotification": [45, 0]
                    }
                }
            ]
        }
    }
})();