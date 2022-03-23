// //api to get
const getRequest = async (x) => {
  const response = await fetch(
    `https://bangalore-adda-default-rtdb.firebaseio.com/${x}.json`
  );
  const data = await response.json();
  domInserter(data);
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
    getRequest(searchInputSelectorValue);
    ///for now i have added window object to redirect to results page

    //Fetch Api Get Request
  }
);

// const restaurantData = [
//   { data: "Nagarabhavi", info: "Lorem ipsum dolor sit amet consectetur" },
//   { data: "data2", info: "Lorem ipsum dolor sit amet consectetur" },
//   { data: "data3", info: "Lorem ipsum dolor sit amet consectetur" },
//   { data: "data4", info: "Lorem ipsum dolor sit amet consectetur" },
//   { data: "data5", info: "Lorem ipsum dolor sit amet consectetur" },
//   { data: "data6", info: "Lorem ipsum dolor sit amet consectetur" },
//   { data: "data7", info: "Lorem ipsum dolor sit amet consectetur" },
//   { data: "data8", info: "Lorem ipsum dolor sit amet consectetur" },
//   { data: "data9", info: "Lorem ipsum dolor sit amet consectetur" },
//   { data: "data10", info: "Lorem ipsum dolor sit amet consectetur" },
// ];
const domInserter = (restaurantData) => {
  const parsedResult = [];

  if (restaurantData == null) {
    alert("Area Not Found");
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

    //creates h1 tag to store data field
    const dataSectionCreaterDataField = document.createElement("h1");
    //creates a class name based on restaurant data for api usage*
    dataSectionCreaterDataField.classList.add(parsedResult[i].name);
    //Creates Text Node to insert the data to newely created h1 Element
    const dataInserter = document.createTextNode(parsedResult[i].name);
    //appends the data field (Value) to the newely created Element
    dataSectionCreaterDataField.appendChild(dataInserter);

    //inserts the h1 element to the parent node (div)
    resultSectionCreator.appendChild(dataSectionCreaterDataField);
    //inserts the div node to its parent node (div)
    resultSectionSelector.appendChild(resultSectionCreator);

    //creates p element to store information field
    const dataSectionCreaterInformationField = document.createElement("p");
    //Creates Text Node to insert the data to newely created p Element
    const informationInserter = document.createTextNode(
      parsedResult[i].address
    );
    //appends the data field (Value) to the newely created Element
    dataSectionCreaterInformationField.appendChild(informationInserter);

    //inserts the p element to the parent node (div)
    resultSectionCreator.appendChild(dataSectionCreaterInformationField);
    //inserts the div node to its parent node (div)
    resultSectionSelector.appendChild(resultSectionCreator);
  }

  //selects all the child elements inside the dataSection class name and add click event listener to every child nodes

  document.querySelectorAll(".dataSection").forEach((item) => {
    item.addEventListener("click", function () {
      console.log(item.firstChild.classList.value);
      //API needs to be implemented
    });
  });
};
