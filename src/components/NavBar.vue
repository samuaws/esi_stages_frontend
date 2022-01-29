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
    methods:{

    signout(){
      if(localStorage.getItem('token'))
      {
        localStorage.removeItem('token');
        this.$router.push("/login")
      }
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
     if(this.user.data.is_Admin){
       this.menuItems=[      
         { title: 'Etudiants', path: '/etudiants', icon: 'school' },
          { title: 'groupe', path: '/group', icon: 'groups' },
          { title: 'validation', path: '/admin', icon: 'approval' },
          { title: 'Entreprise', path: '/entreprise', icon: 'domain' },
          { title: 'Statistique', path: '/statistique', icon: 'equalizer' },
          { title: 'Encadreur', path: '/encadreurs', icon: 'work' },
          { title: 'Promoteur', path: '/promoteurs', icon: 'supervisor_account' },
          { title: 'Stages', path: '/stages', icon: 'format_list_numbered_rtl' },
          { title: 'Sign Up', path: '/signup', icon: 'account_circle' },
          { title: 'Sign Up', path: '/signup', icon: 'lock_open' },
          { title: 'Sign out', path: '/login', icon: 'logout' },]
               this.menuItems[8].title = this.user.data.username
     }
  else{    
    console.log("hnaaaaaa");
          this.menuItems=[  
          { title: 'Statistique', path: '/statistique', icon: 'equalizer' },
          { title: 'Promoteur', path: '/promoteurs', icon: 'supervisor_account' },
          { title: 'Stages', path: '/stages', icon: 'lock_open' },
          { title: 'Sign Up', path: '/signup', icon: 'account_circle' },
          { title: 'Sign Up', path: '/signup', icon: 'lock_open' },
          { title: 'Sign out', path: '/login', icon: 'logout' },
          ]
         this.menuItems[3].title = this.user.data.username
  }
            }
  }
};
</script>
<style>
</style>