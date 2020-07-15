
Vue.component('start',{
    props: [
        'msg'
    ],
    methods:{
        Start: function(){
            this.$emit("start");
        }
    },
    data: function(){
        return{
            style:{
                backgroundColor: "#AFF9B9",
                border: "none",
                padding: "7px",
                boxShadow: "0 0 2px black"
            },
            boxStyle:{
                boxShadow: "0 0 2px black",
                display: "grid",
                placeItems: "center center",
                padding: "1rem",
                borderRadius: "5px",
                boxSizing: "border-box"
            }
        }
    },
    template: 
    `
    <div :style="boxStyle">
        <button :style="style" @click="Start">{{msg}}</button>    
    </div>
    `
})

Vue.component('userMenu',{
    data: function(){
        return{
            buttonStyle:{
                padding: "7px",
                border: "none",
                borderRadius: "3px",
                boxShadow: "0 0 2px black",
                margin: "0 .5rem"
            },
            boxStyle:{
                boxShadow: "0 0 2px black",
                display: "grid",
                placeItems: "center center",
                padding: "1rem",
                borderRadius: "5px",
                boxSizing: "border-box"
            }
        }
    },
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
    },
    template:
    `
    <div :style="boxStyle">
        <div>
            <button 
                :style="buttonStyle" 
                style="backgroundColor: rgb(242, 118, 107)" 
                @click="attack" 
            >
                ATTACK
            </button>
            <button 
                :style="buttonStyle" 
                style="backgroundColor: rgb(219, 144, 58)" 
                @click="special" 
            >
                SPECIAL ATTACK
            </button>
            <button 
                :style="buttonStyle" 
                style="backgroundColor: rgb(179, 252, 183)" 
                @click="heal" 
            >
                HEAL
            </button>
            <button 
                :style="buttonStyle" 
                style="backgroundColor: rgb(255,255,255)"
                @click="quit"  
            >
                RESTART
            </button>
        </div>    
    </div>
    `
})

Vue.component('action',{
        props:[
            "attack"
        ],
        data: function(){
            return{
                switch: true,
                attackStyle: {
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: "0",
                }
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
        template:
        `
        <div :class="colorSwitch" :style="attackStyle">
        {{msg}}
        </div>
        `
})

new Vue({
    el: "#app",
    data:{
        condition: true,
        actionLog: [
        ],
        bar:{
            height: "30px",
            display: "grid",
            placeItems: "center center",
            backgroundColor: "#E7E7E7",
            position: "relative"
        },
        appStyle:{
            padding: "50px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "50px",
            boxSizing: "border-box"
        },
        remainingHealth:{
            height: "100%",
            backgroundColor: "#037D03",
            position: "absolute",
            top: "0",
            left: "0",
            transition: ".5s"
        },
        user:{
            width: "100%"
        },
        monster:{
            width: "100%"
        },
        boxStyle:{
            boxShadow: "0 0 2px black",
            display: "grid",
            placeItems: "center center",
            padding: "1rem",
            borderRadius: "5px",
            boxSizing: "border-box"
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
            let phrase = "";
            if (msg == "P") {phrase = "CONGRATS. YOU WON! \n"} 
            else if (msg == "M") {pharse = "OH NO. YOU LOST! \n"}
            let restart = confirm(phrase + "Would you like to play again?");
            if (restart == true){
                this.actionLog.length = 0;
                this.condition = true;
                this.user.width = "100%";
                this.monster.width = "100%";
            }
        }
    },
    template: 
    `
    <div style="max-width: 700px; margin: auto;">
        <div :style="appStyle">
            <div id="you">
                <h2 style="text-align: center;">You</h2>
                <div :style="bar" id="userBar">
                    <span style="z-index:999">{{this.user.width}}</span>
                    <div :style="[remainingHealth,user]" id="userRemaining"></div>
                </div>
            </div>
            
            <div id="monster">
                <h2 style="text-align: center;">Monster</h2>
                <div :style="bar" id="monsterBar">
                    <span style="z-index:999">{{this.monster.width}}</span>
                    <div :style="[remainingHealth,monster]" id="monsterRemaining"></div>
                </div>
            </div>
        </div>

        <start  v-if="condition==true" @start="startGame" msg="START NEW GAME"></start>
        <userMenu v-else @attack="playerAttack(1)" @special="playerAttack(10)" @heal="healAction" @quit="quit('M')"></userMenu>
        <ul v-show="actionLog.length > 0" :style="boxStyle">
            <p v-for="action in actionLog" style="margin: 5px; width: 100%">
                <action :attack="action"></action>
            </p>
        </ul>
    </div>
    `
})