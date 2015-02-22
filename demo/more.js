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
    var groups = getPanels(panelData.data[2])
    var apps = getPanels(panelData.data[3])
    var friends = getPanels(panelData.data[4])
    var interests = getPanels(panelData.data[5])
    var pages = getPanels(panelData.data[6])
    var helps = getPanels(panelData.data[7])

    for (var i = 0; i < profile.length; i++) {
        contentList.addSubview(profile[i]);
    }

    favorite = new View({
        backgroundColor: "#f7f7f7",
        metrics: {
            x: 0,
            y: 0,
            height: 25,
            scalar: {
                width: 1
            }
        },
        strokeColor: "gray"
    });

    favorite.addSubview(new TextView({
        metrics: {
            x: 5,
            y: 5,
            scalar: {
                height: 1,
                width: 1
            }
        },
        text: "FAVORITES",
        fontSize: 12
    }))


    contentList.addSubview(favorite);

    for (var i = 0; i < favorites.length; i++) {
        contentList.addSubview(favorites[i]);
    }

    group = new View({
        backgroundColor: "#f7f7f7",
        metrics: {
            x: 0,
            y: 0,
            height: 25,
            scalar: {
                width: 1
            }
        },
        strokeColor: "gray"
    });

    group.addSubview(new TextView({
        metrics: {
            x: 5,
            y: 5,
            scalar: {
                height: 1,
                width: 1
            }
        },
        text: "GROUPS",
        fontSize: 12
    }))


    contentList.addSubview(group);

    for (var i = 0; i < groups.length; i++) {
        contentList.addSubview(groups[i]);
    }

    app = new View({
        backgroundColor: "#f7f7f7",
        metrics: {
            x: 0,
            y: 0,
            height: 25,
            scalar: {
                width: 1
            }
        },
        strokeColor: "gray"
    });

    app.addSubview(new TextView({
        metrics: {
            x: 5,
            y: 5,
            scalar: {
                height: 1,
                width: 1
            }
        },
        text: "APPS",
        fontSize: 12
    }))


    contentList.addSubview(app);

    for (var i = 0; i < apps.length; i++) {
        contentList.addSubview(apps[i]);
    }

    friend = new View({
        backgroundColor: "#f7f7f7",
        metrics: {
            x: 0,
            y: 0,
            height: 25,
            scalar: {
                width: 1
            }
        },
        strokeColor: "gray"
    });

    friend.addSubview(new TextView({
        metrics: {
            x: 5,
            y: 5,
            scalar: {
                height: 1,
                width: 1
            }
        },
        text: "FRIENDS",
        fontSize: 12
    }))

    contentList.addSubview(friend);

    for (var i = 0; i < friends.length; i++) {
        contentList.addSubview(friends[i]);
    }

    interest = new View({
        backgroundColor: "#f7f7f7",
        metrics: {
            x: 0,
            y: 0,
            height: 25,
            scalar: {
                width: 1
            }
        },
        strokeColor: "gray"
    });

    interest.addSubview(new TextView({
        metrics: {
            x: 5,
            y: 5,
            scalar: {
                height: 1,
                width: 1
            }
        },
        text: "INTERESTS",
        fontSize: 12
    }))

    contentList.addSubview(interest);

    for (var i = 0; i < interests.length; i++) {
        contentList.addSubview(interests[i]);
    }

    page = new View({
        backgroundColor: "#f7f7f7",
        metrics: {
            x: 0,
            y: 0,
            height: 25,
            scalar: {
                width: 1
            }
        },
        strokeColor: "gray"
    });

    page.addSubview(new TextView({
        metrics: {
            x: 5,
            y: 5,
            scalar: {
                height: 1,
                width: 1
            }
        },
        text: "PAGES",
        fontSize: 12
    }))

    contentList.addSubview(page);

    for (var i = 0; i < pages.length; i++) {
        contentList.addSubview(pages[i]);
    }

    help = new View({
        backgroundColor: "#f7f7f7",
        metrics: {
            x: 0,
            y: 0,
            height: 25,
            scalar: {
                width: 1
            }
        },
        strokeColor: "gray"
    });

    help.addSubview(new TextView({
        metrics: {
            x: 5,
            y: 5,
            scalar: {
                height: 1,
                width: 1
            }
        },
        text: "HELP & SETTINGS",
        fontSize: 12
    }))

    contentList.addSubview(help);

    for (var i = 0; i < helps.length; i++) {
        contentList.addSubview(helps[i]);
    }

    content.addSubview(contentList);

    function getPanels(data) {
        var panel = [];
        for (var i = 0; i < data.numPanels; i++) {
            var panelRow = new View({
                metrics: {
                    x: 0,
                    y: 0,
                    height: 45,
                    scalar: {
                        width: 1
                    }
                },
                strokeColor: "gray"
            });

            panelRow.addSubview(new ImageView({
                metrics: {
                    x: 7.5,
                    y: 7.5,
                    width: 30,
                    height: 30
                },
                src:data.panels.img[i]
            }))

            panelRow.addSubview(new TextView({
                metrics: {
                    x: 45,
                    y: 15,
                    height: 20,
                    scalar: {
                        width:0.5
                    }
                },
                text: data.panels.name[i],
                fontSize: 16
            }))

            if (data.panels.notification[i]) {
                notif = new View({
                    metrics: {
                        x: -30,
                        y: 12.5,
                        width: 20,
                        height: 20,
                        scalar: {
                            x: 1
                        }
                    },
                    backgroundColor: "blue",
                    strokeColor:"white"
                });

                notif.addSubview(new TextView({
                    metrics: {
                        x: 0,
                        y: 5,
                        width: 20,
                        height: 20,
                    },
                    text: data.panels.numNotification[i].toString(),
                    color: "white",
                    fontSize: 10,
                    justify: "center"
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
                        "name": ["Matt Ho"],
                        "notification": [false],
                        "numNotification": [0]
                    }
                },
                {
                    "numPanels": 3,
                    "panels": {
                        "img": ["http://upload.wikimedia.org/wikipedia/en/2/28/Deep_Fried_Man_portrait_-_real_name_Daniel_Friedman_-_South_African_Comedian.jpg",
                            "http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=33839070",
                            "https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/256/Live_Messenger_alt_3.png"],
                        "name": ["Friends","Plus","Messanges"],
                        "notification": [true, false, true],
                        "numNotification": [45, 0, 10]
                    }
                },
                {
                    "numPanels": 1,
                    "panels": {
                        "img": ["https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/512/rocket.png"],
                        "name": ["Rocketry Club"],
                        "notification": [true],
                        "numNotification":[5]
                    }
                },
                {
                    "numPanels": 2,
                    "panels": {
                        "img": ["https://cdn2.iconfinder.com/data/icons/facebook-svg-icons-1/64/all_friends-512.png",
                            "http://img3.wikia.nocookie.net/__cb20090227194712/java/images/0/0e/Camera_icon.gif"],
                        "name":["Find Friends","Photos"],
                        "notification": [false,false],
                        "numNotification":[0,0]
                    }
                },
                {
                    "numPanels": 1,
                    "panels": {
                        "img": ["http://www.sagegardencare.org/wp-content/uploads/2013/10/14-friend-icon.jpg"],
                        "name": ["Close Friends"],
                        "notification": [false],
                        "numNotification":[0]
                    }
                },
                {
                    "numPanels": 1,
                    "panels": {
                        "img": ["http://static.wixstatic.com/media/3d232a_43e8108f5f7b4e4fb407729dda897f32.png"],
                        "name": ["Pages and Public Figures"],
                        "notification": [true],
                        "numNotification":[15]
                    }
                },
                {
                    "numPanels": 1,
                    "panels": {
                        "img": ["http://thesocialskinny.com/wp-content/uploads/2011/04/pages-icon.png"],
                        "name": ["Create New Page"],
                        "notification": [false],
                        "numNotification":[0]
                    }
                },
                {
                    "numPanels": 1,
                    "panels": {
                        "img": ["http://rationalwiki.org/w/images/1/19/Question_icon.svg"],
                        "name": ["Help Center"],
                        "notification": [false],
                        "numNotification":[0]
                    }
                }

            ]
        }
    }
})();