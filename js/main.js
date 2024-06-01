let NameWebsite = document.getElementById("NameWebsite");
let WebsiteLink = document.getElementById("WebsiteLink");
let tableContainer = document.getElementById("tableContainer");
let agValid = document.getElementById("agValid");
let searchName = document.getElementById("searchName");
let updateWebsite = document.getElementById("updateWebsite");
let submitBtn = document.getElementById("submitBtn");

let mood = "create";
let temp;

// new Array empty to push all object in array
let webSiteArray;
if (localStorage.getItem("WebsiteAll") != null) {
  webSiteArray = JSON.parse(localStorage.getItem("WebsiteAll"));
  showData(webSiteArray);
} else {
  webSiteArray = [];
}

// to add url
function add() {
  let webSite = {
    name: NameWebsite.value,
    Url: WebsiteLink.value,
  };
  if (
    NameWebsite.classList.contains("is-valid") &&
    WebsiteLink.classList.contains("is-valid")
  ) {
    webSiteArray.push(webSite);
    localStorage.setItem("WebsiteAll", JSON.stringify(webSiteArray));
    agValid.innerHTML = " Site Name  &&  Site URL ADD Done";
    agValid.classList.add("text-success");
    agValid.classList.remove("text-danger");
  } else {
    agValid.innerHTML =
      " Site Name or Url is not valid, Please follow the rules below ";
    agValid.classList.add("text-danger");
    agValid.classList.remove("text-text-success"); // Typo here
  }
  clear();
  showData(webSiteArray);
  console.log(webSiteArray);
}

// to clear input after submit input//
function clear() {
  NameWebsite.value = "";
  WebsiteLink.value = "";
}

// after get input value show data to cst
function showData(list) {
  let container = ``;
  for (let i = 0; i < list.length; i++) {
    container += `
              <tr>
            <th>${i + 1}</th>
            <td>${list[i].name}</td>
            <td>
              <button class="btn btn-success" data-index="0">
                          <i class="fa-solid fa-eye pe-2">
               <a href="${
                 list[i].Url
               }" target="_blank" class="text-decoration-none text-white fs-6">Visit</a></i>
              </button>
            </td>
            <td>
                  <button class="btn btn-danger" onclick="deleteEntry(${i})">
                    <i class="fa-solid fa-trash pe-2"></i>Delete
                  </button>
            </td>
                        <td>
                  <button class="btn btn-warning" onclick="update(${i})">
                    <i class="fa-regular fa-pen-to-square"></i>update
                  </button>
            </td>
          </tr>
    `;
  }
  tableContainer.innerHTML = container;
}

// deleteEntry
function deleteEntry(index) {
  webSiteArray.splice(index, 1);
  localStorage.setItem("WebsiteAll", JSON.stringify(webSiteArray)); // Update local storage
  showData(webSiteArray); // Update the table
}

// validations
function validations(element) {
  let REX = {
    NameWebsite: /(.*[a-z]){3}/i,
    WebsiteLink:
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g,
  };

  if (REX[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    console.log("true");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
    console.log("false");
  }
}

//  search
function search() {
  let searchResult = [];
  for (let i = 0; i < webSiteArray.length; i++) {
    if (
      webSiteArray[i].name
        .toLowerCase()
        .includes(searchName.value.toLowerCase()) == true
    ) {
      console.log("hello");
      searchResult.push(webSiteArray[i]);
    }
  }

  showData(searchResult);
}

function delateAll() {
  localStorage.clear();
  webSiteArray.splice(0, webSiteArray.length); // Clear the array
  showData(webSiteArray); // Update the table
}
// update
function update(i) {
  NameWebsite.value = webSiteArray[i].name;
  WebsiteLink.value = webSiteArray[i].Url;
  updateWebsite.classList.add("d-block");
  updateWebsite.classList.remove("d-none");
  submitBtn.classList.add("d-none");
  submitBtn.classList.remove("d-block");

  temp = i;
}
function updateData() {
  webSiteArray[temp].name = NameWebsite.value;
  webSiteArray[temp].Url = WebsiteLink.value;
  showData(webSiteArray);
  //update local storage
  localStorage.setItem("WebsiteAll", JSON.stringify(webSiteArray));
  clear()
    updateWebsite.classList.add("d-none");
    updateWebsite.classList.remove("d-block");
    submitBtn.classList.add("d-block");
    submitBtn.classList.remove("d-none");
  console.log("hello");
}
