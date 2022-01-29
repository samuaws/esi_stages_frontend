<template>
<div class="everything">
       <NavBar />
  <div class="head-div">
             <h1 class="title-big"> STAGES</h1>
  </div>  
       <button v-if="user.is_Admin && !yes" @click="onClick()" class="btn-right">New stage</button> 
       
       <v-list class="formd2  " v-if="!yes" two-line>
      <v-list-item-group
        
        v-model="selected"
        active-class="pink--text "
        multiple
      >
        <template   v-for="(stg, index) in this.stage" >
          <v-list-item class="item " @click="showStage(stg._id)" :key="stg.description" >
            <template >
              <v-list-item-content >
                <v-list-item-title class="white--text" v-text="stg.name"></v-list-item-title>
                       
                <v-list-item-subtitle
                  class=" white--text"
                  v-text="showtext(stg.entreprise,stg.Type,stg.dateDeb,stg.dateFin)"
                ></v-list-item-subtitle>

              
              </v-list-item-content>

            </template>
          </v-list-item>
          
         <v-row justify="center" :key="stg.description">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red"
          dark
          v-bind="attrs"
          v-on="on"
          v-if="user.is_Admin"
          @click="card = true"
        >
          Delete
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h6" >
          Supprimer le stage ?
        </v-card-title>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="white "
            text
            class="buttonr "
            @click="reload"
          >
            cancel
          </v-btn>
          <v-btn
            color="white"
            text
            @click="handel_delete(stg._id)"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
          <v-divider
            v-if="index < stage.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
          
           <div class="formd mt-10 " v-if="yes && !lyes">
                    <form v-if="yes" class ="form1" action="" @submit.prevent>
                        <div class="form-left">
                                <input  type="text" placeholder="name" v-model="name">
                                <input  type="text" placeholder="type" v-model="Type">
                                <input  type="text" placeholder="description" v-model="description">
                                <input  type="date" placeholder="Date de Debut" v-model="dateDeb">
                                <input  type="date" placeholder="date de Fin" v-model="dateFin">
                                <button class="bla" v-if="this.user.is_Admin" @click="onClick">cancel  </button> 
                        </div>
                        <div class="form-right">
                             <input  type="text" placeholder="encadreur" v-model="Encadreur">
                            <input  type="text" placeholder="groupe" v-model="group">
                            <input  type="text" placeholder="promoteur" v-model="promoteur">
                            <input  type="text" placeholder="entreprise" v-model="entreprise">
                            <input  type="text" placeholder="annee" v-model="annee"> 
                            <div class="bricolage">
                                    <button v-on:click=" handle_submit">submit</button>                         
                                </div>
                        </div>
                        </form>
                  </div>    
           
      

</div>
</template>
<script>
import axios from 'axios'
 import NavBar from '../components/NavBar.vue'
  export default {
     
      components : {
       NavBar
                  },
  
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
        annee : undefined,
        user : undefined,
        card : false,
    }
    },
    async created(){
       const u = await axios.get("/users", {
                 headers : {
            Authorization:'Bearer '+localStorage.getItem('token')
             }
            });
            console.log(u); 
            this.user = u.data ;
            console.log(this.user.is_Admin);
       if(this.user.is_Admin)
      { const h = await axios.get("/stage");
        this.stage = h.data
        console.log(this.stage);}
        else{  
          const h = await axios.get("/stage/available");
        this.stage = h.data
        console.log(this.stage);
        }
       
     
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
      if (z && k)
      {
        z = z.substring(0,10)
        k = k.substring(0,10)
      }
      return `${x} . ${y} .${z} / ${k}`
    },
    showStage(id){
      this.$router.push("/stage/"+id)
    },
    reload(){
    location.reload();
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
   color: #FFFFFF;
}
h3{
    margin: 0.6em;
    font-weight: 100;
    color: #FFFFFF;
}


.stage {
  padding: 10px 20px;
  color: #FFFFFF;
}

button{
background: #20DF7F;
 margin: auto;
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

.buttonr{
background: red;
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
background: #093545;
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
    background: #224957;
    display: flex;
    flex-direction: column;
    border-radius: 1em;
    max-width: 65%;
    align-content: center;
    margin: 0 auto;
    min-height: 300px;
}  

.bricolage{
    margin: auto;
    display: flex;
    flex-direction: column;
    padding: auto;

}
.formd2{
  margin: auto;
  width: 80%;
  background:#224957;
  border-radius: 0.7em;
  color: #FFFFFF;
}
.item{
  padding: 20px;
  
}
.head-div{
  background-image: url("../assets/kevin-bhagat-zNRITe8NPqY-unsplash.jpg");
  z-index: -1;
  padding-top:13%;
  padding-left: 25%;
  width: 100%;
  height: 650px;
  top:0px;
  right:0px;
  left:0px;
  background-size: cover;
  background-position: center;
}
.title-big{
font-family: Lexend Deca;
font-size:5em ;
margin-left:30%;
color: #383838;
box-shadow: 7px 5px 5px red;
}
.form1{
    display: flex;
    flex-direction: row;
}
.form-left{
    display: flex;
    flex-direction: column;
    width: 50%;
}

.form-right{
    display: flex;
    flex-direction: column;
    width: 50%;
}
.info{
    background:#093545;
    display: flex;
    left:0;
    margin-top: 5%;
    margin-right: 10%;
    margin-left: 10%;
    flex-direction: column;
    border-radius: 3%;
    
}
.bla{
    margin: auto;
    background-color: red;
}
.formd{
    background: #224957;
    display: flex;
    flex-direction: column;
    border-radius: 1em;
    max-width: 65%;
    align-content: center;
    margin: 0 auto;
    min-height: 300px;
}
</style>