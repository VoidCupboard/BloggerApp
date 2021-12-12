<template>
<div class="wrapper container">
    <h1 class="center-align">Blogs</h1>
    <button class="btn" style="width: 100%" v-on:click="redirect()">Create a new blog post</button>
    <br><br>
    <div class="row" v-for="blog in blogs" v-bind:key="blog">
        <div class="col s12 m6">
            <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                    <span class="card-title">{{blog.title}}</span>
                    <p>{{blog.description}}</p>
                </div>
                <div class="card-action">
                    <a :href="'/blog/' + blog.id">Read this blog</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Blogs",
    data() {
        return {
            blogs: []
        }
    },
    mounted() {
        fetch("http://localhost:3000/api/blogs", {
                method: "GET",
                headers: {
                    "Authorization": "Basic YWRtaW46YWRtaW4="
                }
            })
            .then(res => res.json())
            .then(data => this.blogs = data)
    },
    methods: {
        redirect: function(){
            this.$router.push({ path: "/blogs/create" })
        }
    }
}
</script>
