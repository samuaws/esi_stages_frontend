<template>
<div class="everything">
   <NavBar />
  <div class="head-div">
        </div>  
  <v-data-table
    :headers="headers"
    :items="encadreur"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>ENCADREUR</v-toolbar-title>
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
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Encadreur
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.first_Name"
                      label="first name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.last_Name"
                      label="last name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.tlf"
                      label="telephone"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.entreprise.name"
                      label="nom entreprise"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this Encadreur?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
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
      headers: [
        {
          text: 'Last name',
          align: 'start',
          sortable: false,
          value: 'last_Name',
        },
        { text: 'First name', value: 'first_Name' },
         { text: 'email', value: 'email' },
        { text: 'telephone', value: 'tlf' },
        { text: 'entreprise', value: 'entreprise.name', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      encadreur: [],
      editedIndex: -1,
      editedItem: {
          
        first_Name: "",
        last_Name:"",
        tlf: "",
        email: "",
        entreprise:{
            name : ""
        }
      },
      defaultItem: {
          
        first_Name: "",
        last_Name:"",
        tlf: "",
        email: "",
        entreprise:{
            name : ""
        }
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Encadreur' : 'Edit Encadreur'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
     async initialize () {
       const h = await axios.get("/encadreur")
       this.encadreur = h.data;
       console.log(this.encadreur);
    },
  
      

      editItem (item) {
        this.editedIndex = this.encadreur.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.encadreur.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        console.log(this.editedItem)
      

      },

      deleteItemConfirm () {
            axios.delete("/encadreur/"+this.encadreur[this.editedIndex]._id,
            {
                 headers : {
            Authorization:'Bearer '+localStorage.getItem('token')
             }
            })
        this.encadreur.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if(this.editedIndex === -1 ){
        axios.post("/encadreur",{
           "first_Name" : this.editedItem.first_Name,
           "last_Name" : this.editedItem.last_Name,
            "email"  :this.editedItem.email,
            "tlf" : this.editedItem.tlf,
            "entreprise" : this.editedItem.entreprise,
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
            this.encadreur.push(this.editedItem)
      }
      else{
        if (this.editedIndex > -1) {
          Object.assign(this.encadreur[this.editedIndex], this.editedItem)
        console.log("rjrbffjsrbkfsr");
        console.log(this.editedItem.first_Name);
        axios.put("/encadreur/"+this.encadreur[this.editedIndex]._id,{
           "first_Name" : this.editedItem.first_Name,
           "last_Name" : this.editedItem.last_Name,
            "email"  :this.editedItem.email,
            "tlf" : this.editedItem.tlf,
            "entreprise" : this.editedItem.entreprise,
            },
            {
                 headers : {
            Authorization:'Bearer '+localStorage.getItem('token')
             }
            }).then((res)=>{

                if(res.status == 201)
                {
                    // location.reload();
                }
            }).catch((e)=>{
                console.log(e);
            })
        } else {
          this.encadreur.push(this.editedItem)
        }
      }
        this.close()
      },
      },
    }
  
</script>


<style scoped>
.everything{
  width: 100%;
  height: 100%;
  background: #093545;
}
.head-div{
  background-image: url("../assets/ENCADREURS.jpg");
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