<template>
  <header>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <img src="../assets/icon-left-font.png" width="220" height="40" />
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/profile" class="button is-danger">
                <strong>Mon profil</strong>
              </router-link>
              <a @click="logout()" class="button is-light"> Se deconnecter </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <div class="container is-max-desktop" v-if="accedAccount">
    <form class="publication-form" @submit.prevent="createPublication()">
      <input class="input is-rounded" type="text"   placeholder="Titre" v-model="titre">
      <div class="field is-centred">
        <div class="control">
          <textarea class="textarea is-small"  placeholder="Nouvelle publication ..." v-model="content"></textarea>
        </div>
      </div>
      <div class="file is-centered is-small is-boxed has-name">
        <label class="file-label">
          <input class="file-input" type="file" name="image" accept=".png, .jpg, .jpeg, .gif" id="image-input" @change="uploadImage()">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Add image…
            </span>
          </span>
        </label>
      </div>
      <button type="submit" class="button is-rounded is-danger" @submit.prevent="createPublication()" >Poster</button>
    </form>
   
    <PostList v-for="publication in publications" :key="publication.id" :publication="publication"></PostList>
   
  </div>
</template>

<script>
import PostList from '@/components/PostList.vue'
import axios from 'axios';

export default {

  components: { PostList },
 
  data (){
    return{
      userId:'',
     titre:'',
     content:'',
     imageFile:''
    }
  },
 created(){
 this.connectedUser()
 },
 
  methods: {
    logout: function () {
      localStorage.clear();
      this.$router.push("/");
    },
    connectedUser(){
    if(localStorage.user === undefined) {
      this.accedAccount = false;
      console.log("Accès non autorisé !")
    }else{//si l'user est bien stoké dans le localStorage
      this.accedAccount = true;
      console.log("Accès autorisé à l'utulisateur !");
     }
    },

    uploadImage() {
      let inputFile = document.getElementById('image-input').value
      this.imageFile = inputFile.file[0];
    },

    createPublication() {
    const token = JSON.parse(localStorage.user).token
    const formData = new FormData()
    if(this.imageFile == null){
      formData.append('titre', this.titre)
      formData.append('content', this.content)
    }else{
      formData.append('titre', this.titre)
      formData.append('content', this.content)
      formData.append('imageFile', this.imageFile)
    }
    console.log(token),
    axios.post('http://localhost:3000/api/publication/', formData,{
      headers:{ "Content-Type": "multipart/form-data",
        Authorization: 'Bearer' + token},
      
    })
    .then((res)=> {
      console.log(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
    },

  },

}
</script>


<style scoped>
.navbar {
  border-bottom: 1px solid rgb(162, 158, 158);
  margin-bottom: 10px;
}

.navbar-burguer {
  height: 12.25rem;
}

.input,
.textarea {
  max-width: 36%;
  margin: 1rem;
  border-color: #e02147
}

.input.is-rounded {
  margin: 2px;
}

.textarea {
  min-width: 98%;
  margin: 5px;
  border-color: #e02147;
}

.is-small.textarea {
  border-radius: 24px;
}

.button.is-rounded {
  margin: 8px;
}

.button.is-light {
  background-color: #e7e4e4;
}

.file {
  width: 4rem;
  height: 3rem;
  margin: auto;
}

.file-label {
  border-radius: 5px;
}

.file-cta {
  background-color: rgb(188, 187, 187);
}

.card {
  margin-bottom: 20px;
}

.publication-form {
  background-color: rgb(208, 203, 203);
  padding: 5px;
  margin: 10px;
  border-radius: 20px;
}
</style>