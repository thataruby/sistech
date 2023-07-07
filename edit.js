
SetEditData();

function SetEditData() {
    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");  
    let title = params.get("title");  
    let content = params.get("content");  
    console.log(id);

    document.getElementById("title").defaultValue = title
    document.getElementById("content").defaultValue = content
}

const form = document.getElementById("edit-form")

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default from submission

    // retrieve form values
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // perform processing or validation on the form values
    console.log('title:', title);
    console.log('content:', content);

    // submit data
    submitData(title,content);
    
   // form.reset();

})

//copasan dari postman
function submitData(title, content) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer fec7a9f4-3ec2-4039-ad21-07cafca8c4a5");

    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");  

    var raw = JSON.stringify({
    "id": id,
    "title":  title,
    "content": content
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://sistech-api.vercel.app/blog/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    
}