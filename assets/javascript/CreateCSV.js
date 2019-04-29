function CreateCsv(studentData) {
    let lines = studentData.map(student => `${student.studentId},${student.firstName},${student.lastName}\n`)
    let csvContent = "data:text/csv;charset=utf-8," 
    lines.forEach(line => {
        csvContent += line
    })

    var encodedUri = encodeURI(csvContent);
    var downloadButton = document.getElementById("download-btn")
    downloadButton.setAttribute("href", encodedUri);
    downloadButton.setAttribute("download", "my_data.csv");
    downloadButton.classList.remove("hidden")
    downloadButton.classList.add("visible")

}