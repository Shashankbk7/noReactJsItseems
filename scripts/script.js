// //api to get
document.getElementById("category").style.display = "None";

const getRequest = async (x, loc) => {
  let southAPI = "http://127.0.0.1:8080/southIndian.php";
  let northAPI = "http://127.0.0.1:8080/northIndian.php";

  const response = await fetch(loc == "South Indian" ? southAPI : northAPI);
  let data = await response.json();

  for (let i = 0; i < data.length; i++) {
    let result = bfs(x, data[i].restaurantLocation);
    data[i].restaurantDistance = result;
  }
  const sortedData = data.sort((a, b) => {
    if (a.restaurantDistance < b.restaurantDistance) {
      return -1;
    }
    if (a.restaurantDistance > b.restaurantDistance) {
      return 1;
    }
    return 0;
  });

  domInserter(sortedData);
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
    count = 0;

  while (queue.length) {
    const place = queue.shift();
    level += 1;
    const destinations = adjacencyList.get(place);
    destinations.forEach((destination) => {
      if (destination === dest) {
        count = count + 1;
        if (count == 1) {
          // console.log("Restaurant is at a distance of ", level * 1.5);
          distance = parseInt(level * 1.5);
          // distance.toString();
          // distance = distance + " KM";

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
      document.getElementById("category").style.display = "flex";
      document.getElementById("searchInputText").style.display = "None";
      document.getElementById("btnCode").style.display = "None";
      document.querySelector(".heading").style.display = "None";

      document.getElementById("South").addEventListener("click", (e) => {
        e.preventDefault();
        getRequest(searchInputSelectorValue, e.target.innerHTML);
        const x = document.getElementById("searchResult");
        x.scrollIntoView();
      });
      document.getElementById("North").addEventListener("click", (e) => {
        e.preventDefault();
        getRequest(searchInputSelectorValue, e.target.innerHTML);
        const x = document.getElementById("searchResult");
        x.scrollIntoView();
      });
    }
  }
);

const domInserter = (restaurantData) => {
  const parsedResult = [];
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

  if (document.querySelector(".searchResult").childNodes.length > 1) {
    while (document.querySelector(".searchResult").firstChild) {
      document
        .querySelector(".searchResult")
        .removeChild(document.querySelector(".searchResult").lastChild);
    }
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
    resultSectionCreator.appendChild(imageInserter);
    //creates h1 tag to store data field

    const menuHeading = document.createElement("h2");
    const menuHeadingDataField = document.createTextNode("Menu");
    menuHeading.classList.add("menuHead");
    menuHeading.appendChild(menuHeadingDataField);
    menuHeading.style.display = "None";
    menuHeading.style.color = "black";
    menuHeading.style.textAlign = "center";

    resultSectionCreator.appendChild(menuHeading);

    const dataSectionCreaterDataField = document.createElement("h2");
    //creates a class name based on restaurant data for api usage*
    dataSectionCreaterDataField.classList.add(parsedResult[i].restaurantId);
    dataSectionCreaterDataField.style.textAlign = "center";

    //Creates Text Node to insert the data to newely created h1 Element
    const dataInserter = document.createTextNode(
      parsedResult[i].restaurantName
    );

    //appends the data field (Value) to the newely created Element
    dataSectionCreaterDataField.appendChild(dataInserter);

    //inserts the h1 element to the parent node (div)

    resultSectionCreator.appendChild(dataSectionCreaterDataField);
    //inserts the div node to its parent node (div)
    resultSectionSelector.appendChild(resultSectionCreator);

    const menuSectionCreater = document.createElement("h3");
    menuSectionCreater.classList.add("menu");
    menuSectionCreater.style.textAlign = "center";
    menuSectionCreater.style.display = "None";
    const menuInserter = document.createTextNode(
      parsedResult[i].restaurantMenu
    );
    menuSectionCreater.appendChild(menuInserter);
    resultSectionCreator.appendChild(menuSectionCreater);

    const distanceSectionCreator = document.createElement("h4");
    distanceSectionCreator.classList.add("distance");
    const distanceInserter = document.createTextNode(
      `${parsedResult[i].restaurantDistance} Km`
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
    console.log();
  }

  //selects all the child elements inside the dataSection class name and add click event listener to every child nodes

  document.querySelectorAll(".dataSection").forEach((item) => {
    item.addEventListener("click", function () {
      item.children[2].style.display = "None";
      item.children[4].style.display = "None";
      item.children[3].style.display = "Block";
      item.children[5].style.display = "None";
      item.children[0].style.display = "Block";
      item.children[1].style.display = "Block";

      // window.open(
      //   `https://www.google.com/search?q=${item.children[1].innerHTML}`,
      //   "_blank"
      // );

      //API needs to be implemented
    });
  });
};
