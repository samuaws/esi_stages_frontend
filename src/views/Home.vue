<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    
    <h3 v-if="show" class="yess" >Welcome {{ this.user.data.first_Name }}</h3>
    <button v-on:click="signout" >signout</button>
    
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'Home',
  components: {
   
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
      }
    }
  }
}
</script>
<style scope>
body{
 background: #093545;
}
.yess{
  font-size: 10em;
  color:white;
}
</style>
