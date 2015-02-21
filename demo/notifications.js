(function() {
    root = new View()

    contentList = new ListView({
        metrics: {
            x: 0,
            y: 0,
            scalar: {
                width: 1,
                height: 1
            }
        }
    });
    root.addSubview(contentList);

    var navBar = getNavBar();
    contentList.addSubview(navBar)

    var titleBar = getTitleBar();
    contentList.addSubview(titleBar);

    var notifications = getNotifications();
    for (var i = 0; i < notifications.length; i++) {
        contentList.addSubview( notifications[i] );
    }


    /*****************************
     *         Helpers           *
     *****************************/
    function getNavBar() {
        var fbBlue = "#3B5998"

        var navBar = new View({
            metrics: {
                x: 0,
                y: 0,
                scalar: {
                    width: 1,
                    height: 0.08
                }
            },
            backgroundColor: fbBlue
        });

        return navBar;
    }
    function getTitleBar() {
        var titleWrapper = new View({
            backgroundColor: 'white',
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
            color: "black",
            fontSize: 16,
            decoration: "bold",
            metrics: {
                x: 10,
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

            var notificationRow = new View({
                backgroundColor: (notification.viewed) ? "white" : "#dfe3ee",
                strokeColor: "gray",
                metrics: {
                    x: 0,
                    y: 0,
                    height: 53,
                    scalar: {
                        width: 1
                    }
                }
            });

            var profilePic = new ImageView({
                metrics: {
                    x: 6, y: 6, 
                    width: 40, height: 40
                },
                src: notification.img
            });

            var notificationDesc = new TextView({
                metrics: {
                    x: 55, y: 13,
                    scalar: {
                        height: 1,
                        width: 1
                    }
                },
                text: notification.desc,
                fontSize: 12
            });
            var timeDesc = new TextView({
                metrics: {
                    x: 75, y: -17,
                    scalar: {
                        width: 1,
                        y: 1
                    }
                },
                text: getTimeSince(notification.when),
                fontSize: 12
            });

            var textWrapper = new View({
                metrics: {
                    x: 0, y: 0,
                    scalar: {
                        height: 1,
                        width: 1
                    }
                }
            });
            textWrapper.addSubview(notificationDesc);
            textWrapper.addSubview(timeDesc);

            var iconImg = new ImageView({
                metrics: {
                    x: 53, y: -21,
                    width: 17, height: 17,
                    scalar: {
                        y: 1
                    }
                },
                src: notification.iconImg
            });

            notificationRow.addSubview(profilePic);
            notificationRow.addSubview(textWrapper);
            notificationRow.addSubview(iconImg);

            notifications.push(notificationRow);
        }

        return notifications;
    }

    function getNotificationsData() {
        return {
            data: [
                {
                "img": "imgs/lincoln.jpg",
                "desc": "Abe Lincoln accepted your friend request. You can now see his latest photos and posts on his profile.",
                "iconImg": "imgs/content.png",
                "when": new Date().getTime() - Math.floor(100000*Math.random()),
                "viewed": false
                },
                {
                "img": "imgs/lincoln.jpg",
                "desc": "Miley Cyrus added a new video.",
                "iconImg": "imgs/content.png",
                "when": new Date().getTime() - Math.floor(100000*Math.random()),
                "viewed": true
                }
            ]
        }
    }

    function getTimeSince( date ) {
        // TODO: Do better...
        var dateTokens = new Date( date ).toString().split(" ");
        return dateTokens[1] + " " + dateTokens[2] + " at " + dateTokens[4]
    }
})();
