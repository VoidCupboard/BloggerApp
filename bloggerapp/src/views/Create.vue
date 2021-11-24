<template>
<div class="container">
    <h2 class="center-align">Create a new blog</h2>
    <input type="text" v-model="title" placeholder="Enter the title">
    <textarea name="desc" v-model="desc" placeholder="Enter the description"></textarea>
    <button class="btn" style="width: 100%" v-on:click="addBlogPost()">Sumbit</button>
</div>
</template>

<script>
export default {
    name: "Create",
    data() {
        return {
            title: "",
            desc: ""
        }
    },
    methods: {
        addBlogPost: function () {
            const username = this.getCookie("username");
            const password = this.getCookie("password")

            if(!this.title || !this.desc) {
                alert("Fields cannot be empty!")
            }

            fetch("http://localhost:3000/api/login", {
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
                    if (!data.accessToken) {
                        this.$router.push({
                            path: "/signin"
                        })
                    }
                })

            fetch("http://localhost:3000/api/blogs", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic YWRtaW46YWRtaW4="
                    },
                    body: JSON.stringify({
                        title: this.title,
                        description: this.desc
                    })
                })
            
            .then(res => res.json())
            .then(data => {
                this.$router.push({ path: `/blog/${data.id}` })
            })
        },
        getCookie: function (name) {
            var match = document.cookie.match(
                new RegExp("(^| )" + name + "=([^;]+)")
            );
            if (match) return match[2];
        },
    }
}
</script>
