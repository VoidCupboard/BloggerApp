<template>
    <div class="_container">
        <br><br><br>
        <div class="text-center text-4xl">{{blog.title}}</div>  
        <br><br><br>
        <div class="content">
            <div class="utils flex flex-wrap" v-if="author == currUser">
                <button class="px-3 py-3 relative rounded text-sm border-0 shadow outline-none w-full" style="width: 100%" v-on:click="editPost()">Edit this post</button>
                <button class="px-3 py-3 relative rounded text-sm border-0 shadow outline-none w-full" style="width: 100%" v-on:click="deletePost()">Delete this post</button>
            </div>     
            <br><br>
            <span class="description text-xl text-center">{{blog.description}}</span>
            <br>
        </div>
        <div class="like" style="display: flex">
            <i class="fas fa-heart heart" :style="'color: ' + color" v-on:click="likePost()"></i>
            <span class="heart-count" >{{blog.likes}}</span>
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
            color: "#D8DEE9"
        }
    },
    mounted(){
        this.currUser = this.getCookie("username")

        const ACCESS_TOKEN = process.env.ACCESS_TOKEN

        var likedPosts = JSON.parse(window.localStorage.getItem("likedPosts"))

        if(likedPosts){
            if(likedPosts.includes(this.$route.params.id)){
                this.color = "#BF616A"
            }
        }


        fetch(`https://amplicationbloggerapp.herokuapp.com/api/blogs/${this.$route.params.id}` , {
            method: "GET",
            headers: {
                "Authorization": "Basic " + ACCESS_TOKEN
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

                fetch(`https://amplicationbloggerapp.herokuapp.com/api/blogs/${this.$route.params.id}` , {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + ACCESS_TOKEN
                    },
                    body: JSON.stringify({
                        id: this.$route.params.id,
                        likes: this.blog.likes - 1
                    })
                })

                this.color = "#D8DEE9"
            } else {
                likedPosts.push(this.$route.params.id)

                fetch(`https://amplicationbloggerapp.herokuapp.com/api/blogs/${this.$route.params.id}` , {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + ACCESS_TOKEN
                    },
                    body: JSON.stringify({
                        id: this.$route.params.id,
                        likes: this.blog.likes + 1
                    })
                })

                this.color = "#BF616A"
            }
            window.localStorage.setItem("likedPosts" , JSON.stringify(likedPosts))
        }
    }
}
</script>

<style scoped>
._container{
    color: #D8DEE9;
    font-family: "Comfortaa";
}

.heart{
    color: #BF616A;
    font-size: 50px;
    padding-left: 70px;
    padding-top: 280px;
}

.heart-count{
    position: relative;
    left: -35px;
    font-size: 30px;
    padding-top: 350px;
}

.like{
    position: fixed;
    height: 100%;
    top: 0%;
}

.content{
    margin-left: 200px;    
}

button{
    background-color: #3B4252;
    width: 45% !important;
    margin-right: 5%;
}
</style>