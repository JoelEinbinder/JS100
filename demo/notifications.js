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
    root.addSubview(navBar);

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
        var navBar = new ListView({
            metrics: {
                x: 0,
                y: -45.5,
                height: 45.5,
                scalar: {
                    y: 1,
                    width: 1
                }
            },
            horizontal: true
        });

        var fbBlue = "#3B5998"
        var darkBlue = "#243c6d"

        var focus = "notifications"; 
        var focusImg = notificationsTab;
        var focusWrapper = notificationsTabWrapper;

        // Tab 1 - Newsfeed
        var newsfeedTab = new ImageView({
            metrics: {
                width: 20,
                height: 20,
                x: -10,
                y: -10,
                scalar: {
                    x: 0.5,
                    y: 0.5
                }
            },
            src: "imgs/newsfeed.png"
        });
        var newsfeedTabWrapper = new View({
            backgroundColor: fbBlue,
            strokeColor: fbBlue,
            metrics: {
                x: 0, 
                y: 0,
                scalar: {
                    width: 0.1667,
                    height: 1
                }
            },
            click: function(e) {
                if( focusImg ) {
                    focusImg.setSrc( deselect(focus) );
                    focusWrapper.backgroundColor = fbBlue
                }
                focus = "newsfeed";
                focusImg = newsfeedTab;
                focusWrapper = newsfeedTabWrapper;
                focusWrapper.backgroundColor = darkBlue;
                focusImg.setSrc("imgs/newsfeed_selected.png");
            }
        });
        newsfeedTabWrapper.addSubview(newsfeedTab);

        var requestsTab = new ImageView({
            metrics: {
                width: 20,
                height: 20,
                x: -10,
                y: -10,
                scalar: {
                    x: 0.5,
                    y: 0.5
                }
            },
            src: "imgs/friend_requests.png"
        });
        var requestsTabWrapper = new View({
            backgroundColor: fbBlue,
            strokeColor: fbBlue,
            metrics: {
                x: 0, 
                y: 0,
                scalar: {
                    width: 0.1667,
                    height: 1
                }
            },
            click: function(e) {
                if( focusImg ) {
                    focusImg.setSrc( deselect(focus) );
                    focusWrapper.backgroundColor = fbBlue;
                }
                focus = "requests";
                focusImg = requestsTab;
                focusWrapper = requestsTabWrapper;
                focusWrapper.backgroundColor = darkBlue;
                focusImg.setSrc("imgs/friend_requests_selected.png");
            }
        });
        requestsTabWrapper.addSubview(requestsTab);

        var messagesTab = new ImageView({
            metrics: {
                width: 20,
                height: 20,
                x: -10,
                y: -10,
                scalar: {
                    x: 0.5,
                    y: 0.5
                }
            },
            src: "imgs/messenger.png"
        });
        var messagesTabWrapper = new View({
            backgroundColor: fbBlue,
            strokeColor: fbBlue,
            metrics: {
                x: 0, 
                y: 0,
                scalar: {
                    width: 0.1667,
                    height: 1
                }
            },
            click: function(e) {
                if (focusImg) {
                    focusImg.setSrc( deselect(focus) );
                    focusWrapper.backgroundColor = fbBlue;
                }
                focus = "messages";
                focusImg = messagesTab;
                focusWrapper = messagesTabWrapper;
                focusWrapper.backgroundColor = darkBlue;
                focusImg.setSrc("imgs/messenger_selected.png");
            }
        });
        messagesTabWrapper.addSubview(messagesTab);

        var notificationsTab = new ImageView({
            metrics: {
                width: 20,
                height: 20,
                x: -10,
                y: -10,
                scalar: {
                    x: 0.5,
                    y: 0.5
                }
            },
            src: "imgs/notifications.png"
        });
        var notificationsTabWrapper = new View({
            backgroundColor: fbBlue,
            strokeColor: fbBlue,
            metrics: {
                x: 0, 
                y: 0,
                scalar: {
                    width: 0.1667,
                    height: 1
                }
            },
            click: function(e) {
                if (focusImg) {
                    focusImg.setSrc( deselect(focus) );
                    focusWrapper.backgroundColor = fbBlue;
                }
                focus = "notifications";
                focusImg = notificationsTab;
                focusWrapper = notificationsTabWrapper;
                focusWrapper.backgroundColor = darkBlue;
                focusImg.setSrc("imgs/notifications_selected.png");
            }
        });
        notificationsTabWrapper.addSubview(notificationsTab);

        var searchTab = new ImageView({
            metrics: {
                width: 20,
                height: 20,
                x: -10,
                y: -10,
                scalar: {
                    x: 0.5,
                    y: 0.5
                }
            },
            src: "imgs/search.png"
        });
        var searchTabWrapper = new View({
            backgroundColor: fbBlue,
            strokeColor: fbBlue,
            metrics: {
                x: 0, 
                y: 0,
                scalar: {
                    width: 0.1667,
                    height: 1
                }
            }, 
            click: function(e) {
                if (focusImg) {
                    focusImg.setSrc( deselect(focus) );
                    focusWrapper.backgroundColor = fbBlue;
                }
                focus = "search";
                focusImg = searchTab;
                focusWrapper = searchTabWrapper;
                focusWrapper.backgroundColor = darkBlue;
                focusImg.setSrc("imgs/search_selected.png");
            }
        });
        searchTabWrapper.addSubview(searchTab);

        var moreTab = new ImageView({
            metrics: {
                width: 20,
                height: 20,
                x: -10,
                y: -10,
                scalar: {
                    x: 0.5,
                    y: 0.5
                }
            },
            src: "imgs/more.png"
        });
        var moreTabWrapper = new View({
            backgroundColor: fbBlue,
            strokeColor: fbBlue,
            metrics: {
                x: 0, 
                y: 0,
                scalar: {
                    width: 0.1667,
                    height: 1
                }
            },
            click: function(e) {
                if (focusImg) {
                    focusImg.setSrc( deselect(focus) );
                    focusWrapper.backgroundColor = fbBlue;
                }
                focus = "more";
                focusImg = moreTab;
                focusWrapper = moreTabWrapper;
                focusWrapper.backgroundColor = darkBlue;
                focusImg.setSrc("imgs/more_selected.png");
            }
        });
        moreTabWrapper.addSubview(moreTab);

        navBar.addSubview( newsfeedTabWrapper );
        navBar.addSubview( requestsTabWrapper );
        navBar.addSubview( messagesTabWrapper );
        navBar.addSubview( notificationsTabWrapper );
        navBar.addSubview( searchTabWrapper );
        navBar.addSubview( moreTabWrapper );

        function deselect( focus ) {
            if ( focus == "newsfeed" ) {
                return "imgs/newsfeed.png"
            } else if ( focus == "requests" ) {
                return "imgs/friend_requests.png"
            } else if ( focus == "messages" ) {
                return "imgs/messenger.png"
            } else if ( focus == "notifications" ) {
                return "imgs/notifications.png"
            } else if ( focus == "search" ) {
                return "imgs/search.png"
            } else if ( focus == "more" ) {
                return "imgs/more.png"
            }
        }

        return navBar;
    }
    function getTitleBar() {
        var fbBlue = "#3B5998"
        var titleWrapper = new View({
            backgroundColor: fbBlue,
            strokeColor: fbBlue,
            metrics: {
                x: 0,
                y: 0,
                height: 44,
                scalar: {
                    width: 1
                }
            }
        });

        titleWrapper.addSubview(new TextView({
            color: "white",
            fontSize: 15,
            justify: "center",
            metrics: {
                x: 10,
                y: -9,
                scalar: {
                    y: 0.5,
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
                    x: 6, 
                    y: 6, 
                    width: 40, 
                    height: 40
                },
                strokeColor: "#fff",
                src: notification.img
            });

            var notificationDesc = new TextView({
                metrics: {
                    x: 55, 
                    y: -15,
                    scalar: {
                        y: 0.5,
                        height: 1,
                        width: 1
                    }
                },
                text: notification.desc,
                strokeColor: "#fff",
                fontSize: 12
            });
            var timeDesc = new TextView({
                metrics: {
                    x: 75, 
                    y: 5,
                    scalar: {
                        width: 1,
                        y: 0.5
                    }
                },
                text: getTimeSince(notification.when),
                fontSize: 12
            });

            var textWrapper = new View({
                strokeColor: "#fff",
                metrics: {
                    x: 0, 
                    y: 0,
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
                    x: 53, 
                    y: 0,
                    width: 17, 
                    height: 17,
                    scalar: {
                        y: 0.5
                    }
                },
                strokeColor: "#fff",
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
                "img": "imgs/miley.jpg",
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
