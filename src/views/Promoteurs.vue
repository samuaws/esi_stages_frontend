<template>
<div class="everything">
          <NavBar />
  <div class="head-div">
             <h1 class="title-big"> PROMOTEURS</h1>
  </div> 

       <button v-if="user.is_Admin && !yes" @click="onClick()" class="btn-right">New promoteur</button>
       
       <v-list class="formd2 bg rounded-lg"  v-if="!yes" two-line>
      <v-list-item-group
        v-model="selected"
        active-class="pink--text"
        multiple
      >
        <template   v-for="(prm, index) in this.promoteur" >
          <v-list-item class="item" @click="showPromoteur(prm._id)" :key="prm.description">
            <template >
              <v-list-item-content >
                <v-list-item-title class="white--text" v-text="showtext(prm.last_Name,prm.first_Name)"></v-list-item-title>
                       
                <v-list-item-subtitle
                  class="white--text"
                  v-text="prm.domaine"
                ></v-list-item-subtitle>

              
              </v-list-item-content>

            </template>
          </v-list-item>
         
  <v-row justify="center" :key="prm.description">
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
          Supprimer le promoteur ?
        </v-card-title>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="white "
            text
            class="buttonr"
            @click="reload"
          >
            cancel
          </v-btn>
          <v-btn
            color="white"
            text
            @click="handel_delete(prm._id)"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
          <v-divider
            v-if="index < promoteur.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
          
           <div class="formd">
             <form v-if="yes" class ="form1" action="" @submit.prevent>
               <input  type="text" placeholder="first_name" v-model="first_Name">
               <input  type="text" placeholder="last_Name" v-model="last_Name">
                <input  type="text" placeholder="email" v-model="email">
                <input  type="text" placeholder="domaine" v-model="domaine">
                <input  type="text" placeholder="discription" v-model="discription">
                <div class="bricolage">
                  <button class="bla red"  @click="onClick">cancel  </button> 
                    <button v-on:click="handle_submit">submit</button> 
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
    name:"Promoteurs",
    data() {
    return {
        id :0,
        promoteur : {},
        yes:false,

        first_Name : undefined,
        last_Name : undefined,
        email  : undefined,
        discription : undefined,
        domaine : undefined,
        user : undefined
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
         { 
           const h = await axios.get("/promoteur");
        this.promoteur = h.data
        console.log(this.promoteur);
        }else {
             const h = await axios.get("/promoteur/available");
             this.promoteur = h.data
        }
       
     
},
    props: ['selected'],
    methods:{
      onClick(){
         this.yes=!this.yes
      },
    handle_submit(){
        axios.post("/promoteur",{
        "first_Name" : this.first_Name,
        "last_Name" : this.last_Name,
        "email"  :this.email,
        "discription" : this.discription,
        "domaine" : this.domaine,
            },
            {
                 headers : {
            Authorization:'Bearer '+localStorage.getItem('token')
             }
            }).then((res)=>{

                if(res.status == 201)
                {
                    location.reload()
                }
            }).catch((e)=>{
                console.log(e);
            })
            console.log(this.dateDeb);
    },
    handel_delete(id){
      axios.delete("/promoteur/"+id,
      {
                 headers : {
            Authorization:'Bearer '+localStorage.getItem('token')
             }
    })
    location.reload();
    },
    reload(){
    location.reload();
    },

    showtext(x,y){
      return `${x} ${y}`
    },
    showPromoteur(id){
      this.$router.push("/promoteur/"+id)
    }


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
    width:35% ;
    align-content: center;
    margin: 0 auto;
    min-height: 300px;
}
.bricolage{
    display: flex;
    flex-direction: row;
    padding: auto;
    justify-content: space-evenly;

}


.item{
  padding: 20px;
}
.formd2{
    background:#224957;
    margin: auto;
    width: 80%;
    border-radius: 0.7em;  
}
.head-div{
  background-image: url("../assets/PROMOTEURS.jpg");
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
margin-top:3%;
color: #383838;
box-shadow: 7px 5px 5px red;
;
}

</style>