
getData();

function  getData() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer fec7a9f4-3ec2-4039-ad21-07cafca8c4a5");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://sistech-api.vercel.app/blog/", requestOptions)
    .then(response => response.text())
    .then(result => {
        var res = JSON.parse(result)
        res.forEach((val, index) => {
            addDataToTable(val)
            console.log(val);
        })
        console.log(result)
    })
    .catch(error => console.log('error', error));
}

function addDataToTable(blog) {
    console.log(blog)
    var table = document.getElementById("child-blog-list")
    var newRow = `
    <tr>
        <td>`+ blog.id +`</th>
        <td>`+ blog.title +`</td>
        <td>`+ blog.content +`</td>
        <td>`+ blog.like +` <button class="btn btn-light" value="`+ blog.id +`" onClick="like(this.value)">👍</button></td>
        <td>
            <a href ="./edit.html?id=`+ blog.id +`&title=`+ blog.title+`&content=`+ blog.content +`">Edit</a>
        </td>
    </tr>
    `
    var cardBlog = `
    <div class="card col-4">
        <div class="card-body">
        <h5 class="card-title">`+ blog.title +`</h5>
        <p class="card-text">`+ blog.content + `</p>
        <button class="btn btn-primary" value="`+ blog.id +`" onClick="like(this.value)">👍</button>
        <a class="btn btn-primary" href ="./edit.html?id=`+ blog.id +`&title=`+ blog.title+`&content=`+ blog.content +`">Edit</a>
        </div>
    </div>
    `
    table.insertAdjacentHTML("afterend",cardBlog)
}

function like(id) {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer fec7a9f4-3ec2-4039-ad21-07cafca8c4a5");

var raw = JSON.stringify({
  "id": id
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://sistech-api.vercel.app/blog/like", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}