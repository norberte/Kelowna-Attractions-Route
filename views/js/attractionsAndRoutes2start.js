
function getPopularAttractions(listId) {
    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            url: 'http://159.203.47.53:8080/popAttr',
            dataType: 'json',
            success: function (data) {
                var jsonPopAttr = data;
                var listNode = document.createElement("LI");
                listNode.setAttribute('class', 'w3-padding-16 w3-border-bottom w3-border-white');
                listNode.setAttribute('onclick', "clickAttr(this);location.href = 'route.html';");
                var imageNode = document.createElement("IMG");
                imageNode.setAttribute('src', 'img/best_dog.jpg');
                imageNode.setAttribute('class', 'w3-left w3-circle');
                imageNode.setAttribute('style', 'width:60px');
                var spanNodeOne = document.createElement('span');
                spanNodeOne.innerHTML = jsonPopAttr[z].name;
                spanNodeOne.setAttribute('class','w3-xlarge');
                var spanNodeTwo = document.createElement("span");
                spanNodeTwo.innerHTML = jsonPopAttr[z].description;
                listNode.appendChild(imageNode);
                listNode.appendChild(spanNodeOne);
                listNode.appendChild(document.createElement("BR"));
                listNode.appendChild(spanNodeTwo);
                document.getElementById(listId).appendChild(listNode);
               	z += 1;
            },
            error: function (err) {
                console.log('Error, Ajax call unsuccessful.', err);
            }
        });
    });
 };

function getRecommendedRoutes(listId,y) {
	$(document).ready(function() {
	$.ajax({
             type: 'GET',
             url: 'http://159.203.47.53:8080/recRoute',
             dataType: 'json',
             success: function(data) {
        		 var jsonRecRoutes = data;
        		 var listNode = document.createElement("LI");
        		 listNode.setAttribute('class', 'w3-padding-16 w3-border-bottom w3-border-white');
        		 var imageNode = document.createElement("IMG");
        		 imageNode.setAttribute('src', 'img/best_dog.jpg');
        		 imageNode.setAttribute('class', 'w3-left w3-circle');
        		 imageNode.setAttribute('style', 'width:60px');
        		 var spanNodeOne = document.createElement('span');
        		 spanNodeOne.innerHTML = jsonRecRoutes[y].name;
        		 spanNodeOne.setAttribute('class','w3-xlarge');
        		 var spanNodeTwo = document.createElement("span");
        		 spanNodeTwo.innerHTML = jsonRecRoutes[y].description;
        		 listNode.appendChild(imageNode);
        		 listNode.appendChild(spanNodeOne);
        		 listNode.appendChild(document.createElement("BR"));
        		 listNode.appendChild(spanNodeTwo);
        		 listNode.addEventListener('click',function(){clickRoute(jsonRecRoutes[y].rid,jsonRecRoutes[y].uname);});
        		 document.getElementById(listId).appendChild(listNode);
        		 },
             error: function (err) {
                 console.log('Error, Ajax call unsuccessful.', err);
             }
	          });
    });
}

function updateAttractions() {
    var selectedAttr = {"type":[]};
    if(document.getElementById("Winery").checked){
        selectedAttr["type"].push("Winery");
    }
    if(document.getElementById("Hiking Trail").checked){
        selectedAttr["type"].push("Hiking Trail");
    }
    if(document.getElementById("Historical/Museum").checked){
        selectedAttr["type"].push("Historical/Museum");
    }
    if(document.getElementById("Park").checked){
        selectedAttr["type"].push("Park");
    }
    if(document.getElementById("Farm/Orchard").checked){
        selectedAttr["type"].push("Farm/Orchard");
    }
    if(document.getElementById("Entertainment").checked){
        selectedAttr["type"].push("Entertainment");
    }
    return selectedAttr;
}

