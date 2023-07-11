
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-primary alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('You have updated your blog!', 'success')
  })
}

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
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    console.log('title:', title);
    console.log('content:', content);

    submitData(title,content);

})

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