<template>
<div class="everything">
    <NavBar class="bar" />
    <div class="context">
    <div class="az1">
       <h1 class="text white--text my-16">ESI Stage</h1>
       <h4 class="white--text my-16">finding your stage has never been ESIer</h4>
    </div>
  <v-row class="render">
    <v-col
      
      v-for="n in num"
      :key="n"
      class="d-flex child-flex"
      :cols=  "`${col}`"
    >
  
    <v-hover v-slot="{ hover }">
    <a :href="`${links[n-1]}`">
      <v-img
        :src="`${pictures[n-1]}`"
        aspect-ratio="1"
        class="grey lighten-2"
      >
       <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out turc darken-2 v-card--reveal text-h1 white--text justify-center align-center"
            style="height: 100%;"
          >
           {{titles[n-1]}}
          </div>
        </v-expand-transition>
      </v-img>
     </a>
    </v-hover>
    </v-col>
  </v-row>
    </div>
  <div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
  </div>
</template>

<script>
import axios from 'axios' 
import NavBar from '../components/NavBar.vue'
  export default {
    name: 'Home',
      components : {
       NavBar
                  },
    data(){
        return {

            titles : ["Stages","Promoteur","Demandes de stage","Statistique","Encadreur","Groupes","Entreprises","Etudiants"],
            links : ["stages","promoteurs","admin","statistique","encadreurs","group","entreprise","etudiants"],
            pictures : ["https://i.pinimg.com/564x/cb/7f/a3/cb7fa3e75e46f1284533615e7d191025.jpg","https://i.pinimg.com/564x/4c/79/f8/4c79f83adf150feb8236bb1b3b10eeb4.jpg","https://i.pinimg.com/564x/a1/ae/a3/a1aea3ac0f593a59839a3216d936037a.jpg","https://i.pinimg.com/564x/f3/8d/4b/f38d4b4a182782ff90868c2a8809f23d.jpg","https://i.pinimg.com/564x/55/65/6f/55656f08a0da30cd96e359e8a36fe303.jpg","https://i.pinimg.com/564x/05/86/9e/05869ea753f92ee8c68308dbc0d68448.jpg","https://i.pinimg.com/564x/f3/1e/d1/f31ed17e9a35749ecf0874da4ac22abd.jpg","https://i.pinimg.com/564x/fe/d4/21/fed4214c045df3155d6dc2f9e8baeff7.jpg"],
           // pictures : ["https://i.pinimg.com/564x/97/3f/18/973f18fb3d2756ef92b1cbc8d4ada795.jpg","https://i.pinimg.com/564x/05/9f/9e/059f9ea1d7c64c9397f0f60e03c18756.jpg","https://i.pinimg.com/564x/52/fc/f9/52fcf9b1d15ea32e7040309a7b422f73.jpg","https://i.pinimg.com/564x/aa/0c/30/aa0c3095ee8ac423ad70c8e26a0af2ea.jpg","https://i.pinimg.com/736x/0f/aa/7b/0faa7bbd49871f4c0ed2020bf15d9fe4.jpg","https://i.pinimg.com/564x/58/b1/51/58b151579f23b37439a2e402761162c2.jpg","https://i.pinimg.com/564x/73/7f/ed/737fed4342a910b9d3782315cab19ce9.jpg","https://i.pinimg.com/564x/c3/3b/f9/c33bf910822799b558b5e2e5b7d8c341.jpg"],
            col : 3,
            num :0
        }
    },
    methods : {
        btn(){
            console.log("hbjabc")
        }
    },
    async  created(){
      if(localStorage.getItem('token'))
      {
       
          this.user = await axios.get("users",{
            headers : {
                        Authorization:'Bearer '+localStorage.getItem('token')
        }
      })
      }
      else{
          this.$router.push("/login")
      }
       if(this.user){
      if(this.user.data.is_Admin){
          this.num = 8;
          this.col=3
      }else{
          this.num = 2;
          this.col=6
      }
      }
      console.log(this.col)
      }
}
</script>

<style scoped>
.everything{
     background: #093545;
     height:100%;
}

@import url('https://fonts.googleapis.com/css?family=Exo:400,700');

*{
    margin: 0px;
    padding: 0px;
}

body{
  
}

a{
    text-decoration: none;
}
.context {

    width: 100%;
    position: absolute;
     font-family: 'Lexend Deca', sans-serif;
    
}

.context h1{
    text-align: center;
    color: #fff;
    font-size: 199px;
    font-family:Lexend Deca;
}
.context h4{
    text-align: center;
    color: #fff;
    font-size: 80px;
    font-family:Lexend Deca;
}


.area{
    background: #093545;  

    width: 100%;
    height:100vh;
   
    
   
}
.az1{
padding:5%;

}
.circles{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 86%;
    overflow: hidden;
    margin-top: 5em;
}

.circles li{
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: animate 25s linear infinite;
    bottom: -150px;
    
}

.circles li:nth-child(1){
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
}


.circles li:nth-child(2){
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
}

.circles li:nth-child(3){
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
}

.circles li:nth-child(4){
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
}

.circles li:nth-child(5){
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
}

.circles li:nth-child(6){
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
}

.circles li:nth-child(7){
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
}

.circles li:nth-child(8){
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
}

.circles li:nth-child(9){
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
}

.circles li:nth-child(10){
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
}
.bar{
    z-index:3;
}





@keyframes animate {

    0%{
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
    }

    100%{
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
    }

}
</style>