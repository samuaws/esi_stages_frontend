<template>
    <div class="everything">

        <div id="nav">
             <!-- <router-link to="/">Home</router-link> |
             <router-link to="/login">login</router-link> -->
   
        </div>
        <div class="container">
            <h1 class="text " >Log in </h1>
            <h3 class="text ">veuillez vous connecter a votre compte </h3>
            <h3 v-if="error" class="text error2 ">wrong username or password</h3>
            <form class ="form-div" action="" @submit.prevent>
                
                <input  type="text" placeholder="Username" v-model="username">
                <input  type="password" placeholder="Password" v-model="password">
                <br>
                <button v-on:click="handle_login">Login</button> 

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
name : "Login",
data() {
    return {
        username : undefined,
        password : undefined,
        error : false
        }

},
methods : {
    handle_login(){
      
        axios.post("/login",{
            "username" : this.username,
            "password" : this.password
            }).then((res)=>{
                if(res.status == 201)
                {
                    console.log(res);
                    this.$router.push("/")
                    localStorage.setItem('token',res.data.token)

                }
            }).catch(()=>{
                this.error = true;
                console.log(this.error);
            })
    },
},

}
</script>

<style scoped>
    body{
       
        background-repeat: no-repeat;
        
    }
.text {
   
  font-family: Lexend Deca;
  font-style: normal;
  color: #FFFFFF;
}
.error2{
    color: red;
}
h1 {
   font-weight: 700; 
   margin: 0.5em;
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
  margin: auto auto;
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