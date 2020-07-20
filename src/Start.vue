<template>
    <div>
        <button class="style" @click="Start">{{msg}}</button>    
    </div>
</template>

<script>
    export default{
        name: "start",
        props: [
            'msg'
        ],
        methods:{
            Start: function(){
                this.$emit("start");
            }
        }
    }
</script>

<style>
    .style{
        background-color: #AFF9B9;
        border: none;
        padding: 7px;
        box-shadow: 0 0 2px black;
    }
</style>