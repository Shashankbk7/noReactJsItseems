//Static Data for Results
const restaurantData = [
  { data: "data1", info: "Lorem ipsum dolor sit amet consectetur" },
  { data: "data2", info: "Lorem ipsum dolor sit amet consectetur" },
  { data: "data3", info: "Lorem ipsum dolor sit amet consectetur" },
  { data: "data4", info: "Lorem ipsum dolor sit amet consectetur" },
  { data: "data5", info: "Lorem ipsum dolor sit amet consectetur" },
  { data: "data6", info: "Lorem ipsum dolor sit amet consectetur" },
  { data: "data7", info: "Lorem ipsum dolor sit amet consectetur" },
  { data: "data8", info: "Lorem ipsum dolor sit amet consectetur" },
  { data: "data9", info: "Lorem ipsum dolor sit amet consectetur" },
  { data: "data10", info: "Lorem ipsum dolor sit amet consectetur" },
];

////Index.js Section Module Need to be exported

//Selects button Button
const inputSearchButtonSelector = document.querySelector(".searchButton");

//Adds click event listener to the selected button
inputSearchButtonSelector.addEventListener(
  "click",
  (buttonTriggerHandler = (e) => {
    e.preventDefault();

    //Gets the Input Value after click the button
    const searchInputSelector =
      document.getElementById("searchInputText").value;
    console.log(searchInputSelector);

    //Fetch Api Should be added here Get Request

    ///for now i have added window object to redirect to results page
    window.location.href = "/referencePages/searchResult.html";
  })
);

////SearchResult.js Section Module Need to be exported

//iterates over the Array of Result Objects

for (i = 0; i < restaurantData.length; i++) {
  //Selects Parent Node Div to add Result Child Nodes to it
  const resultSectionSelector = document.querySelector(".searchResult");

  //creates div container to store result elements
  const resultSectionCreator = document.createElement("div");
  //Adds a classname to newely created div Element
  resultSectionCreator.classList.add("dataSection");

  //creates h1 tag to store data field
  const dataSectionCreaterDataField = document.createElement("h1");
  //creates a class name based on restaurant data for api usage*
  dataSectionCreaterDataField.classList.add(restaurantData[i].data);
  //Creates Text Node to insert the data to newely created h1 Element
  dataInserter = document.createTextNode(restaurantData[i].data);
  //appends the data field (Value) to the newely created Element
  dataSectionCreaterDataField.appendChild(dataInserter);

  //inserts the h1 element to the parent node (div)
  resultSectionCreator.appendChild(dataSectionCreaterDataField);
  //inserts the div node to its parent node (div)
  resultSectionSelector.appendChild(resultSectionCreator);

  //creates p element to store information field
  const dataSectionCreaterInformationField = document.createElement("p");
  //Creates Text Node to insert the data to newely created p Element
  informationInserter = document.createTextNode(restaurantData[i].info);
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
    //getRequest using Fetch api needs to be implemented
  });
});
