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
      menuItems: [
          { title: 'Statistique', path: '/statisique', icon: 'lock_open' },
          { title: 'Etudiants', path: '/etudiants', icon: 'lock_open' },
          { title: 'Emcadreur', path: '/emcadreurs', icon: 'lock_open' },
          { title: 'Entreprise', path: '/entreprise', icon: 'lock_open' },
          { title: 'Stages', path: '/stages', icon: 'lock_open' },
          { title: 'Sign Up', path: '/signup', icon: 'face' },
          { title: 'Change Account', path: '/login', icon: 'lock_open' },
     ]
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
  if(this.user){
    this.menuItems[5].title = this.user.data.username
  }
  }
};
</script>
<style>
</style>