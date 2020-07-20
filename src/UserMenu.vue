<template>
    <div>
        <div>
            <button 
                class="buttonStyle" 
                style="backgroundColor: rgb(242, 118, 107)" 
                @click="attack" 
            >
                ATTACK
            </button>
            <button 
                class="buttonStyle" 
                style="backgroundColor: rgb(219, 144, 58)" 
                @click="special" 
            >
                SPECIAL ATTACK
            </button>
            <button 
                class="buttonStyle" 
                style="backgroundColor: rgb(179, 252, 183)" 
                @click="heal" 
            >
                HEAL
            </button>
            <button 
                class="buttonStyle" 
                style="backgroundColor: rgb(255,255,255)"
                @click="quit"  
            >
                RESTART
            </button>
        </div>    
    </div>
</template>

<script>
    export default {
        name: "userMenu",
        methods:{
            attack: function(){
                this.$emit("attack");
            },
            heal: function(){
                this.$emit("heal");
            },
            special: function(){
                this.$emit("special");
            },
            quit: function(){
                this.$emit("quit");
            }
        }
    }

</script>

<style>
    .buttonStyle{
        padding: 7px;
        border: none;
        border-radius: 3px;
        box-shadow: 0 0 2px black;
        margin: 0.5rem;
    }
</style>