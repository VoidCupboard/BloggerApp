<template>
<div class="_container">
    <h1 class="text-center text-4xl">Edit Blog Post</h1>
    <br><br>
    <input type="text" placeholder="Choose a good title..." class="px-3 py-3 relative rounded text-sm border-0 shadow outline-none w-full" v-model="title" />
    <br><br>
    <textarea name="desc" v-model="desc" placeholder="Enter the description" class="px-3 py-3 relative rounded text-sm border-0 shadow outline-none w-full"></textarea>
    <br><br>
    <button class="px-3 py-3 relative rounded text-sm border-0 shadow outline-none w-full" style="width: 100%" v-on:click="editPost()">Sumbit</button>
</div>
</template>

<script>
export default {
    name: "Edit",
    data() {
        return {
            id: "",
            title: "",
            desc: ""
        }
    },
    mounted() {
        this.id = this.$route.params.id

        const ACCESS_TOKEN = process.env.ACCESS_TOKEN


        fetch(`https://amplicationbloggerapp.herokuapp.com/api/blogs/${this.id}`, {
                method: "GET",
                headers: {
                    "Authorization": "Basic " + ACCESS_TOKEN
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.author != this.getCookie("username")) {
                    alert("You cannot edit this post because you are not the author")

                    this.$router.push({
                        path: `/blog/${this.id}`
                    })
                }
                this.title = data.title
                this.desc = data.description
            })
    },
    methods: {
        getCookie: function (name) {
            var match = document.cookie.match(
                new RegExp("(^| )" + name + "=([^;]+)")
            );
            if (match) return match[2];
        },
        editPost: function () {
            fetch(`https://amplicationbloggerapp.herokuapp.com/api/blogs/${this.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + ACCESS_TOKEN
                    },
                    body: JSON.stringify({
                        id: this.id,
                        title: this.title,
                        description: this.desc
                    })
                })
                .then(res => res.json())
                .then(data => {
                    this.$router.push({
                        path: `/blog/${this.id}`
                    })
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
