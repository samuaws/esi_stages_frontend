<template>
<div class="everything">


    <NavBar />
  <v-row>
    <v-col
      v-for="n in 8"
      :key="n"
      class="d-flex child-flex"
      cols="3"
    >
    <v-hover v-slot="{ hover }">
      <v-img
        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
        aspect-ratio="1"
        class="grey lighten-2"
      >
       <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal text-h2 white--text justify-center align-center"
            style="height: 100%;"
          >
            Stages
          </div>
        </v-expand-transition>
      </v-img>
    </v-hover>
    </v-col>
  </v-row>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
  export default {
    name: 'Home',
      components : {
       NavBar
                  },
}
</script>

<style scoped>
.everything{
     background: #093545;
}
</style>