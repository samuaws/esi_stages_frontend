<template>
<div class="everything">
   <NavBar />
  <div class="head-div">
             <h1 class="title-big">GROUPE</h1>
        </div>  
  <v-data-table
    :headers="headers"
    :items="group"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>group</v-toolbar-title>
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
              New Item
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
                      v-model="editedItem.name"
                      label="name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.type"
                      label="type"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.matricule1"
                      label="matricule 1"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.matricule2"
                      label="matricule2"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.matricule3"
                      label="matricule3"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.matricule4"
                      label="matricule 4"
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
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
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
     // etud:[],
      headers: [
        {
          text: 'nom groupe',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'type', value: 'type' },
        { text: 'Matricule 1', value: 'etudiants[0].matricule' },
         { text: 'Matricule 2', value: 'etudiants[1].matricule' },
        { text: 'Matricule 3', value: 'etudiants[2].matricule' },
        { text: 'Matricule 4', value: 'etudiants[3].matricule', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      group: [],
      editedIndex: -1,
      editedItem: {
          name:"",
          type:"",
          matricule1:"",
          matricule2:"",
          matricule3:"",
          matricule4:"",

        },
      
      defaultItem: {
          
          name:"",
          type:"",
          matricule1:"",
          matricule2:"",
          matricule3:"",
          matricule4:"",

      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New group' : 'Edit group'
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
       const h = await axios.get("/group")
       this.group = h.data;
 
    },
  
      

      editItem (item) {
        this.editedIndex = this.group.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.group.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        console.log(this.editedItem)
      

      },

      deleteItemConfirm () {
            axios.delete("/group/"+this.group[this.editedIndex]._id,
            {
                 headers : {
            Authorization:'Bearer '+localStorage.getItem('token')
             }
            })
        this.group.splice(this.editedIndex, 1)
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
          axios.post("/group",{
            "name" : this.editedItem.name,
           "type" : this.editedItem.type,
           "m1" : this.editedItem.matricule1,
            "m2"  :this.editedItem.matricule2,
            "m3" : this.editedItem.matricule3,
            "m4" : this.editedItem.matricule4,
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
              console.log(this.editedItem.matricule1);
            this.group.push(this.editedItem)
      }
      else{
        if (this.editedIndex > -1) {
          Object.assign(this.group[this.editedIndex], this.editedItem)
        console.log("rjrbffjsrbkfsr");
        console.log(this.editedItem.first_Name);
        axios.put("/group/"+this.group[this.editedIndex]._id,{
         "name" : this.editedItem.name,
         "type" : this.editedItem.type,
           "m1" : this.editedItem.matricule1,
            "m2"  :this.editedItem.matricule2,
            "m3" : this.editedItem.matricule3,
            "m4" : this.editedItem.matricule4,
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
          this.group.push(this.editedItem)
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
  background-image: url("../assets/GROUPES.jpg");
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
color: white;
box-shadow: 7px 5px 5px red;
}
</style>