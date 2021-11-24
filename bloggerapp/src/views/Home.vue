<template>

</template>

<script>
import authenticate from "../utils/authenticate";

export default {
    name: "Home",
    mounted() {
        const username = this.getCookie("username");
        const password = this.getCookie("password");
        
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
                    this.$router.push({ path: "/signin" })
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
    },
};
</script>
