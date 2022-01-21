<template>
<div class="everything">
        <div class="head-div">
            <!-- <img src="../assets/importance-of-internship.jpg" alt="">  -->
             <h1>FIND YOUR STAGE YA LHABSINE TA3 L'ESI</h1>
        </div> 
      
        <div v-if="!yes"  class="stage">

            <h2>Type :{{this.stage.Type}}</h2>
            <h4>description :{{this.stage.description}}</h4>
            <h5>date debut :{{this.stage.dateDeb}}</h5>
            <h5>date fin :{{this.stage.dateFin}}</h5>
            <h5>encadreur :{{this.stage.Encadreur}}</h5>
            <h5>promoteur :{{this.stage.promoteur}}</h5>
        </div>
          <button @click="onClick()" class="btn-right">add</button>
           <div class="formd">
             <form v-if="yes" class ="form1" action="" @submit.prevent>
                <input  type="text" placeholder="Type" v-model="Type">
                <textarea  type="text" placeholder="Description" v-model="description">
                <input  type="text" placeholder="Date de Debut" v-model="dateDeb">
                <input  type="text" placeholder="date de Fin" v-model="dateFin">
                <input  type="text" placeholder="encadreur" v-model="Encadreur">
                <input  type="text" placeholder="promoteur" v-model="promoteur">
                <div class="bricolage">
                    <button v-on:click="handle_submit">submite</button> 
                </div>
               </form>
            </div>
      

</div>
</template>
<script>
import axios from 'axios'
export default {
    name:"Stages",
    data() {
    return {
        id :this.$route.params.id,
        stage : {},
        yes:false,
        Type : undefined,
        description  : undefined,
        dateDeb : undefined,
        dateFin : undefined,
        Encadreur : undefined,
        promoteur : undefined
    }
    },
    async created(){
        console.log("sjjsvsbjvbsshbvsbvhsbvhsbvjh");
        const h = await axios.get("/stage/"+this.id);
        this.stage = h.data
        console.log(this.stage);
},
    methods:{
      onClick(){
         this.yes=!this.yes
      },
    handle_submit(){
        console.log("requsting the backend to login")
        axios.post("/",{
            "Type" : this.Type,
            "description" : this.description,
            "dateDeb" : this.dateDeb,
            "dateFin" : this.dateFin,
            "Encadreur" : this.Encadreur,
            "promoteur" : this.promoteur,
            }).then((res)=>{
                if(res.status == 201)
                {
                    this.$router.push("/")
                }
            }).catch((e)=>{
                console.log(e);
            })
    },
}
}
</script>
<style scoped>
.everything{
  background: #093545;
}
.text{
  font-family: Lexend Deca;
  font-style: normal;
  color: #FFFFFF;
}
h2 {
   font-weight: 700; 
   margin: 0.5em;
   font-size: 4em;
}
h3{
    margin: 0.6em;
    font-weight: 100;
}
.head-div{
  background-image: url("../assets/importance-of-internship.jpg");
  z-index: -1;
  width: 100%;
  height: 650px;
  top:0px;
  right:0px;
  left:0px;
  background-size: cover;
  background-position: center;
}

.stage {
  padding: 10px 20px;
}

button{
background: #20DF7F;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
border-radius: 0.5em;
border: none;
padding: 20px 20px;
margin: 1.2em;
font-size: 1em;
font-weight: 500;
font-family: Lexend Deca;
font-style: normal;
color: #FFFFFF;
}
input{
background: #224957;
padding : 20px 50px;
margin :   20px;
border-radius: 0.5em;
font-size: 1.1em;
font-family: Lexend Deca;
font-style: normal;
color: #FFFFFF;
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
.bricolage{
    display: flex;
    flex-direction: column;
    padding: auto;

}


</style>