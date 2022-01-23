<template>
  <div class="container3" >
    <div class="div-left">
        <h1 class="name"> Pr. {{this.promoteur.last_Name}} <br> {{this.promoteur.first_Name}}</h1>
        <ul>
            <li class="att">email : {{this.promoteur.email}}</li>
            <li class="att">domaine : {{this.promoteur.domaine}}</li>
        </ul>
        <h3 class="att"  >{{this.promoteur.discription}}</h3>
    </div>
    <div class="div-right">
        <img class="big" src="../assets/36541247_1750617655045181_5665836890272563200_n.jpg" alt="">
    </div>
      
 </div>
</template>

<script>
import axios from 'axios'
export default {
name : "Promoteur",
data(){
   return {
        id :this.$route.params.id,
        promoteur : {}
    }
},
async created(){
    const h = await axios.get("/promoteur/"+this.id)
    this.promoteur = h.data
}
}
</script>

<style scope>
.name{
  margin-top:5%;
  margin-bottom:25% ;
 font-family: Lexend Deca;
font-style: normal;
  color: #FFFFFF;
  font-size: 48px;
line-height: 72px;
letter-spacing: 0.54em;
}

.att{
    margin-bottom: 5%;
    font-family: Lexend Deca;
    font-style: normal;
    font-style: normal;
    color:  #093545;
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;

}

.container3{
    background-color : white; 
    background-image : url("../assets/full name.svg") ;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;
    width: 100%;
    position:absolute;
    top:0px;
    right:0px;
    bottom:0px;
    left:0px;
}
.div-left{   
    left: 0;
    width: 50%;
    

}
.div-right{
    margin-top: 15%;
    width: 50%;
    
}
.big{
    width: 25em;
}

</style>