<template>
<div class="everything">
   <NavBar />
  <div class="head-div">
             <h1 class="title-big">ETUDIANTS</h1>
        </div>  
  <v-data-table
    :headers="headers"
    :items="etudiant"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Etudiants</v-toolbar-title>
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
              color="rgb(37, 119, 26)"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"

            >
              New Etudiant
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
                      v-model="editedItem.username"
                      label="username"
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
                      v-model="editedItem.matricule"
                      label="matricule"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    
                  >
                    <v-text-field
                      v-model="editedItem.password"
                      label="password"
                      type="password"
                      
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
            <v-card-title class="text-h5">Are you sure you want to delete this etudiant?</v-card-title>
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
       
        color="orange"
        class="mr-2"
        @click="editItemUser(item)"
      >
                mdi-checkbox-marked-circle

      </v-icon>
      <v-icon
        small
        color="black"
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        color="red"
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
      clicked : false,
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
         { text: 'username', value: 'username' },
        { text: 'email', value: 'email' },
        { text: 'matricule', value: 'matricule', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      etudiant: [],
      editedIndex: -1,
      editedItem: {
        username : "", 
        first_Name: "",
        last_Name:"",
        matricule: "",
        email: "",


      },
      defaultItem: {
        username : "", 
        first_Name: "",
        last_Name:"",
        matricule: "",
        email: "",
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Etudiant' : 'Edit Etudiant'
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
       const h = await axios.get("/users/admin",{
                 headers : {
            Authorization:'Bearer '+localStorage.getItem('token')
             }
            })
         this.etudiant = h.data;
         console.log(this.etudiant);
       
    },
  
      

      editItem (item) {
        this.editedIndex = this.etudiant.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      editItemUser(item)  {
        this.clicked = !this.clicked
        this.editedIndex = this.etudiant.indexOf(item)
        this.editedItem = Object.assign({}, item)
      axios.put(`/users/${this.etudiant[this.editedIndex]._id}/toAdmin`,
                {

                },
                 {
                 headers : {
                 Authorization:'Bearer '+localStorage.getItem('token')
                          }
                 })
      }, 

      deleteItem (item) {
        this.editedIndex = this.etudiant.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        console.log(this.editedItem)
      

      },

      deleteItemConfirm () {
   
            axios.delete("/users/"+this.etudiant[this.editedIndex]._id,
            {
                 headers : {
            Authorization:'Bearer '+localStorage.getItem('token')
             }
            })
        this.etudiant.splice(this.editedIndex, 1)
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
        axios.post("/signup",{
           "first_Name" : this.editedItem.first_Name,
           "last_Name" : this.editedItem.last_Name,
            "email"  :this.editedItem.email,
            "username" : this.editedItem.username,
            "matricule" : this.editedItem.matricule,
            "password" : this.editedItem.password,
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
            this.etudiant.push(this.editedItem)
      }
      else{
        if (this.editedIndex > -1) {
          Object.assign(this.etudiant[this.editedIndex], this.editedItem)
        console.log("rjrbffjsrbkfsr");
        console.log(this.editedItem.first_Name);
        axios.put("/users/"+this.etudiant[this.editedIndex]._id,{
           "first_Name" : this.editedItem.first_Name,
           "last_Name" : this.editedItem.last_Name,
            "email"  :this.editedItem.email,
            "username" : this.editedItem.username,
            "matricule" : this.editedItem.matricule,
            "password" : this.editedItem.password,
            
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
          this.etudiant.push(this.editedItem)
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
  background-image: url("../assets/ETUDIANTS.jpg");
  z-index: -1;
  padding-top:10%;
 
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

color: #383838;

}
.grn{
 color: green;
}
.rd{
 color: red;
}
</style>