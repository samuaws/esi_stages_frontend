<template>
    <div class="everything">
        <div class="container">
            <h1 class="text " >Sign up </h1>
            <h3 class="text ">veuillez vous inscrire! </h3>
            <form class ="form-div" action="" @submit.prevent>
                
                <input  type="text" placeholder="Username" v-model="username">
                <input  type="text" placeholder="firstname" v-model="first_Name">
                <input  type="text" placeholder="lastname" v-model="last_Name">
                <input  type="text" placeholder="email" v-model="email">
                <input  type="password" placeholder="Password" v-model="password">
                <button v-on:click="handle_signup">Signup</button> 

            </form>
        </div>
        <div class="image" >
        
            <img class="wave1" src="../assets/wave.svg" alt="">
            <img class="wave2" src="../assets/wave2.svg" alt="">
            
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
name : "Signup",
data() {
    return {
        username : undefined,
        password : undefined,
        first_Name : undefined,
        last_Name : undefined,
        email : undefined,
        }

},
methods : {
    handle_signup(){
        console.log("requsting the backend to login")
        axios.post("/signup",{
            "username" : this.username,
            "password" : this.password,
            "email" : this.email,
            "last_Name" : this.last_Name,
            "first_Name" : this.first_Name,
            }).then((res)=>{
                if(res.status == 201)
                {
                    this.$router.push("/")
                }
            }).catch((e)=>{
                console.log(e);
            })
    },
},

}
</script>

<style scoped>
.text {
  font-family: Lexend Deca;
  font-style: normal;
  color: #FFFFFF;
}
h1 {
   font-weight: 700; 
   margin-bottom: 0.5em;
   font-size: 4em;
}
h3{
    margin: 0.6em;
    font-weight: 100;
}

input{
background: #224957;
padding : 20px;
margin :   20px;
border-radius: 0.5em;
font-size: 1.1em;
font-family: Lexend Deca;
font-style: normal;
color: #FFFFFF;
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
.container{
  display: absolute;
  
  max-width: 500px;
  margin: 0 auto;
  min-height: 300px;
  padding: 30px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
    
}
.form-div{
    display: flex;
    flex-direction: column;
    
}
.wave1{
 width: 100%;

}
.wave2{
transform: translate(0,-105%);
width: 100%;
 
}
.image {
    position:fixed; 
    bottom:55px; 
    width: 100%; 
    height: 11%;
}
.everything{
   background: #093545;
  position:absolute;
  top:0px;
  right:0px;
  bottom:0px;
  left:0px;
}


</style>