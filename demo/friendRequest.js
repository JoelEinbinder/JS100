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
        text: "Friend Request",
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

    contentList.addSubview(new TextView({
        metrics: {
            x: 10,
            y: 0,
            height: 45,
            scalar: {
                width: 1
            }
        },
        text: "Friend Requests"
    }))

    var friendrequests = getFriendRequests();

    for (var i = 0; i < friendrequests.length; i++) {
        contentList.addSubview(friendrequests[i]);
    }

    content.addSubview(contentList);

    function getFriendRequests() {
        var data = getFriendRequestData().data;

        var friendRequests = [];
        for (var i = 0; i < data.length; i++) {
            var friendrequest = data[i];

            var friendRequestRow = new View({
                backgroundColor: (friendrequest.viewed) ? "white" : "#dfe3ee",
                metrics: {
                    x: 0,
                    y: 0,
                    height: 100,
                    scalar: {
                        width: 1
                    }
                },
                strokeColor: "gray"
            })

            friendRequestRow.addSubview(new ImageView({
                metrics: {
                    x: 10,
                    y: 10,
                    width: 80,
                    height: 80
                },
                src: friendrequest.img
            }));
            
            friendRequestRow.addSubview(new TextView({
                metrics: {
                    x: 100,
                    y: 15,
                    height: 30,
                    scalar: {
                        width: 1
                    }
                },
                text: friendrequest.name,
                color: "#3b5998"
            }));

            friendRequestRow.addSubview(new TextView({
                metrics: {
                    x: 100,
                    y: 37.5,
                    height: 20,
                    scalar: {
                        width: 1
                    }
                },
                text: friendrequest.friend + " is a mutual friend.",
                fontSize: 12
            }));

            var confirmFriend = new View({
                backgroundColor: "#1975d1",
                metrics: {
                    x: 100,
                    y: 60,
                    height: 30,
                    width: 75
                }
            });

            confirmFriend.addSubview(new TextView({
                metrics: {
                    x: 0,
                    y: 7.5,
                    scalar: {
                        width: 1,
                        height: 1
                    }
                },
                justify: "center",
                text: "Confirm",
                color: "white"
            }));

            var deleteFriend = new View({
                backgroundColor: "white",
                metrics: {
                    x: 187.5,
                    y: 60,
                    height: 30,
                    width: 75
                }
            });

            deleteFriend.addSubview(new TextView({
                metrics: {
                    x: 0,
                    y: 7.5,
                    scalar: {
                        width: 1,
                        height: 1
                    }
                },
                justify: "center",
                text: "Delete",
                color: "black"
            }));

            friendRequestRow.addSubview(confirmFriend);
            friendRequestRow.addSubview(deleteFriend);
            
            friendRequests.push(friendRequestRow);
        }
        return friendRequests;
    }

    function getFriendRequestData() {
        return {
            data: [
                {
                    "img": "http://upload.wikimedia.org/wikipedia/en/2/28/Deep_Fried_Man_portrait_-_real_name_Daniel_Friedman_-_South_African_Comedian.jpg",
                    "name": "John Jay",
                    "friend": "Joel Einbinder",
                    "viewed": false
                },
                {
                    "img": "http://upload.wikimedia.org/wikipedia/en/2/28/Deep_Fried_Man_portrait_-_real_name_Daniel_Friedman_-_South_African_Comedian.jpg",
                    "name": "John Jay",
                    "friend": "Joel Einbinder",
                    "viewed": true
                }
            ]
        }
    }
})();