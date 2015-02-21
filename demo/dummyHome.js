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

	root.addSubview(new View({
		
	}));

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