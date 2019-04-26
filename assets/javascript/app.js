function readSingleFile(e) {
  let file = e.target.files[0];

  if (!file) {
    return;
  }

  let reader = new FileReader();

  reader.onload = function (e) {
    let contents = e.target.result;
    
    displayContents(objectifyCsv(contents))
    
  };

  reader.readAsText(file);

}

// Iterates over the CSV and turns its content into an array of objects.
function objectifyCsv(csv){
  let lines = csv.split("\n")
  let separatedLines = []
  lines.forEach(line => {
    let lineData = line.split(",")
    lineData.splice(3,2)
    separatedLines.push(lineData)
  })

  let objList = separatedLines.map(line => (
    {
      studentId: line[0],
      firstName: line[1],
      lastName: line[2]
    }
  ))

  objList.splice(0,1)

  localStorage.setItem("objList", JSON.stringify(objList))

  return objList

}

// Display File Content to page
function displayContents(students) {
  students.forEach(student => {
    document.getElementById("table-body").appendChild(createTableRow(student))
    let table = document.getElementById("table")
    table.classList.remove("hidden")
    table.classList.add("visible")
  })
}

// Creates a table row for the given student.
function createTableRow(student) {
    let tr = document.createElement("tr")

    for (let key in student) {
      if (student[key]) {
        tr.appendChild(createCell(student[key]))
      }
    }

    return tr

}

// Creates a cell for the given data.
function createCell(student) {
  let tdElem = document.createElement("td")
  let node = document.createTextNode(student)
  tdElem.appendChild(node)

  return tdElem

}

// Listens for a change on the file input.
document.getElementById('file-input').addEventListener('change', readSingleFile, false);