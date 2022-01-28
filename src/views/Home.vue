<template>
  <div class="everything">
    <NavBar />
    <img alt="Vue logo" src="../assets/logo.png">
    
    <h3 v-if="show" class="yess" >Welcome {{ this.user.data.first_Name }}</h3>
    <button v-on:click="signout" >signout</button>
    
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
 import NavBar from '../components/NavBar.vue'
  export default {
    name: 'Home',
      components : {
       NavBar
                  },
 
  data(){
    return {

      user:undefined,
      show:false,
    }
  },
  
  
 async created(){
    //axios.get("/users",{token:"fhsfhbshfbjhb"})
    //axiostest().then(res => console.log(res))
     if(localStorage.getItem('token'))
      {
       
          this.user = await axios.get("users",{
            headers : {
                        Authorization:'Bearer '+localStorage.getItem('token')
        }
      })
      }
  if(this.user){
    this.show = true 
  }
      //console.log(this.user.data.first_Name);
  },
  methods:{

    signout(){
      if(localStorage.getItem('token'))
      {
        localStorage.removeItem('token');
        this.$router.push("/login")
      }
    }
  }
}
</script>
<style scoped>

.yess{
  font-size: 10em;
  color:white;
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
.everything{
   background: #093545;
  position:absolute;
  top:0px;
  right:0px;
  bottom:0px;
  left:0px;
}
</style>
