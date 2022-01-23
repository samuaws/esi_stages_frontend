<template>
<div class="everything">
        <div class="head-div">
             <h1>FIND YOUR STAGE YA LHABSINE TA3 L'ESI</h1>
        </div>  

            <div class="info-big">
                <div class="info">
                <div v-if="!yes"  class="stage">
                    <h2 class="textd" >{{this.stage.name}}</h2>
                    <h4 class="textd" >Type :{{this.stage.Type}}</h4>
                    <h4 class="textd" >description :{{this.stage.description}}</h4>
                    <h5 class="textd" >date debut :{{this.stage.dateDeb.substring(0,10)}}</h5>
                    <h5 class="textd" >date fin :{{this.stage.dateFin.substring(0,10)}}</h5>
                    <h5 class="textd" >encadreur :{{this.stage.Encadreur.last_Name}}</h5>
                    <h5 class="textd" >promoteur :{{this.stage.promoteur.last_Name}}</h5>
                    <h5 class="textd" >entreprise :{{this.stage.entreprise.name}}</h5>
                </div>
                <button @click="onClick">update</button>      
                <div class="formd">
                    <form v-if="yes" class ="form1" action="" @submit.prevent>
                    <input  type="text" placeholder="name" v-model="name">
                    <input  type="text" placeholder="type" v-model="Type">
                        <input  type="text" placeholder="description" v-model="description">
                        <input  type="date" placeholder="Date de Debut" v-model="dateDeb">
                        <input  type="date" placeholder="date de Fin" v-model="dateFin">
                        <input  type="text" placeholder="encadreur" v-model="Encadreur">
                        <input  type="text" placeholder="groupe" v-model="group">
                        <input  type="text" placeholder="promoteur" v-model="promoteur">
                        <input  type="text" placeholder="entreprise" v-model="entreprise">
                        <input  type="text" placeholder="annee" v-model="annee"> 
                        <div class="bricolage">
                            <button v-on:click="handle_submit">submit</button> 
                        </div>
                    </form>
                </div>
                </div> 
            </div> 

   
           
      

</div>
</template>
<script>
import axios from 'axios'
export default {
    name:"Stage",
    data() {
    return {
         stage :{},
         id :this.$route.params.id,    
         yes:false,
          name : undefined,
        Type : undefined,
        description  : undefined,
        dateDeb : undefined,
        dateFin : undefined,
        Encadreur : undefined,
        promoteur : undefined,
        group : undefined,
        entreprise : undefined,
        annee : undefined
        }
    },
    methods:{
      onClick(){
         this.yes=!this.yes
      },
     
    handle_submit(){
        console.log(this.Encadreur);
         this.yes=!this.yes
        axios.put("/stage/"+this.id,{
            "name" : this.name,
            "Type" : this.Type,
            "description" : this.description,
            "dateDeb" : this.dateDeb,
            "dateFin" : this.dateFin,
            "encadreur" : this.Encadreur,
            "promoteur" : this.promoteur,
            "group" : this.group,
            "entreprise" : this.entreprise,
            "annee" : this.annee,
            },
            {
                 headers : {
            Authorization:'Bearer '+localStorage.getItem('token')
             }
            }).then((res)=>{

                if(res.status == 201)
                {
                     location.reload();
                }
            }).catch((e)=>{
                console.log(e);
            })
            console.log(this.dateDeb);
    },
   

 },
  async created(){
    console.log(this.id);
    const h = await axios.get("/stage/"+this.id)
    this.stage = h.data
   try{ const u = await axios.get("/users", {
                 headers : {
            Authorization:'Bearer '+localStorage.getItem('token')
             }
            });console.log(u);  }catch(e){console.log(e);}
    
    },
}


</script>
<style scoped>
.everything{
  background: #093545;
}
.textd{
  font-family: Lexend Deca;
  font-style: normal;
  color: #FFFFFF;
}
h2 {
   font-weight: 700; 
  
   font-size: 4em;
}
h4{
    margin: 0.6em;
    font-weight: 100;
}
h5{
    margin: 0.6em;
    font-weight: 100;
}
.head-div{
  background-image: url("../assets/kevin-bhagat-zNRITe8NPqY-unsplash.jpg");
  z-index: -1;
  width: 100%;
  height: 650px;
  top:0px;
  right:0px;
  left:0px;
  background-size: cover;
  background-position: center;
}


button{
background: #20DF7F;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
border-radius: 0.5em;
border: none;
padding: 20px 20px;
margin: 1.2em auto;
font-size: 1em;
font-weight: 500;
font-family: Lexend Deca;
font-style: normal;
color: #FFFFFF;
width: 20%;
/* make it go to bottom */
}
input{
background: #093545;
padding : 20px 50px;
margin :   20px;
border-radius: 0.5em;
font-size: 1.1em;
font-family: Lexend Deca;
font-style: normal;
color: #FFFFFF;
}
.formd{
    display: flex;
    flex-direction: column;
    border-radius: 1em;
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
.formd2{
  margin: auto;
  width: 50%;
  padding: 10px;

}
.info-big{

}
.stage{
    left : 0px
}
.info{
    display: flex;
    left:0;
    margin-top: 5%;
    margin-right: 10%;
    margin-left: 10%;
    flex-direction: column;
    border-radius: 3%;
    background:#224957
}


</style>