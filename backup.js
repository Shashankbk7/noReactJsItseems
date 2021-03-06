// //api to get
console.log(document.querySelector(".searchResult"));
document.getElementById("category").style.display = "None";

const getRequest = async (x) => {
  const response = await fetch(`http://127.0.0.1:8080/northIndian.php`);
  let data = await response.json();

  for (let i = 0; i < data.length; i++) {
    let result = bfs(x, data[i].restaurantLocation);
    data[i].restaurantDistance = result;
  }
  domInserter(data);
  data = "";
};

const places =
  "9THblock Pattabhiramnagar Byrasandra J.P.Nagar 33rdCross 16thMAIN PavillionRoad RKColony MGlayout 22ndcrossroad".split(
    " "
  );

const routes = [
  ["9THblock", "Pattabhiramnagar"],
  ["9THblock", "Byrasandra"],
  ["9THblock", "J.P.Nagar"],
  ["9THblock", "RKColony"],
  ["Pattabhiramnagar", "33rdCross"],
  ["Pattabhiramnagar", "16thMAIN"],
  ["Pattabhiramnagar", "22ndcrossroad"],
  ["Byrasandra", "PavillionRoad"],
  ["Byrasandra", "22ndcrossroad"],
  ["J.P.Nagar", "RKColony"],
  ["J.P.Nagar", "MGlayout"],
];

const adjacencyList = new Map();
let distance;
const addNode = (place) => {
  adjacencyList.set(place, []);
};

places.forEach((place) => addNode(place));

console.log(adjacencyList);

const addEdge = (origin, destination) => {
  adjacencyList.get(origin).push(destination);
  adjacencyList.get(destination).push(origin);
};
routes.forEach((route) => addEdge(...route));

const bfs = (start, dest) => {
  let queue = [start];
  const visited = new Set();
  let level = 0,
    numberOfRoutes = 0;

  while (queue.length) {
    const place = queue.shift();
    //console.log(place)
    level += 1;
    const destinations = adjacencyList.get(place);
    destinations.forEach((destination) => {
      if (destination === dest) {
        if ((level = 1)) {
        }
        numberOfRoutes = numberOfRoutes + 1;
        if (numberOfRoutes == 1) {
          // console.log("Restaurant is at a distance of ", level * 1.5);
          distance = level * 1.5;
          distance.toString();
          distance = distance + " KM";

          queue = [];
        }
      } else {
        if (!visited.has(destination)) {
          visited.add(destination);
          queue.push(destination);
        }
      }
    });
  }
  return distance;
};

//Selects button Button
const inputSearchButtonSelector = document.querySelector(".searchButton");

//Adds click event listener to the selected button
inputSearchButtonSelector.addEventListener(
  "click",
  function buttonTriggerHandler(e) {
    e.preventDefault();

    //Gets the Input Value after click the button
    const searchInputSelectorValue =
      document.getElementById("searchInputText").value;

    if (searchInputSelectorValue == "" || null) {
      alert("Enter the Area Name");
    }

    if (isNaN(searchInputSelectorValue) == false) {
      document.getElementById("searchInputText").style.borderColor = "Red";

      document.getElementsByClassName("searchInput")[0].value =
        "we couldn't understand what you mean try again! ";
      document.getElementsByClassName("searchInput")[0].style.color = "black";
      setTimeout(() => {
        document.getElementsByClassName("searchInput")[0].value = "";
        document.getElementsByClassName("searchInput")[0].style.color = "black";
      }, 3000);
    } else {
      getRequest(searchInputSelectorValue);
      document.getElementById("category").style.display = "flex";
      document.getElementById("searchInputText").style.display = "None";
      document.getElementById("btnCode").style.display = "None";
    }

    ///for now i have added window object to redirect to results page

    //Fetch Api Get Request
  }
);

const north = document.getElementById("South");
const chinese = document.getElementById("South");

const domInserter = (restaurantData) => {
  const parsedResult = [];

  console.log(restaurantData);
  if (restaurantData == null) {
    document.getElementById("searchInputText").style.borderColor = "Red";

    document.getElementsByClassName("searchInput")[0].value =
      "Currently Not Serving this Area";
    document.getElementsByClassName("searchInput")[0].style.color = "black";
    setTimeout(() => {
      document.getElementsByClassName("searchInput")[0].value = "";
      document.getElementsByClassName("searchInput")[0].style.color = "black";
    }, 3000);
  }

  for (var item in restaurantData) {
    parsedResult.push(restaurantData[item]);
  }

  for (var i = 0; i < parsedResult.length; i++) {
    console.log(parsedResult);
    //Selects Parent Node Div to add Result Child Nodes to it
    const resultSectionSelector = document.querySelector(".searchResult");

    //creates div container to store result elements
    const resultSectionCreator = document.createElement("div");
    //Adds a classname to newely created div Element
    resultSectionCreator.classList.add("dataSection");

    const imageInserter = document.createElement("img");
    imageInserter.src = parsedResult[i].restaurantImage;
    //creates h1 tag to store data field
    const dataSectionCreaterDataField = document.createElement("h2");
    //creates a class name based on restaurant data for api usage*
    dataSectionCreaterDataField.classList.add(parsedResult[i].restaurantId);
    //Creates Text Node to insert the data to newely created h1 Element
    const dataInserter = document.createTextNode(
      parsedResult[i].restaurantName
    );
    //appends the data field (Value) to the newely created Element
    dataSectionCreaterDataField.appendChild(dataInserter);

    //inserts the h1 element to the parent node (div)
    resultSectionCreator.appendChild(imageInserter);
    resultSectionCreator.appendChild(dataSectionCreaterDataField);
    //inserts the div node to its parent node (div)
    resultSectionSelector.appendChild(resultSectionCreator);

    const distanceSectionCreator = document.createElement("h4");
    const distanceInserter = document.createTextNode(
      parsedResult[i].restaurantDistance
    );
    distanceSectionCreator.appendChild(distanceInserter);
    resultSectionCreator.appendChild(distanceSectionCreator);
    //creates p element to store information field
    const dataSectionCreaterInformationField = document.createElement("p");
    //Creates Text Node to insert the data to newely created p Element
    const informationInserter = document.createTextNode(
      parsedResult[i].restaurantLocation
    );

    //appends the data field (Value) to the newely created Element
    dataSectionCreaterInformationField.appendChild(informationInserter);

    //inserts the p element to the parent node (div)
    resultSectionCreator.appendChild(dataSectionCreaterInformationField);
    //inserts the div node to its parent node (div)
    resultSectionSelector.appendChild(resultSectionCreator);
  }

  //selects all the child elements inside the dataSection class name and add click event listener to every child nodes

  // document.querySelectorAll(".dataSection").forEach((item) => {
  //   item.addEventListener("click", function () {
  //     console.log(item.children[1].innerHTML);
  //     //API needs to be implemented
  //   });
  // });
};
