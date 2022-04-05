<template>
  <div class="container3" >
      <NavBar/>
    <div class="div-left" >
        <h1 class="name"> Pr. {{this.promoteur.last_Name}} <br> {{this.promoteur.first_Name}}</h1>
        <ul class="ull" v-if="!yes">
            <li class="att">{{this.promoteur.discription}}</li>
            <li class="att">domaine : {{this.promoteur.domaine}}</li>
            <li class="att">email : {{this.promoteur.email}}</li>
           <button  v-if="this.user.is_Admin" @click="onClick">update</button>  
        </ul>
           <div class="formd">
             <form v-if="yes" class ="form1" action="" @submit.prevent>
               <input  type="text" placeholder="first_name" v-model="first_Name">
               <input  type="text" placeholder="last_Name" v-model="last_Name">
                <input  type="text" placeholder="email" v-model="email">
                <input  type="text" placeholder="domaine" v-model="domaine">
                <input  type="text" placeholder="discription" v-model="discription">
                <div class="bricolage">
                    <button v-on:click="handle_submit">submit</button> 
                  <button  v-if="this.user.is_Admin" @click="onClick">{{this.update}}</button>   
                </div>
             </form>
        </div>
    </div>
     <div class="div-right">
        <img class="big" src="../assets/36541247_1750617655045181_5665836890272563200_n.jpg" alt="">
      
        
      </div>
 </div>
</template>

<script>
import axios from 'axios'
import NavBar from '../components/NavBar.vue'
  export default {
name : "Promoteur",
 components : {
       NavBar
                  },
data(){
   return {
        id :this.$route.params.id,
        promoteur : {},
        user : undefined,
        yes : false,
        update : "update",
        first_Name : undefined,
        last_Name : undefined,
        email  : undefined,
        discription : undefined,
        domaine : undefined
        
    
    }
},
methods : {
    onClick(){
         this.yes=!this.yes
         if(this.update == "update")
         {
             this.update = "cancel"
         }
         else 
         {
             this.update = "update"
         }
      },
handle_submit(){
         this.yes=!this.yes
        axios.put("/promoteur/"+this.id,{
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
                     location.reload();
                }
            }).catch((e)=>{
                console.log(e);
            })
            console.log(this.discription);
    },
},
async created(){
    const h = await axios.get("/promoteur/"+this.id)
    this.promoteur = h.data;
    try{ const u = await axios.get("/users", {
                 headers : {
            Authorization:'Bearer '+localStorage.getItem('token')
             }
            });console.log(u); this.user = u.data ;  }catch(e){console.log(e);}
}
}
</script>

<style scoped>
.name{
  margin-top:8%;
  margin-bottom: 15%;
 font-family: Lexend Deca;
font-style: normal;
  color: #FFFFFF;
  font-size: 48px;
line-height: 72px;
letter-spacing: 0.54em;
}
input{
    display: flex;
    
background: #093545;
padding : 20px 50px;
margin : 0px 20px 20px  20px;
border-radius: 0.5em;
font-size: 1.1em;
font-family: Lexend Deca;
font-style: normal;
color: #FFFFFF;
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
button{
background: #224957;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
border-radius: 0.5em;
border: none;
padding: 30px 40px;
margin: 1.2em auto;
margin-right:1em;
font-size: 1.2em;
font-weight: 500;
font-family: Lexend Deca;
font-style: normal;
color: #FFFFFF;

/* make it go to bottom */
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
.formd{
    display: flex;
    flex-direction: row;
    border-radius: 1em;
    width: 100%;
    justify-content: space-between;
    align-content: center;
   height: 100%;
}
.bricolage{
    margin-top:30%;
    transform: translate(175%,-300%);
}


</style>