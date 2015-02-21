/*var viewsList = {
	//viewID : {x: , y: , width: , height: }
};*/

var tabEnum = Object.freeze({
	FEED: 0
	FRIENDS: 1
	CHAT: 2
	NOTIFICATIONS: 3
	MORE: 4
});

initialize();


//Function only run once, as soon as the page is loaded the first time.
var initialize = function() {
    /* Define the UI */

    drawMoreMenu();

/*
    //Populates list of views
    populateViewsList();

    //Ping periodically for updates
    listen();
    */

};

function drawMoreMenu(){

	drawHeader("More", tabEnum.MORE);

	root.addSubview(new View(){

	})
}

/**
* Draws the header of the app, regardless of the specific menu user is on
* @text
* @activeMenu
*/
function drawHeader(text, activeMenu){

	drawTitle(text);
	drawNavBar(activeMenu);

}

function drawTitle(text){
	//Wrap menu title, search button, and friend button
	var titleWrapper = new View({
		color:blue,
		height:30,
		scalar:{
			width: 1,
		}
	})
	root.addSubview(titleWrapper);
	
	//Add menu title
	titleWrapper.addSubview(new TextView({
		metrics: {
			color:white,
			x: 6,
			y: 6,
			scalar: {
				width: 0.7,
				height: 0.6
			}
		},
		text: text
	}));

	//Add search button
	titleWrapper.addSubview(new ImageView({
		metrics:{
			y: 6,
			scalar:{
				x: .733
				width: 0.1,
				height: 0.6
			}
		},
		imagepath: "http://iconizer.net/files/IconSweets_2/orig/search_2.png" //TODO: Correct image path property for search icon
	}));

	//Add friend button
	titleWrapper.addSubview(new ImageView({
		metrics:{
			y:6,
			scalar:{
				x: .867
				width: 0.1,
				height: 0.6
			}
		},
		imagepath: "http://cdns2.freepik.com/free-photo/menu-circle_318-26611.jpg" //TODO: Correct image path property for friend icon
	}));
}

function drawNavBar(activeMenu){
	var navBarWrapper = new View({
		color:blue,
		y:30,
		height:30,
		scalar:{
			width: 1,
		}
	})
	root.addSubview(navBarWrapper);

	for(var i = 0; i < 5; i++){
		var currNavItem = drawNavItem(i, activeMenu == i, "http://iconizer.net/files/IconSweets_2/orig/search_2.png");
		navBarWrapper.addSubview(currNavItem);
		if(pushNum[i] != 0){ //TODO: Figure out how to retrieve this data
			//Need to display push notifications for this
			drawPushBubble(pushNum);
		}
	}
}

/**
* Draws a single nav bar item
* @index: this item is the index-th nav bar item. Used for positioning
* @activeStatus: determines if this nav bar item is currently active
* @pushNum: number of push notifications to display in alert
*/
function drawNavItem(index, activeStatus, imagepathname){

	//TODO: account for activeStatus

	var navItem = new ImageView({
		metrics:{
			scalar:{
				x: index * 0.2 + 0.05, //Each tab occupies 20% of width, but icon occupies central 10% within that 20% frame
				width: 0.1
			}
		},
		imagepath: imagepathname
	});

	return navItem;
}

/*
var listen = function() {

	while(true){
		//Looping on listen, 60 fps (fire an event every 1/60s?)
		var dirtyViews = getDirtyViews();

		for (view in dirtyViews){
			drawView(view);
		}

	}
}


var populateViewsList = function() {
	
	console.log("Populating viewsList for the first time");

	//Store all subviews associated with the root retrieved
	viewsList = root.subviews; //TODO: Not sure if this makes a deep copy
}

var drawView = function(params) { 

	var id = params[id];
	console.log("Updating values of view id: " + id);

	//Update values
	var view = viewsList[id]; //TODO: not sure if this makes a shallow copy
	view[x] = params[x];
	view[y] = params[y];
	view[width] = params[width];
	view[height] = params[height];


}

var getDirtyViews = function() {

	console.log("Retrieving dirty views");

	return js100.getDirtyViews();

}

var paint = function() {

	console.log("Painting new canvas with updated views");


}
*/