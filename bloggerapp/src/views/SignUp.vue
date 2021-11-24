<template>
    <div class="container">
        <h2 class="center-align">Sign Up</h2>
        <input type="text" v-model="firstName" placeholder="Enter your first name">
        <input type="text" v-model="lastName" placeholder="Enter your last name">
        <input type="text" v-model="username" placeholder="Enter your username">
        <input type="password" v-model="password" placeholder="Enter your password">
        <button class="btn" style="width: 100%" v-on:click="createUser()">Sumbit</button>
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
            fetch("http://localhost:3000/api/users/" , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46YWRtaW4="
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