<template>
<div class="wrapper">
    <br><br><br><br><br><br><br><br>
    <div class="text-center text-5xl header" style="line-height: 70px">Welcome to Blogger App</div>
    <br><br>
    <h5 class="text-center text-xl">Read all the blog posts <a href="/blogs">here</a></h5>
</div>
</template>

<style scoped>

.wrapper {
    color: #D8DEE9;
    word-spacing: 5px;
    letter-spacing: 3px;
    font-family: "Comfortaa";
}

a {
    color: #88C0D0
}

.header {
    color: #88C0D0
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>

<script>
export default {
    name: "Home",
    mounted() {
        const username = this.getCookie("username");
        const password = this.getCookie("password");
        const ACCESS_TOKEN = process.env.ACCESS_TOKEN


        fetch("https://amplicationbloggerapp.herokuapp.com/api/login", {
                headers: {
                    "Authorization": "Basic " + ACCESS_TOKEN,
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
    },
    methods: {
        getCookie: function (name) {
            var match = document.cookie.match(
                new RegExp("(^| )" + name + "=([^;]+)")
            );
            if (match) return match[2];
        },
        logout: function () {
            document.cookie = "username=;password=;"

            window.location.reload()
        }
    },
};
</script>
