<template>
    <div class="container">
        <h2 class="center-align">Sign In</h2>
        <input type="text" v-model="username" placeholder="Enter your username">
        <input type="password" v-model="password" placeholder="Enter your password">
        <button class="btn" style="width: 100%" v-on:click="authenticate()">Sumbit</button>
    </div>
</template>

<script>
import moment from "moment"

export default {
    name: "SignIn",
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        authenticate() {
            fetch("http://localhost:3000/api/login" , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46YWRtaW4="
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data.accessToken)
                if(!data.accessToken){
                    alert("Invalid Credentials")
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