function passAttraction(listId, aid){
    attractionParam = {"aid": aid};
    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            data: attractionParam,
            dataType: 'json',
            url: 'http://159.203.47.53:8080/selectedAttr',
            success: function (data) {
					           var listNode = document.createElement("LI");
                     listNode.setAttribute('class', 'w3-padding-16 w3-border-bottom w3-border-white');
                     var imageNode = document.createElement("IMG");
                     imageNode.setAttribute('src', 'img/best_dog.jpg');
                     imageNode.setAttribute('class', 'w3-left w3-circle');
                     imageNode.setAttribute('style', 'width:60px');
                     var spanNodeOne = document.createElement('span');
                     spanNodeOne.innerHTML = data[0].name;
                     spanNodeOne.setAttribute('class','w3-xlarge');
                     var spanNodeTwo = document.createElement("span");
                     spanNodeTwo.innerHTML = data[0].description;
                     var spanNodeThree = document.createElement("span");
                     spanNodeThree.innerHTML = 'Rating: ' + data[0].rating + '/5';
          					 var spanNodeFour = document.createElement("span");
          					 spanNodeFour.setAttribute("class","w3-closebtn w3-margin-right w3-xlarge");
          					 spanNodeFour.innerHTML = "&times";
          					 spanNodeFour.addEventListener('click',function(){removeSelected(aid);this.parentElement.style.display='none'});
                     listNode.appendChild(imageNode);
                     listNode.appendChild(spanNodeOne);
					           listNode.appendChild(document.createElement("BR"));
                     listNode.appendChild(spanNodeThree);
					           listNode.appendChild(spanNodeFour);
                     listNode.appendChild(document.createElement("BR"));
                     listNode.appendChild(spanNodeTwo);
                     document.getElementById(listId).appendChild(listNode);
                     makeMarker(data[0]);
                     // display attraction to the map
                     // buildRouteWithOneAttraction(data);
            },
            error: function (err) {
                console.log('Error, Ajax call unsuccessful.', err);
            }
        });
    });
}

function displayRecommendedRoutes(listId,rid, uname){
    var routeParams = {"rid": rid, "username": uname};
    console.log("Display Rec Route parameters: " + JSON.stringify(routeParams));
    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            data: routeParams,
            dataType: 'json',
            url: 'http://159.203.47.53:8080/showRecRoute',
            success: function (data) {
                var jsonClicked_recRoute = data;
                var dataLength = Object.keys(jsonClicked_recRoute).length;
				console.log(dataLength);
                // returns A.name, A.description, A.rating, A.lat, A.lng, A.aid
				for(var x = 0;x<dataLength;x++)	{
					console.log("making selected");
					var listNode = document.createElement("LI");
                     listNode.setAttribute('class', 'w3-padding-16 w3-border-bottom w3-border-white');
                     var imageNode = document.createElement("IMG");
                     imageNode.setAttribute('src', 'img/best_dog.jpg');
                     imageNode.setAttribute('class', 'w3-left w3-circle');
                     imageNode.setAttribute('style', 'width:60px');
                     var spanNodeOne = document.createElement('span');
                     spanNodeOne.innerHTML = jsonClicked_recRoute[x].name;
                     spanNodeOne.setAttribute('class','w3-xlarge');
                     var spanNodeTwo = document.createElement("span");
                     spanNodeTwo.innerHTML = jsonClicked_recRoute[x].description;
                     var spanNodeThree = document.createElement("span");
                     spanNodeThree.innerHTML = 'Rating: ' + jsonClicked_recRoute[x].rating + '/5';
          					 var spanNodeFour = document.createElement("span");
          					 spanNodeFour.setAttribute("class","w3-closebtn w3-margin-right w3-xlarge");
          					 spanNodeFour.innerHTML = "&times";
          					 spanNodeFour.addEventListener('click',function(){removeSelected(jsonClicked_recRoute[x].aid);this.parentElement.style.display='none'});
                     listNode.appendChild(imageNode);
                     listNode.appendChild(spanNodeOne);
					           listNode.appendChild(document.createElement("BR"));
                     listNode.appendChild(spanNodeThree);
					           listNode.appendChild(spanNodeFour);
                     listNode.appendChild(document.createElement("BR"));
                     listNode.appendChild(spanNodeTwo);
                     document.getElementById(listId).appendChild(listNode);
					 selectedAids.push(jsonClicked_recRoute[x].aid);
					 console.log(jsonClicked_recRoute[x]+ " "+ jsonClicked_recRoute[x].aid);
					 makeMarker(jsonClicked_recRoute[x]);
				}(x);
            },
            error: function (err) {
                console.log('Error, Ajax call unsuccessful.', err);
            }
        });
    });
}


