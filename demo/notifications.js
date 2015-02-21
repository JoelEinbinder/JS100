(function() {
    root = new View()

    /* Parent listview = perfect for webpages */
    contentLV = new ListView({
        metrics: {
            x: 0,
            y: 0,
            scalar: {
                width: 1,
                height: 1
            }
        }
    });

    /* Title bar */
    titleBar = getTitleBar();
    root.addSubview( titleBar );

    /* Notifications bar */
    notifications = getNotifications();
    contentLV.addSubview( titleBar )
    for (var i = 0; i < notifications.length; i++) {
        contentLV.addSubview( notifications[i] );
    }

    /** Add LV **/
    root.addSubview(contentLV);

    /*****************************
     *         Helpers           *
     *****************************/
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

        return titleWrapper;
    }

    function getNotifications() {
        var data = getNotificationsData().data;

        var notifications = [];
        for (var i = 0; i < data.length; i++) {
            var notification = data[i];

            var rowView = new View({
                backgroundColor: (notification.viewed) ? "white" : "grey",
                metrics: {
                    x: 0,
                    y: 0,
                    scalar: {
                        width: 1,
                        height: 0.1
                    }
                }
            });

            var profilePic = new ImageView({
                x: 0, y: 0,
                src: notification.img
            });

            var notificationText = new TextView({
                x: 0, y: 0,
                text: notification.desc
            });

            rowView.addSubview(profilePic);
            rowView.addSubview(notificationText);
            notifications.push( rowView );
        }

        return notifications;
    }

    function getNotificationsData() {
        return {
            data: [
                {
                "img": "lincoln.jpg",
                "desc": "Abe Lincoln accepted your friend request. Write on Austin's timeline.",
                "iconDesc": "friendRequest",
                "when": "new Date().getTime()",
                "viewed": false
                },
                {
                "img": "lincoln.jpg",
                "desc": "Miley Cyrus added a new video.",
                "iconDesc": "content",
                "when": "new Date().getTime()",
                "viewed": true
                }
            ]
        }
    }
})();
