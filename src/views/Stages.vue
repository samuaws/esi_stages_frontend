<template>
<div class="everything">
    <div class="container">
        <div class="head-div">
             <!-- <img src="../assets/STAGE.png" alt="">  -->
        </div>
      <div v-if="!yes"  class="stage">

            <h2>Type :{{this.stage.Type}}</h2>
            <h4>description :{{this.stage.descrition}}</h4>
            <h5>date debut :{{this.stage.dateDeb}}</h5>
            <h5>date fin :{{this.stage.dateFin}}</h5>
            <h5>encadreur :{{this.stage.encadreur}}</h5>
            <h5>promoteur :{{this.stage.promoteur}}</h5>
            <h5>entreprise :{{this.stage.entreprise}}</h5>
          </div>
          <button @click="onClick()" class="btn-right">add</button>
          <div class="formd">
             <form v-if="yes" class ="form1" action="" @submit.prevent>
                <input  type="text" placeholder="Type" v-model="username">
                <input  type="text" placeholder="Description" v-model="password">
                <input  type="text" placeholder="Date de Debut" v-model="dateDeb">
                <input  type="text" placeholder="date de Fin" v-model="dateFin">
                <input  type="text" placeholder="encadreur" v-model="encadreur">
                <input  type="text" placeholder="promoteur" v-model="promoteur">
                <input  type="text" placeholder="entreprise" v-model="entreprise">
                <button v-on:click="handle_submit">submite</button> 
               </form>
            </div>
    </div>

</div>
</template>
<script>
export default {
    name:"Stages",
    data() {
    return {
       id :this.$route.params.id,
        stage : {},
        yes:false
    }
    },
    methods:{
      onClick(){
         this.yes=!this.yes
      }
       }
    }

</script>
<style scoped>

.head-div{
    background-image: url("../assets/importance-of-internship.jpg");
     width: 100%;
     height: 70%;
     position:absolute;
  top:0px;
  right:0px;

  left:0px;
    background-size: cover;
     background-position: center;
}
.stage {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.btn-right{
    right: 0%;
}
input{
color: #093545;
padding : 20px;
margin :   20px;
border-radius: 0.5em;
font-size: 1.1em;
border: solid #093545 2px ;
font-family: Lexend Deca;
font-style: normal;
background: #FFFFFF;
}
.imgH{

    position:fixed; 
    width: 100%; 
    height: 20%;

}
.formd{
    display: flex;
    flex-direction: column;
    max-width: 500px;
    align-content: center;
    margin: 0 auto;
   min-height: 300px;
}
</style>