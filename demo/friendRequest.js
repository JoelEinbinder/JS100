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
                width: 1
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
        }
    });

    var friendRequestTitle = new View({
        metrics: {
            x: 0,
            y: 0,
            height: 45,
            scalar: {
                width:1
            }
        }
    });

    friendRequestTitle.addSubview(new TextView({
        metrics: {
            x: 10,
            y: 15,
            scalar: {
                height: 1,
                width: 0.5
            }
        },
        text: "Friend Requests"
    }));

    friendRequestTitle.addSubview(new ImageView({
        metrics: {
            x:-20,
            y: 15,
            height:15,
            width:15,

            scalar: {
                x:1
            }
        },
        src: "http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=33839070"
    }));

    contentList.addSubview(friendRequestTitle);

    var friendrequests = getFriendRequests();

    for (var i = 0; i < friendrequests.length; i++) {
        contentList.addSubview(friendrequests[i]);
    }

    knowPeople = new View({
        backgroundColor: "#f7f7f7",
        metrics: {
            x: 0,
            y: 0,
            height: 30,
            scalar: {
                width: 1
            }
        },
        strokeColor: "gray"
    });

    knowPeople.addSubview(new TextView({
        metrics: {
            x: 5,
            y: 9,
            scalar: {
                height: 1,
                width: 1
            }
        },
        text: "PEOPLE YOU MAY KNOW",
        fontSize: 12
    }))

    contentList.addSubview(knowPeople);

    var knowpeople = getKnowPeople();

    for (var i = 0; i < knowpeople.length; i++) {
        contentList.addSubview(knowpeople[i]);
    }

    var seeAll = new View({
        metrics: {
            x: 0,
            y: 0,
            height: 50,
            scalar: {
                width:1
            }
        },
        strokeColor: "white"
    })

    seeAll.addSubview(new TextView({
        metrics: {
            x: 10,
            y: 10,
            height: 20,
            scalar: {
                width:1
            }
        },
        text: "See All",
        fontSize:12,
        color:"#3b5998"
    }))

    contentList.addSubview(seeAll);

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
                },
                click: function(){
                    alert("hi")
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

    function getKnowPeople() {
        var data = getKnowPeopleData().data;

        var knowPeople = [];
        for (var i = 0; i < data.length; i++) {
            var knowperson = data[i];

            var knowPeopleRow = new View({
                metrics: {
                    x: 0,
                    y: 0,
                    height: 50,
                    scalar: {
                        width: 1
                    }
                },
                strokeColor: "gray"
            })

            knowPeopleRow.addSubview(new ImageView({
                metrics: {
                    x: 10,
                    y: 5,
                    width: 40,
                    height: 40
                },
                src: knowperson.img
            }));

            knowPeopleRow.addSubview(new TextView({
                metrics: {
                    x: 60,
                    y: 10,
                    height: 30,
                    scalar: {
                        width: 1
                    }
                },
                text: knowperson.name
            }));

            knowPeopleRow.addSubview(new TextView({
                metrics: {
                    x: 60,
                    y: 30,
                    height: 20,
                    scalar: {
                        width: 1
                    }
                },
                text: knowperson.numMutFriends + " mutual friends",
                fontSize: 12,
                color:"gray"
            }));

            var addFriend = new View({
                backgroundColor: "#3b5998",
                metrics: {
                    x:-85,
                    y: 15,
                    height: 25,
                    width: 75,
                    scalar: {
                        x:1
                    }
                }
            });

            addFriend.addSubview(new TextView({
                metrics: {
                    x: 0,
                    y: 7.5,
                    scalar: {
                        width: 1,
                        height: 1
                    }
                },
                justify: "center",
                text: "Add Friend",
                color: "white",
                fontSize:12
            }));

            knowPeopleRow.addSubview(addFriend);

            knowPeople.push(knowPeopleRow);
        }
        return knowPeople;
    }

    function getFriendRequestData() {
        return {
            data: [
                {
                    "img": "http://img1.wikia.nocookie.net/__cb20141108074537/powerlisting/images/5/5e/Amy-the-secret-life-of-the-american-teenager-19852399-500-375.jpg",
                    "name": "Jane Doe",
                    "friend": "Vincent Chen",
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

    function getKnowPeopleData() {
        return {
            data: [
                {
                    "img": "http://connectedwomanmag.com/wp-content/uploads/2015/01/black-woman-thinking.jpg",
                    "name": "Mary Hansen",
                    "numMutFriends": 14
                },
                {
                    "img": "http://www.menshairstyles.net/d/76238-1/Young+Asian+man+hairstyles.PNG",
                    "name": "Joe Schmoe",
                    "numMutFriends": 52
                }
            ]
        }
    }
})();