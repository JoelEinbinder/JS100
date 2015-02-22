function init() {
    root = new View()

    var content = new ListView({
        backgroundColor: false,
        metrics: {
            x: 0,
            y: 0,
            scalar: {
                width: 1,
                height: 1
            }
        },
        strokeColor: "white"
    })
    root.addSubview(content);

    var titleBar = getTitleBar();
    content.addSubview(titleBar);

    var contentScroll = new ScrollView({
        metrics: {
            x: 0,
            y: 0,
            height: -90.5,
            scalar: {
                width: 1,
                height: 1
            }
        }
    })

    var contentList = new ListView({
        metrics: {
            x: 0,
            y: 0,
            scalar: {
                width: 1,
                height: 1
            }
        },
        resizesToContent: true
    });

    var notifications = getNotifications();
    for (var i = 0; i < notifications.length; i++) {
        contentList.addSubview(notifications[i]);
    }

    contentScroll.addSubview(contentList);

    content.addSubview(contentScroll);

    var navBar = getNavBar();
    content.addSubview(navBar);

    return root;
}
init();


/*****************************
 *         Helpers           *
 *****************************/
/** Creates and returns the navigation menu **/
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

/** Create and return the "Notifications" title **/
function getTitleBar() {
    var fbBlue = "#3B5998"
    var titleWrapper = new View({
        backgroundColor: fbBlue,
        strokeColor: fbBlue,
        metrics: {
            x: 0,
            y: 0,
            height: 45,
            scalar: {
                width: 1
            }
        }
    });

    titleWrapper.addSubview(new TextView({
        color: "white",
        fontSize: 20,
        justify: "center",
        metrics: {
            x: 0,
            y: 12.5,
            scalar: {
                width: 1,
                height: 1
            }
        },
        text: "Notifications"
    }));

    return titleWrapper;
}

/** Create views populated with data. **/
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
                height: 100,
                scalar: {
                    width: 1
                }
            }
        });

        var profilePic = new ImageView({
            metrics: {
                x: 10, 
                y: 10, 
                width: 80, 
                height: 80
            },
            src: notification.img
        });

        var notificationDesc = new TextView({
            metrics: {
                x: 100, 
                y: 15,
                height: 35,
                width:-100,
                scalar: {
                    width: 1
                }
            },
            text: notification.desc,
            strokeColor: "#fff",
            fontSize: 12
        });
        var timeDesc = new TextView({
            metrics: {
                x: 120, 
                y: 55,
                scalar: {
                    width: 1,
                }
            },
            text: getTimeSince(notification.when),
            fontSize: 12,
            color: "gray"
        });

        notificationRow.addSubview(notificationDesc);
        notificationRow.addSubview(timeDesc);

        var iconImg = new ImageView({
            metrics: {
                x: 100, 
                y: 55,
                width: 17, 
                height: 17
            },
            src: notification.iconImg
        });

        notificationRow.addSubview(profilePic);
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

/** Dummy data, to be replaced with real api **/
function getTimeSince( date ) {
    var dateTokens = new Date( date ).toString().split(" ");
    return dateTokens[1] + " " + dateTokens[2] + " at " + dateTokens[4]
}
