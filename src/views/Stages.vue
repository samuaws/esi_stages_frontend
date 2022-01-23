<template>
<div class="everything">
        <div class="head-div">
             <h1>FIND YOUR STAGE YA LHABSINE TA3 L'ESI</h1>
        </div> 

       <button @click="onClick()" class="btn-right">add</button>
       
       <v-list class="formd2" v-if="!yes" two-line>
      <v-list-item-group
        v-model="selected"
        active-class="pink--text"
        multiple
      >
        <template   v-for="(stg, index) in this.stage" >
          <v-list-item :key="stg.description">
            <template v-slot:default="{ active }">
              <v-list-item-content >
                <v-list-item-title v-text="stg.name"></v-list-item-title>
                       
                <v-list-item-subtitle
                  class="text--primary"
                  v-text="showtext(stg.entreprise,stg.Type,stg.dateDeb.substring(0,10),stg.dateFin.substring(0,10))"
                ></v-list-item-subtitle>

              
              </v-list-item-content>

              
              

                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  mdi-star-outline
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-3"
                >
                  mdi-star
                </v-icon>
            
    
            </template>
          </v-list-item>
          <v-btn  @click="handel_delete(stg._id)"  :key="stg._id"> delete</v-btn>
          <v-divider
            v-if="index < stage.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
          
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
</template>
<script>
import axios from 'axios'
export default {
    name:"Stages",
    data() {
    return {
        id :0,
        stage : {},
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
    async created(){
        const h = await axios.get("/stage");
        this.stage = h.data
        console.log(this.stage);

     
},
    props: ['selected'],
    methods:{
      onClick(){
         this.yes=!this.yes
      },
    handle_submit(){
        axios.post("/stage",{
            "name" : this.name,
            "Type" : this.Type,
            "description" : this.description,
            "dateDeb" : this.dateDeb,
            "dateFin" : this.dateFin,
            "Encadreur" : this.Encadreur,
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
                    this.$router.push("/")
                }
            }).catch((e)=>{
                console.log(e);
            })
            console.log(this.dateDeb);
    },
    handel_delete(id){
      axios.delete("/stage/"+id,
      {
                 headers : {
            Authorization:'Bearer '+localStorage.getItem('token')
             }
    })
    location.reload();
    },
   async  show(x){
    
    var  h = await axios.get("/entreprise/"+x)
     x=h.data.name 
     return await x
     
     
    },
    showtext(x,y,z,k){
      x = x.name 
      return `${x} . ${y} .${z} / ${k}`
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


</style>