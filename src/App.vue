<template>
  <div style="max-width: 700px; margin: auto;">
        <div id="appStyle">
            <div id="you">
                <h2 style="text-align: center;">You</h2>
                <div class="bar" id="userBar">
                    <span style="z-index:999">{{this.user.width}}</span>
                    <div class="remainingHealth" :style="user" id="userRemaining"></div>
                </div>
            </div>
            <div id="monster">
                <h2 style="text-align: center;">Monster</h2>
                <div class="bar" id="monsterBar">
                    <span style="z-index:999">{{this.monster.width}}</span>
                    <div class="remainingHealth" :style="monster" id="monsterRemaining"></div>
                </div>
            </div>
        </div>

        <start v-if="condition==true" class="boxStyle" @start="startGame" msg="START NEW GAME"></start>
        <userMenu class="boxStyle" v-else @attack="playerAttack(1)" @special="playerAttack(10)" @heal="healAction" @quit="quit('M')"></userMenu>
        <ul v-show="actionLog.length > 0" class="boxStyle">
            <p v-for="(action,i) in actionLog" v-bind:key="i" style="margin: 5px; width: 100%">
                <action :attack="action"></action>
            </p>
        </ul>
    </div>
</template>

<script>
  import action from "./action"
  import userMenu from "./UserMenu"
  import start from "./Start"
  export default {
    name: 'app',
    components:{
      'start': start,
      'userMenu': userMenu,
      'action': action
    },
    data () {
      return {
        condition: true,
        actionLog: [
        ],
        user:{
            width: "100%"
        },
        monster:{
            width: "100%"
        }
      }
    },
    methods:{
        startGame: function(){
            this.condition = false;
        },
        playerAttack: function(num){
            let value = parseInt(Math.random()*10 + num);
            let health = parseInt(this.monster.width.split("%")[0]);
            if (health - value <= 0){
                health = 0;
                this.monster.width = health + "%";
                this.quit("P");
            }
            else{
                health -= value;
                this.monster.width = health + "%";
                this.actionLog.unshift(value + "/P");
                this.monsterAttack();
            }
        },
        monsterAttack: function(){
            let value = parseInt(Math.random()*15 + 1);
            let health = parseInt(this.user.width.split("%")[0]);
            if (health - value <= 0){
                health = 0;
                this.user.width = health + "%";
                this.quit("M");
            }
            else{
                health -= value;
                this.user.width = health + "%";
                this.actionLog.unshift(value + "/M");
            }  
        },
        healAction: function(){
            this.actionLog.unshift("10/H");
            this.monsterAttack();
            let health = parseInt(this.user.width.split("%")[0]);
            this.user.width = ((health + 10 <= 100)? health + 10 : 100) + "%";
        },
        quit: function(msg){
            var phrase = "";
            if (msg == "P") {phrase = "CONGRATS. YOU WON! \n"} 
            else if (msg == "M") {phrase = "OH NO. YOU LOST! \n"}
            let restart = confirm(phrase + "Would you like to play again?");
            if (restart == true){
                this.actionLog.length = 0;
                this.condition = true;
                this.user.width = "100%";
                this.monster.width = "100%";
            }
        }
    }
  }
</script>

<style lang="scss">
  .bar{
    height: 30px;
    display: grid;
    place-items: center center;
    background-color: #E7E7E7;
    position: relative;
  }
  .remainingHealth{
    height: 100%;
    background-color: #037D03;
    position: absolute;
    top: 0;
    left: 0;
    transition: .5s;
  }
  #appStyle{
    padding: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px;
    box-sizing: border-box;
  } 
  .boxStyle{
    box-shadow: 0 0 2px black;
    display: grid;
    place-items: center center;
    padding: 1rem;
    border-radius: 5px;
    box-sizing: border-box;
    }
</style>