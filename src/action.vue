<template>
    <div :class="colorSwitch" class="attack">
        {{msg}}
    </div>
</template>

<script>
    export default {
        name: "action",
        props:[
            "attack"
        ],
        data: function(){
            return{
                switch: true,
            }
        },
        computed:{
            msg: function(){
                let hit = this.attack;
                if (hit.split("/")[1] == "M"){
                    this.switch = false;
                    return "MONSTER HITS PLAYER FOR " + hit.split("/")[0];
                }
                else if (hit.split("/")[1] == "P"){
                    this.switch = true;
                    return "PLAYER HITS MONSTER FOR " + hit.split("/")[0];
                }
                else{
                    this.switch = true;
                    return "PLAYER HEALS FOR " + hit.split("/")[0];
                } 
            },
            colorSwitch: function(){
                return{
                    player: this.switch,
                    monster: !this.switch
                }
            }
        },
    }
</script>

<style>
    .attack{
        font-weight: "bold";
        text-align: "center";
        margin: "0";
    }
    .monster{
        background-color: #FFBFC0;
        color: #D6191A;
    }
    .player{
        color: #231FB6;
        background-color: #E4E6FF;
    }
    button:hover{
        background-image: linear-gradient(rgba(0,0,0,.1), rgba(0,0,0,.1));
    }
</style>