<template>
<div class="_container">
    <h2 class="text-center text-4xl">Sign In</h2>
    <br><br>
    <input type="text" placeholder="Enter the username" class="px-3 py-3 relative rounded text-sm border-0 shadow outline-none w-full" v-model="username" />
    <br><br>
    <input type="password" v-model="password" placeholder="Enter the password" class="px-3 py-3 relative rounded text-sm border-0 shadow outline-none w-full">
    <br><br>
    <button class="px-3 py-3 relative rounded text-sm border-0 shadow outline-none w-full" style="width: 100%" v-on:click="authenticate()">Sign In</button>
</div>
</template>

<script>
import moment from "moment"

export default {
    name: "SignUp",
    data() {
        return {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
        }
    },
    methods: {
        createUser: function(){
            const ACCESS_TOKEN = process.env.ACCESS_TOKEN

            fetch("https://amplicationbloggerapp.herokuapp.com/api/users/" , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + ACCESS_TOKEN
                },
                body: JSON.stringify({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    username: this.username,
                    password: this.password,
                    roles: [
                        "user"
                    ]
                })
            })
            .then(res => res.json())
            .then(data => {
                if(!data.id){
                    alert("Incorrect details")
                } else {
                    const expiryTime = moment(moment.now()).add(1 , "month")

                    document.cookie = `username=${this.username}`

                    document.cookie = `password=${this.password}`

                    document.cookie = `expires=${expiryTime.toString()}`

                    this.$router.push({ path: "/" })
                }
            })
        }
    }
}
</script>


<style scoped>
._container {
    color: #D8DEE9;
    font-family: "Comfortaa";
    margin: 100px;
}

input , textarea , button{
    background-color: #3B4252;
    height: 50px;
}

textarea{
    height: 300px;
    resize: none;
}
</style>
