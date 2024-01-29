var a = document.getElementById("name");
var age = document.getElementById("password");
var email = document.getElementById("email")

function sendData() {
    fetch("http://localhost:3000/addInfo", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({name:a.value,password:password.value,email:email.value})
      })

}
