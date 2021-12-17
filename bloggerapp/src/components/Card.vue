<template>
<div class="max-w-md py-4 px-8 bg-white rounded-lg my-20 ml-10 mr-10" style="background-color: #3B4252; color: #D8DEE9">
    <div>
        <h2 class="text-3xl font-semibold">{{title}}</h2>
        <br>
        <p class="mt-2 leading-8">{{description}}</p>
    </div>
    <br>
</div>
</template>

<script>
export default {
    name: "Cards",
    props: {
        title: "",
        description: ""
    }
}
</script>