function getAttractions(listId,offset,x) {
     var attrTypes = {};
     attrTypes = updateAttractions();
     $(document).ready(function () {
         $.ajax({
             type: 'GET',
             data: attrTypes,
             url: 'http://159.203.47.53:8080/makeAttr',
             dataType: 'json',
             success: function (data) {
                 var jsonTypeAttr = data;
                 var dataLength = Object.keys(jsonTypeAttr).length;

                     var listNode = document.createElement("LI");
                     listNode.setAttribute('class', 'w3-padding-16 w3-border-bottom w3-border-white');
                     var imageNode = document.createElement("IMG");
                     imageNode.setAttribute('src', 'img/best_dog.jpg');
                     imageNode.setAttribute('class', 'w3-left w3-circle');
                     imageNode.setAttribute('style', 'width:60px');
                     var spanNodeOne = document.createElement('span');
                     spanNodeOne.innerHTML = jsonTypeAttr[x+offset].name;
                     spanNodeOne.setAttribute('class','w3-xlarge');
                     var spanNodeTwo = document.createElement("span");
                     spanNodeTwo.innerHTML = jsonTypeAttr[x+offset].description;
                     var spanNodeThree = document.createElement("span");
                     spanNodeThree.innerHTML = 'Rating: ' + jsonTypeAttr[x+offset].rating + '/5';
                     listNode.appendChild(imageNode);
                     listNode.appendChild(spanNodeOne);
		                 listNode.appendChild(document.createElement("BR"));
                     listNode.appendChild(spanNodeThree);
                     listNode.appendChild(document.createElement("BR"));
                     listNode.appendChild(spanNodeTwo);
			               listNode.addEventListener('click',function(){clickAttr(jsonTypeAttr[x+offset].aid);});
                     document.getElementById(listId).appendChild(listNode);
             },
             error: function (err) {
                 console.log('Error, Ajax call unsuccessful.', err);
             }
         });
     });
};

function getAttractionsForRoutes(listId,offset,x,isLast) {
    var attrTypes = {};
    attrTypes = updateAttractions();
    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            data: attrTypes,
            url: 'http://159.203.47.53:8080/makeAttr',
            dataType: 'json',
            success: function (data) {
                var jsonTypeAttr = data;
                var dataLength = Object.keys(jsonTypeAttr).length;

                var currentAid = jsonTypeAttr[x+offset].aid;
                var result = $.inArray(currentAid, selectedAids);

                if(result == -1) {
                    var listNode = document.createElement("LI");
                    listNode.setAttribute('class', 'w3-padding-16 w3-border-bottom w3-border-white');
                    var imageNode = document.createElement("IMG");
                    imageNode.setAttribute('src', 'img/best_dog.jpg');
                    imageNode.setAttribute('class', 'w3-left w3-circle');
                    imageNode.setAttribute('style', 'width:60px');
                    var spanNodeOne = document.createElement('span');
                    spanNodeOne.innerHTML = jsonTypeAttr[x + offset].name;
                    spanNodeOne.setAttribute('class', 'w3-xlarge');
                    var spanNodeTwo = document.createElement("span");
                    spanNodeTwo.innerHTML = jsonTypeAttr[x + offset].description;
                    var spanNodeThree = document.createElement("span");
                    spanNodeThree.innerHTML = 'Rating: ' + jsonTypeAttr[x + offset].rating + '/5';
                    listNode.appendChild(imageNode);
                    listNode.appendChild(spanNodeOne);
                    listNode.appendChild(document.createElement("BR"));
                    listNode.appendChild(spanNodeThree);
                    listNode.appendChild(document.createElement("BR"));
                    listNode.appendChild(spanNodeTwo);
                    listNode.addEventListener('click', function () {
                        clickAttr(jsonTypeAttr[x + offset].aid);
                    });
                    document.getElementById(listId).appendChild(listNode);
                }
				if(isLast == true)	{
						var count = $(document.getElementById(listId)).children("li").length;
						if(count < 4)	{
							getAttractionsForRoutes(listId,offset,x+1,true);
						}
				}
            },
            error: function (err) {
                console.log('Error, Ajax call unsuccessful.', err);
            }
        });
    });
};