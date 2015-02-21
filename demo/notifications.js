(function() {

    titleBar = getTitleBar();
    // notifications = getNotifications();

    lv = new ListView({
        backgroundColor: "#e1e1e1",
        metrics: {
            x: 0,
            y: 0,
            scalar: {
                width: 1,
                height: 1
            }
        }
    });
    for (var i = 0; i < 5; i++) {
        lv.addSubview(new View({
            backgroundColor: "#000",
            metrics: {
                x: 0,
                y: 0,
                scalar: {
                    width: 0.1,
                    height: 0.1
                }
            }
        }));
    }
    root.addSubview(lv);
    // root.addSubview(titleWrapper);
    
    function getTitleBar() {
        var fbBlue = "#3B5998"

        var titleWrapper = new View({
            backgroundColor: fbBlue,
            metrics: {
                x: 0,
                y: 0,
                scalar: {
                    width: 1,
                    height: 0.10
                }
            }
        });

        titleWrapper.addSubview(new TextView({
            color: "white",
            fontSize: 22,
            metrics: {
                x: 650,
                y: 20,
                scalar: {
                    width: 1,
                    height: 1
                }
            },
            text: "Notifications"
        }));
    }

    function getNotifications() {
        var notifications = getNotifications().data;
        for (var i = 0; i < notifications.length; i++) {
            var curNotification = notifications[i];
        }
    }

    function getNotifications() {
        return {
            data: [
                {
                "img": "some/where.jpg",
                "desc": "Abe Lincoln accepted your friend request. Write on Austin's timeline.",
                "iconDesc": "friendRequest",
                "when": "new Date().getTime()"
                },
                {
                "img": "some/where2.jpg",
                "desc": "Miley Cyrus added a new video.",
                "iconDesc": "content",
                "when": "new Date().getTime()"
                }
            ]
        }
    }
})();
