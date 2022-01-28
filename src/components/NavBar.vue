<template>
  <div class="nav">

   

    <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          ESI Stage
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: "NavBar",
  data(){
    return {
      sidebar: false,
      menuItems: []
    }
  },
 async  created(){
      if(localStorage.getItem('token'))
      {
       
          this.user = await axios.get("users",{
            headers : {
                        Authorization:'Bearer '+localStorage.getItem('token')
        }
      })
      }
      console.log(this.user.data.is_Admin);
       if(this.user){
     if(this.user.data.is_Admin){
       this.menuItems=[      
         { title: 'Etudiants', path: '/etudiants', icon: 'lock_open' },
          { title: 'groupe', path: '/group', icon: 'lock_open' },
          { title: 'validation', path: '/admin', icon: 'lock_open' },
          { title: 'Entreprise', path: '/entreprise', icon: 'lock_open' },
          { title: 'Statistique', path: '/statistique', icon: 'lock_open' },
          { title: 'Encadreur', path: '/encadreurs', icon: 'lock_open' },
          { title: 'Promoteur', path: '/promoteurs', icon: 'lock_open' },
          { title: 'Stages', path: '/stages', icon: 'lock_open' },
          { title: 'Sign Up', path: '/signup', icon: 'face' },
          { title: 'Change Account', path: '/login', icon: 'lock_open' },]
               this.menuItems[8].title = this.user.data.username
     }
  else{    
    console.log("hnaaaaaa");
          this.menuItems=[  
            { title: 'Statistique', path: '/statistique', icon: 'lock_open' },
          { title: 'Promoteur', path: '/promoteurs', icon: 'lock_open' },
          { title: 'Stages', path: '/stages', icon: 'lock_open' },
          { title: 'Sign Up', path: '/signup', icon: 'face' },
          { title: 'Change Account', path: '/login', icon: 'lock_open' },
          ]
         this.menuItems[3].title = this.user.data.username
  }
            }
  }
};
</script>
<style>
</style>