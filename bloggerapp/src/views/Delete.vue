<template>
    
</template>

<script>
export default {
    name: "Delete",
    data(){
        return {
            id: ""
        }
    },
    mounted(){
        this.id = this.$route.params.id

        const ACCESS_TOKEN = process.env.ACCESS_TOKEN

        fetch(`https://amplicationbloggerapp.herokuapp.com/api/blogs/${this.id}` , {
            method: "GET",
            headers: {
                "Authorization": "Basic " + ACCESS_TOKEN
            }
        })
        .then(res => res.json())
        .then(data => {


            if(this.getCookie("username") != data.author){
                alert("You cannot delete this post becuase you are not the author!")

                this.$router.push({ path: `/blog/${this.id}` })
            }
        })

        fetch(`https://amplicationbloggerapp.herokuapp.com/api/blogs/${this.id}` , {
            method: "DELETE",
            headers: {
                "Authorization": "Basic " + ACCESS_TOKEN
            }
        })

        this.$router.push({ path: "/blogs" })

        
    },
    methods: {
        getCookie: function (name) {
            var match = document.cookie.match(
                new RegExp("(^| )" + name + "=([^;]+)")
            );
            if (match) return match[2];
        },
    }
}
</script>