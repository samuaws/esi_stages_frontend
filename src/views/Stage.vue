<template>
<div class="everything">
        <div class="head-div">
            <NavBar />
              <h1 class="title-big"> {{this.stage.name}}</h1>
        </div>  

            <div class="info-big">
            <div class="wow">
                <div class="info">
                <div v-if="!yes"  class="stage">
              
                    <h4 class="textd" >Type :{{this.stage.Type}}</h4>
                    <h4 class="textd" >description: <br> {{this.stage.description}}</h4>
                    <h5 class="textd" >date debut :{{this.stage.dateDeb.substring(0,10)}}</h5>
                    <h5 class="textd" >date fin :{{this.stage.dateFin.substring(0,10)}}</h5>
                    <h5 class="textd"  v-if="this.user.is_Admin" >entreprise :{{this.stage.entreprise.name}}</h5>
                    <h5 class="textd" v-if="this.user.is_Admin" >annee :{{this.stage.annee}}</h5>
                    <h5 class="textd" v-if="!this.user.is_Admin" >entreprise :{{this.stage.entreprise.name}}</h5>
                    <h5 class="textd" v-if="this.user.is_Admin && this.stage.group">groupe:{{this.stage.group.name}}</h5>
                    <h5 class="textd" v-if="this.user.is_Admin ">Disponible :{{this.stage.Available}}</h5>
                    <h5 class="textd" >encadreur :{{this.stage.Encadreur.last_Name}}</h5>
                    <div class="bric">
                        <h5 class="textd" >promoteur :{{this.stage.promoteur.last_Name}}</h5>
                        <button class="bric-btn" v-if="this.user.is_Admin" @click=" onClick">update</button>    
                        <button class="bric-btn" v-if="!this.user.is_Admin && apply_btn" @click="onClickApply">Apply now</button>    
                    </div>
                </div>
                </div>
                <div class="formd" v-if="yes && !lyes">
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
                  
                <div class="form-div" v-if="lyes">
                    <form v-if="lyes" class ="form2" action="" @submit.prevent>
                                <input  type="text" placeholder="nom" v-model="nom">
                                <input  type="text" placeholder="matricule 1" v-model="matricule1">
                                <input v-if="!ouvrier" type="text" placeholder="matricule 2" v-model="matricule2">
                                <input v-if="!ouvrier" type="text" placeholder="matricule 3" v-model="matricule3"> 
                                <input  type="text" placeholder="drive" v-model="drive"> 
                                <div class="bricolage2">
                                <button class="bla"  @click="onClickApply">cancel  </button> 
                                    <button v-on:click=" handle_apply">submit</button>      
                                                    
                                </div>
                    </form>
                </div>  
              </div>   
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
    name:"Stage",
    
    data() {
    return {
        stage :{},
        id :this.$route.params.id,    
        yes:false,
        lyes:false,
        apply_btn:true,
        name : undefined,
        Type : undefined,
        description  : undefined,
        dateDeb : undefined,
        dateFin : undefined,
        Encadreur : undefined,
        promoteur : undefined,
        group : undefined,
        entreprise : undefined,
        Available : undefined,
        annee : undefined,
        matricule1: undefined,
        matricule2: undefined,
        matricule3: undefined,
        nom: undefined,
        technique: undefined,
        ouvrier: undefined,
        PFE: undefined,
        user : undefined,
        etudiants : [],
        drive : undefined
        }
    },
    methods:{
      onClick(){
         this.yes=!this.yes
      },
      onClickApply(){
          this.lyes=!this.lyes
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
    async handle_apply(){
        const grp = await axios.post("/group",{
            "name" : this.nom,
            "type" : this.stage.Type,
            "m1":this.matricule1,
            "m2":this.matricule2,
            "m3":this.matricule3,
            "m4":this.user.matricule,
            

        },{
                 headers : {
            Authorization:'Bearer '+localStorage.getItem('token')
             }
            }
        )
         console.log(this.user.matricule);
         console.log(grp.data._id);
        await axios.put("/stage/grp/"+this.id,{
            "grp_id" : grp.data._id,
            "drive" : this.drive,
        })

            this.lyes=!this.lyes
            this.yes=!this.yes 
            this.apply_btn = false 
     }
    },
  async created(){
    console.log(this.id);
    const h = await axios.get("/stage/"+this.id)
    this.stage = h.data
    switch (this.stage.Type){
     case 'PFE': this.PFE=true;
     break;
     case 'technique' : this.technique=true
     break;
     case 'ouvrier' : this.ouvrier=true
     break;
     }
   try{ const u = await axios.get("/users", {
                 headers : {
            Authorization:'Bearer '+localStorage.getItem('token')
             }
            });console.log(u); this.user = u.data ;  }catch(e){console.log(e);}
    
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
    margin: 2em;
    font-weight: 100;
    text-align: start;
    font-size: 2.5em;
}
h5{
    margin: 2em;
    font-weight: 100;
    text-align: start;
    font-size: 2em;
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
.stage{
    
  background: #224957;
  border-radius: 0.5em;
  padding:0%;
  margin-right:0%
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
    display: flex;
    flex-direction: column;
    padding: auto;

}
.bricolage2{
    display: flex;
    flex-direction: row;
    padding: auto;

}
.formd2{
  margin: auto;
  width: 50%;
  padding: 10px;

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
.bric{
    display: flex;
    justify-content: space-between;
    transform: translate( 0% ,-40%);
}
.bric-btn{
    max-height: 4em;
 
    margin: 0.5em;
    margin-right:5%;
    
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
.bla{
    margin: auto;
    background-color: red;
}
.title-big{
font-family: Lexend Deca;
font-size:5em ;
margin-left:30%;
color: #383838;
box-shadow: 7px 5px 5px red;
}
.form-div{
    background: #224957;
    border-radius: 1em;
    max-width: 56%;
    align-content: center;
    margin: 0 auto;
    min-height: 300px;
    
}
.form2{
    display: flex;
    flex-direction: column;
    padding-right:20%;
    padding-left:20%;
    padding-top:3%
}



</style>