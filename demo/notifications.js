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

    /* old navbar stuff */
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
        var navBar = new ListView({
            backgroundColor: fbBlue,
            metrics: {
                x: 0,
                y: 0,
                height: 45.5,
                scalar: {
                    width: 1
                }
            },
            horizontal: true
        });

        // Tab 1 - Newsfeed
        var newsfeedTab = new ImageView({
            metrics: {
                width: 30,
                height: 30,
                x: -15,
                y: -15,
                scalar: {
                    x: 0.5,
                    y: 0.5
                }
            },
            src: "imgs/content.png"
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
        });
        newsfeedTabWrapper.addSubview(newsfeedTab);

        var requestsTab = new ImageView({
            metrics: {
                width: 30,
                height: 30,
                x: -15,
                y: -15,
                scalar: {
                    x: 0.5,
                    y: 0.5
                }
            },
            src: "imgs/content.png"
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
            }
        });
        requestsTabWrapper.addSubview(requestsTab);

        var messagesTab = new ImageView({
            metrics: {
                width: 30,
                height: 30,
                x: -15,
                y: -15,
                scalar: {
                    x: 0.5,
                    y: 0.5
                }
            },
            src: "imgs/content.png"
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
            }
        });
        messagesTabWrapper.addSubview(messagesTab);

        var notificationsTab = new ImageView({
            metrics: {
                width: 30,
                height: 30,
                x: -15,
                y: -15,
                scalar: {
                    x: 0.5,
                    y: 0.5
                }
            },
            src: "imgs/content.png"
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
            }
        });
        notificationsTabWrapper.addSubview(notificationsTab);

        var searchTab = new ImageView({
            metrics: {
                width: 30,
                height: 30,
                x: -15,
                y: -15,
                scalar: {
                    x: 0.5,
                    y: 0.5
                }
            },
            src: "imgs/content.png"
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
            }
        });
        searchTabWrapper.addSubview(searchTab);

        var moreTab = new ImageView({
            metrics: {
                width: 30,
                height: 30,
                x: -15,
                y: -15,
                scalar: {
                    x: 0.5,
                    y: 0.5
                }
            },
            src: "imgs/content.png"
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
            }
        });
        moreTabWrapper.addSubview(moreTab);

        navBar.addSubview( newsfeedTabWrapper );
        navBar.addSubview( requestsTabWrapper );
        navBar.addSubview( messagesTabWrapper );
        navBar.addSubview( notificationsTabWrapper );
        navBar.addSubview( searchTabWrapper );
        navBar.addSubview( moreTabWrapper );
        return navBar;
    }
    function getTitleBar() {
        var titleWrapper = new View({
            backgroundColor: 'white',
            strokeColor: "#fff",
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
            color: "black",
            fontSize: 15,
            decoration: "bold",
            metrics: {
                x: 10,
                y: -7,
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
