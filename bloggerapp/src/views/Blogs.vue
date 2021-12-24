<template>
<div class="_container">
    <br><br><br>
    <h1 class="text-center text-5xl">Blogs</h1>
    <br><br>
    <button class="circle" style="width: 100%" v-on:click="redirect()"><i class="fad fa-plus"></i></button>
    <br><br>
    <div class="wrapper flex flex-wrap">
        <div class="cards" v-for="blog in blogs" v-bind:key="blog">
            <a :href="'/blog/' + blog.id">
                <div class="max-w-md py-4 px-8 rounded-lg my-20 ml-10 mr-10" style="background-color: #3B4252; color: #D8DEE9; padding-top: 30px">
                    <div style="width: 500px">
                        <h2 class="text-3xl font-semibold">{{blog.title}}</h2>
                        <br>
                        <p class="mt-2 leading-8">{{blog.description}}</p>
                    </div>
                    <br>
                    <div class="flex justify-end mt-4">
                        <a href="#" class="text-xl font-medium author">{{blog.author}}</a>
                    </div>
                </div>
            </a>
            
        </div>
    </div>
</div>
</template>

<script>
import Card from "../components/Card.vue"

export default {
    name: "Blogs",
    data() {
        return {
            blogs: []
        }
    },
    mounted() {
        const ACCESS_TOKEN = process.env.ACCESS_TOKEN

        fetch("https://amplicationbloggerapp.herokuapp.com/api/blogs", {
                method: "GET",
                headers: {
                    "Authorization": "Basic " + ACCESS_TOKEN
                }
            })
            .then(res => res.json())
            .then(data => {
                this.blogs = data

                console.log(data)
            })

    },
    methods: {
        redirect: function () {
            this.$router.push({
                path: "/blogs/create"
            })
        }
    },
    components: {
        Card
    }
}
</script>

<style scoped>
._container {
    color: #D8DEE9;
    font-family: "Comfortaa";
}

.circle {
    width: 70px !important;
    height: 70px;
    color: #88C0D0;
    border-radius: 50%;
    left: calc(100% - 100px);
    top: calc(100% - 100px);
    font-size: 30px;
    position: fixed;
    background-color: #3B4252;
}



</style>
