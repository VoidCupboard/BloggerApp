module.exports = function(username , password){
    console.log(username, password)
    window.flag = false
    fetch("http://localhost:3000/api/login" , {
        headers: {
            "Authorization": "Basic YWRtaW46YWRtaW4=",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.accessToken){
            window.flag = true
        }
    })

    return window.flag
}