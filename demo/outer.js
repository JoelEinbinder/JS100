root = new View();
var title = getTitleBar();
var navBar = getNavBar();
root.addSubview(title);
root.addSubview(navBar);
/** Create and return the "Notifications" title **/
function getTitleBar() {
    var fbBlue = "#3B5998";
    var length = 30;
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
    var label = false;
    titleWrapper.setTitle = function(t){
        var l = new TextView({
            color: "white",
            fontSize: 20,
            justify: "center",
            metrics: {
                x: 0,
                y: 12.5,
                alpha: 0,
                scalar: {
                    x: 1,
                    width: 1,
                    height: 1
                }
            },
            text: t
        });
        titleWrapper.addSubview(l);
        var old = label;
        if (old) {
            l.makeAnimation({alpha:1, scalar:{x:0}},length);
            old.makeAnimation({alpha: 0, scalar: {width: 0}}, length, function () {
                titleWrapper.removeView(old);
            });
        }
        else{
            l.metrics.alpha = 1;
            l.metrics.scalar.x = 0;
        }
        label = l;
    };
    return titleWrapper;
}
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
            loadPage(focus);
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
            loadPage(focus);

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
            loadPage(focus);

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
            loadPage(focus);

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
            loadPage(focus);

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
            loadPage(focus);

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
    newsfeedTabWrapper.click();
    return navBar;
}
function loadPage(p){
    title.setTitle(p);
}
