<template>
    <div class="container">
        <h1 class="center-align">Edit Blog Post</h1>
        <input type="text" v-model="title">
        <textarea v-model="desc"></textarea>
        <button class="btn" v-on:click="editPost()">Edit Blog Post</button>
    </div>
</template>

<script>
export default {
    name: "Edit",
    data(){
        return {
            id: "",
            title: "",
            desc: ""
        }
    },
    mounted(){
        this.id = this.$route.params.id

        fetch(`http://localhost:3000/api/blogs/${this.id}` , {
            method: "GET",
            headers: {
                "Authorization": "Basic YWRtaW46YWRtaW4="
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.author != this.getCookie("username")){
                alert("You cannot edit this post because you are not the author")

                this.$router.push({ path: `/blog/${this.id}` })
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
        editPost: function(){
            fetch(`http://localhost:3000/api/blogs/${this.id}` , {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46YWRtaW4="
                },
                body: JSON.stringify({
                    id: this.id,
                    title: this.title,
                    description: this.desc
                })
            })
            .then(res => res.json())
            .then(data => {
                this.$router.push({ path: `/blog/${this.id}` })
            })
        }
    }
}
</script>