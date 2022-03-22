// //api
const getRequest = async (x) => {
  const array = [];
  const response = await fetch(
    `https://bangalore-adda-default-rtdb.firebaseio.com/${x}.json`
  );
  const data = await response.json();
  console.log(data);
  console.log(data);
  array.push(array);
  array.forEach((x) => {
    localStorage.setItem("data", data[x]);
  });
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

    window.location.href = "/referencePages/searchResult.html";

    //Fetch Api Get Request
  }
);

////SearchResult.js Section Module Need to be exported
const noice = (val) => {
  maxdata = val;
};
//iterates over the Array of Result Objects=
