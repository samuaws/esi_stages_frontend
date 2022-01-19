<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h3 class="yess" >Welcome {{ this.user.data.first_Name }}</h3>
    
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
    }
  },
  
  
 async created(){
    //axios.get("/users",{token:"fhsfhbshfbjhb"})
    //axiostest().then(res => console.log(res))
     this.user = await axios.get("users",{
       headers : {
                   Authorization:'Bearer '+localStorage.getItem('token')
    }
  })
      console.log(this.user.data.first_Name);
  },
}
</script>
<style scoped>
.yess{
  font-size: 10em;
  color:white;
}
</style>
