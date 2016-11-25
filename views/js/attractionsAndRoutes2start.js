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
                listNode.setAttribute('onclick', "this.style.display='none'");
                var imageNode = document.createElement("IMG");
                imageNode.setAttribute('src', 'img/best_dog.jpg');
                imageNode.setAttribute('class', 'w3-left w3-circle');
                imageNode.setAttribute('style', 'width:60px');
                var spanNodeOne = document.createElement('span');
                spanNodeOne.innerHTML = jsonPopAttr[y].name;
                spanNodeOne.setAttribute('class','w3-xlarge');
                var spanNodeTwo = document.createElement("span");
                spanNodeTwo.innerHTML = jsonPopAttr[y].description;
                listNode.appendChild(imageNode);
                listNode.appendChild(spanNodeOne);
                listNode.appendChild(document.createElement("BR"));
                listNode.appendChild(spanNodeTwo);
                document.getElementById(listId).appendChild(listNode);
                y += 1;
            },
            error: function (err) {
                console.log('Error, Ajax call unsuccessful.', err);
            }
        });
    });
 };

function getRecommendedRoutes(listId) {
	$(document).ready(function() {
	$.ajax({
             type: 'GET',
             url: 'http://159.203.47.53:8080/recRoute',
             dataType: 'json',
             success: function(data) {
		var jsonRecRoutes = data;
		console.log(y)
		var listNode = document.createElement("LI");
		listNode.setAttribute('class', 'w3-padding-16 w3-border-bottom w3-border-white');
		listNode.setAttribute('onclick', "this.style.display='none'");
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
		document.getElementById(listId).appendChild(listNode);
		y +=1
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

function getAttractions(listId) {
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

                 // reset node content, so new result could be displayed
                 $(listId).empty();

                 // Alternative way:
                 //var node = document.getElementById(listId);
                 //while (node.hasChildNodes()) {
                 //    node.removeChild(node.firstChild);
                 //}

                 for(x = 0; x < dataLength ; x++){
                     var listNode = document.createElement("LI");
                     listNode.setAttribute('class', 'w3-padding-16 w3-border-bottom w3-border-white');
                     listNode.setAttribute('onclick', "this.style.display='none'");
                     var imageNode = document.createElement("IMG");
                     imageNode.setAttribute('src', 'img/best_dog.jpg');
                     imageNode.setAttribute('class', 'w3-left w3-circle');
                     imageNode.setAttribute('style', 'width:60px');
                     var spanNodeOne = document.createElement('span');
                     spanNodeOne.innerHTML = jsonTypeAttr[x].name;
                     spanNodeOne.setAttribute('class','w3-xlarge');
                     var spanNodeTwo = document.createElement("span");
                     spanNodeTwo.innerHTML = jsonTypeAttr[x].description;
                     var spanNodeThree = document.createElement("span");
                     spanNodeThree.innerHTML = jsonTypeAttr[x].rating;
                     listNode.appendChild(imageNode);
                     listNode.appendChild(spanNodeOne);
                     listNode.appendChild(spanNodeThree);
                     listNode.appendChild(document.createElement("BR"));
                     listNode.appendChild(spanNodeTwo);
                     document.getElementById(listId).appendChild(listNode);
                 }
             },
             error: function (err) {
                 console.log('Error, Ajax call unsuccessful.', err);
             }
         });
     });
};
