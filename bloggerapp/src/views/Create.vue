<template>
<div class="_container">
    <h2 class="text-center text-4xl">Create a new blog</h2>
    <br><br>
    <input type="text" placeholder="Choose a good title..." class="px-3 py-3 relative rounded text-sm border-0 shadow outline-none w-full" v-model="title"/>
    <br><br>
    <textarea name="desc" v-model="desc" placeholder="Enter the description" class="px-3 py-3 relative rounded text-sm border-0 shadow outline-none w-full"></textarea>
    <br><br>
    <button class="px-3 py-3 relative rounded text-sm border-0 shadow outline-none w-full" style="width: 100%" v-on:click="addBlogPost()">Sumbit</button>
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
                        author: this.getCookie("username"),
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

<style scoped>
._container{
    color: #D8DEE9;
    font-family: "Comfortaa";
    margin: 80px
}

input , textarea , button{
    background-color: #3B4252 !important;
    color: #D8DEE9;
    height: 50px;
    resize: none;
    padding-left: 20px !important;
}

button{
    height: 70px;
    font-size: 20px !important;
}

textarea{
    height: 300px;
    padding: 20px !important;
}

input:focus , textarea:focus , button:hover{
    border: 3px solid #88C0D0 !important;
}
</style>