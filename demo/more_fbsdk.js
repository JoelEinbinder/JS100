var root;
function initPage(){
    console.log("Init called!");

    (function () {

        console.log("Init called, inner function running!");

        root = new View();

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


        content.addSubview(title);

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
            font: "Verdana",
            text: "More",
            fontSize: 20
        }));


        var contentScroll = new ScrollView({
            metrics: {
                x: 0,
                y: 0,
                height:-90.5,
                scalar: {
                    width: 1,
                    height:1
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
        })

        var panelData = getPanelData();

        var profile = getPanels(panelData.data[0]);
        var favorites = getPanels(panelData.data[1]);
        
        getEndpointWrapper("/me/groups", "GROUPS", 10);

        var apps = getPanels(panelData.data[3])
        //var friends = getPanels(panelData.data[4])
        getEndpointWrapper("/me/friendlists", "FRIENDS", 2);
        //var interests = getPanels(panelData.data[5])
        getEndpointWrapper("/me/interests", "INTERESTS", 3);
        //var pages = getPanels(panelData.data[6])
        getEndpointWrapper("/me/accounts", "PAGES", 3);
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



        contentScroll.addSubview(contentList);

        content.addSubview(contentScroll);

        navBar = getNavBar();

        content.addSubview(navBar)

        function getEndpointWrapper(endpoint, clusterText, numToShow){

            getEndpoint(endpoint, function(response){
                    
                  if (response && !response.error) {
                    /* handle the result */
                    console.log("Handling response!");
                    
                    console.log(response);

                    var cluster = new View({
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

                    cluster.addSubview(new TextView({
                        metrics: {
                            x: 5,
                            y: 5,
                            scalar: {
                                height: 1,
                                width: 1
                            }
                        },
                        text: clusterText,
                        fontSize: 12
                    }))

                    contentList.addSubview(cluster);

                    getPanelsMod(response, numToShow);


                }

            });
        }

        function getPanelsMod(data, numToShow) {
            var panel = [];

            console.log("Inside getPanelsMod");

            console.log(data);

            var length = ((data.data.length > numToShow) ? numToShow : data.data.length); //Cap section at length = 5
            //length = 1;
            for (var i = 0; i < length; i++) {
                                //Get specific object at this index in this object array
                var currObject;
                getEndpoint("/" + data.data[i].id, function(response){
      
                      if (response && !response.error) {
                        /* handle the result */
                        console.log("Handling response!");
                        
                        console.log(response);

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
                        })

                        currObject = response;
                        populatePanelRow(currObject, panelRow);

                        panel.push(panelRow);

                        console.log(panelRow);

                        contentList.addSubview(panelRow);

                      }

                });

            }

            function populatePanelRow(currObject, panelRow){
                panelRow.addSubview(new ImageView({
                    metrics: {
                        x: 7.5,
                        y: 7.5,
                        width: 30,
                        height: 30
                    },
                    src:currObject.icon
                }));

                panelRow.addSubview(new TextView({
                    metrics: {
                        x: 45,
                        y: 15,
                        height: 20,
                        scalar: {
                            width:0.5
                        }
                    },
                    text: currObject.name,
                    fontSize: 16
                }));

                /*

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

                };*/

                
            }

        }

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
                }));

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
                }));

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
                    { // No header, profile information
                        "numPanels": 1,
                        "panels": {
                            "img": ["http://img1.wikia.nocookie.net/__cb20141108074537/powerlisting/images/5/5e/Amy-the-secret-life-of-the-american-teenager-19852399-500-375.jpg"],
                            "name": ["Matt Ho"],
                            "notification": [false],
                            "numNotification": [0]
                        }
                    },
                    { // Favorites
                        "numPanels": 6,
                        "panels": {
                            "img": ["https://fbstatic-a.akamaihd.net/rsrc.php/v2/yv/r/jyffrynor-r.png",
                                "https://fbstatic-a.akamaihd.net/rsrc.php/v2/yl/r/EWikQjWTnCU.png",
                                "https://fbstatic-a.akamaihd.net/rsrc.php/v2/yW/r/JCxxvoWIjHH.png",
                                "https://fbstatic-a.akamaihd.net/rsrc.php/v2/y7/r/c0e7heXyaJf.png",
                                "https://fbstatic-a.akamaihd.net/rsrc.php/v2/yW/r/h0535rxX9Ra.png",
                                "https://fbstatic-a.akamaihd.net/rsrc.php/v2/y1/r/4fPfowVQKZx.png"],
                            "name": ["Most Recent",
                                "Messages",
                                "Events",
                                "Trending",
                                "Saved",
                                "Friends"],
                            "notification": [false, false, true, false, true, false],
                            "numNotification": [0,0,4,0,1,0]
                        }
                    },
                    { // Groups
                        "numPanels": 3,
                        "panels": {
                            "img": ["https://fbstatic-a.akamaihd.net/rsrc.php/v2/yt/r/Jhq-dLlKWE-.png",
                                "https://fbstatic-a.akamaihd.net/rsrc.php/v2/ym/r/RdJc45fSEaP.png",
                                ""],
                            "name": ["Find New Groups",
                                "Manage Your Groups",
                                "See All Groups"],
                            "notification": [false, false, false],
                            "numNotification":[0,0,0]
                        }
                    },
                    { // Apps
                        "numPanels": 7,
                        "panels": {
                            "img": ["https://fbstatic-a.akamaihd.net/rsrc.php/v2/yq/r/tfDkn9HtxpD.png",
                                "https://fbstatic-a.akamaihd.net/rsrc.php/v2/yv/r/VaknOwrbnBC.png",
                                "https://fbstatic-a.akamaihd.net/rsrc.php/v2/y4/r/cXQju6jBBej.png",
                                "https://fbstatic-a.akamaihd.net/rsrc.php/v2/yo/r/Y7Se8klx7r-.png",
                                "https://fbstatic-a.akamaihd.net/rsrc.php/v2/yq/r/l-j0CzSoSie.png",
                                "https://fbstatic-a.akamaihd.net/rsrc.php/v2/yN/r/Zd_M67spfjw.png",
                                ""],
                            "name": ["Find Friends",
                                "Photos",
                                "Notes",
                                "Suggest Edits",
                                "Pokes",
                                "Games",
                                "See All Apps"],
                            "notification": [false,false,false,false,false,false,false],
                            "numNotification":[0,0,0,0,0,0,0]
                        }
                    },
                    { // Friends
                        "numPanels": 2,
                        "panels": {
                            "img": ["https://fbstatic-a.akamaihd.net/rsrc.php/v2/yP/r/IKDNTh8bnOI.png",
                                "https://fbstatic-a.akamaihd.net/rsrc.php/v2/yg/r/N2djgm7e2yt.png"],
                            "name": ["Close Friends",
                                "Family"],
                            "notification": [false,true],
                            "numNotification":[0,20]
                        }
                    },
                    { // Interests
                        "numPanels": 1,
                        "panels": {
                            "img": ["https://fbstatic-a.akamaihd.net/rsrc.php/v2/yP/r/6t-lH5klGf1.png"],
                            "name": ["Pages and Public Figures"],
                            "notification": [true],
                            "numNotification":[7]
                        }
                    },
                    { // Pages
                        "numPanels": 1,
                        "panels": {
                            "img": [""],
                            "name": ["See All Pages"],
                            "notification": [false],
                            "numNotification":[0]
                        }
                    },
                    { // Help and Settings
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
                click: function (e) {
                    if (focusImg) {
                        focusImg.setSrc(deselect(focus));
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
                click: function (e) {
                    if (focusImg) {
                        focusImg.setSrc(deselect(focus));
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
                click: function (e) {
                    if (focusImg) {
                        focusImg.setSrc(deselect(focus));
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
                click: function (e) {
                    if (focusImg) {
                        focusImg.setSrc(deselect(focus));
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
                click: function (e) {
                    if (focusImg) {
                        focusImg.setSrc(deselect(focus));
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
                click: function (e) {
                    if (focusImg) {
                        focusImg.setSrc(deselect(focus));
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

            navBar.addSubview(newsfeedTabWrapper);
            navBar.addSubview(requestsTabWrapper);
            navBar.addSubview(messagesTabWrapper);
            navBar.addSubview(notificationsTabWrapper);
            navBar.addSubview(searchTabWrapper);
            navBar.addSubview(moreTabWrapper);

            return navBar;
        }

        function deselect(focus) {
            if (focus == "newsfeed") {
                return "imgs/newsfeed.png"
            } else if (focus == "requests") {
                return "imgs/friend_requests.png"
            } else if (focus == "messages") {
                return "imgs/messenger.png"
            } else if (focus == "notifications") {
                return "imgs/notifications.png"
            } else if (focus == "search") {
                return "imgs/search.png"
            } else if (focus == "more") {
                return "imgs/more.png"
            }
        }

    })();

    return root;
}

