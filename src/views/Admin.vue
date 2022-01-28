<template >
<div class="everything">
  <NavBar />
  <div class="head-div">
             <h1 class="title-big">DEMANDE DE STAGE</h1>
        </div>  
      
  <v-data-table 

    :headers="headers"
    :items="stage"
    sort-by="calories"
    class="elevation-1"
  
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>stage valide</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        > 
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        color="green"
        small
        class="mr-2"
        @click="ValideItem(item)"
      >
        mdi-checkbox-marked-circle
      </v-icon>
      <v-icon
        color="red"
        small
        class="mr-2"
        @click="nonValideItem(item)"
      >
       mdi-cancel
      </v-icon>
      </template>
  </v-data-table>
</div>
</template>
<script>
  import axios from 'axios'
  import NavBar from '../components/NavBar.vue'
  export default {
     
      components : {
       NavBar
                  },
    data: () => ({
      dialog: false,
      dialogDelete: false,
       stage: [],
      headers: [
        {
          text: 'nom stage',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'nom groupe', value: 'group.name' },
        //hna les fichier li lzm yhthom
        { text: 'valide', value: 'Valide' },
          { text: 'Actions', value: 'actions', sortable: false },
      ]}),
       created () {
      this.initialize()
    },
    methods:{
         async initialize () {
        const h = await axios.get("/stage/valide")
         this.stage = h.data;
       console.log(this.stage);
          },
        ValideItem (item) {
        this.editedIndex = this.stage.indexOf(item)
        this.editedItem = Object.assign({}, item)
          console.log(this.editedIndex)
         axios.put("/stage/"+this.stage[this.editedIndex]._id,{
           "Valide" : true
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
      },
        nonValideItem (item) {
        this.editedIndex = this.stage.indexOf(item)
        this.editedItem = Object.assign({}, item)
         axios.put("/stage/valide/"+this.stage[this.editedIndex]._id,{},
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
      },
    }
    }
  
</script>

<style scoped>
.everything{
  width: 100%;
  height: 100%;
  background: #093545;
}
.head-div{
  background-image: url("../assets/kevin-bhagat-zNRITe8NPqY-unsplash.jpg");
  z-index: -1;
  padding-top:13%;
  padding-left: 25%;
  width: 100%;
  height: 650px;
  top:0px;
  right:0px;
  left:0px;
  background-size: cover;
  background-position: center;
}
.title-big{
font-family: Lexend Deca;
font-size:5em ;
margin-left:30%;
color: #383838;
box-shadow: 7px 5px 5px red;
}
</style>