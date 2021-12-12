<template>
    <div class="container">
        <h2 class="center-align">{{blog.title}}</h2>  
        <div class="utils" v-if="author == currUser">
            <button class="btn" v-on:click="editPost()">Edit this post</button>
            <button class="btn" v-on:click="deletePost()">Delete this post</button>

        </div>     
        <br>
        <span class="description">{{blog.description}}</span>
        <br>
        <hr>
        <br>
        <div class="like" style="display: flex">
            <i class="fas fa-heart" :style="`font-size: 40px; color: ${color}`" v-on:click="likePost()"></i>
            <div class="likes" style="padding-left: 50px">Liked by {{blog.likes}} users</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Blog",
    data(){
        return {
            blog: {},
            author: "",
            currUser: "",
            color: "black"
        }
    },
    mounted(){
        this.currUser = this.getCookie("username")

        var likedPosts = JSON.parse(window.localStorage.getItem("likedPosts"))

        if(likedPosts){
            if(likedPosts.includes(this.$route.params.id)){
                this.color = "red"
            }
        }


        fetch(`http://localhost:3000/api/blogs/${this.$route.params.id}` , {
            method: "GET",
            headers: {
                "Authorization": "Basic YWRtaW46YWRtaW4="
            }
        })
        .then(res => res.json())
        .then(data => {
            this.author = data.author

            this.blog = data
        })
    },
    methods: {
        editPost: function(){
            this.$router.push({ path: `/edit/${this.$route.params.id}`})
        },
        deletePost: function(){
            this.$router.push({ path: `/delete/${this.$route.params.id}`})
        },
        getCookie: function (name) {
            var match = document.cookie.match(
                new RegExp("(^| )" + name + "=([^;]+)")
            );
            if (match) return match[2];
        },
        likePost: function(){
            var likedPosts = window.localStorage.getItem("likedPosts")

            if(!likedPosts){
                likedPosts = []
            } else {
                likedPosts = Array.from(JSON.parse(likedPosts))
            }

            if(likedPosts.includes(this.$route.params.id)){
                const temp = []

                for(let likedPost of likedPosts){
                    if(likedPost != this.$route.params.id){
                        temp.push(likedPost)
                    }
                }

                likedPosts = temp

                fetch(`http://localhost:3000/api/blogs/${this.$route.params.id}` , {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic YWRtaW46YWRtaW4="
                    },
                    body: JSON.stringify({
                        id: this.$route.params.id,
                        likes: this.blog.likes - 1
                    })
                })

                this.color = "black"
            } else {
                likedPosts.push(this.$route.params.id)

                fetch(`http://localhost:3000/api/blogs/${this.$route.params.id}` , {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic YWRtaW46YWRtaW4="
                    },
                    body: JSON.stringify({
                        id: this.$route.params.id,
                        likes: this.blog.likes + 1
                    })
                })

                this.color = "red"
            }
            window.localStorage.setItem("likedPosts" , JSON.stringify(likedPosts))
        }
    }
}
</script>