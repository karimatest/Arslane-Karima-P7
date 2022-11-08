<template>
  <div class="card" v-for="publication in publications" :key="publication.id">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="../assets/pexels-ali-pazani-2811087.jpg" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{publication.firstname}} {{publication.lastname}}</p>
          </div>
        </div>
  <div class="card-image" v-if="publication.imageUrl" >
    <figure class="image is-4by3">
      <img :src="publication.imageUrl" alt="Placeholder image">
    </figure>
  </div>
  
    <p class="title" {{publication.titre}}></p>
  
    <div class="content" {{publication.content}} >
      <br>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
    <CommentList v-for="comment in publication.comments" :key="comment.id" ></CommentList>
  </div>
</div>
</template>

<script>
//import axios from 'axios';
import axios from 'axios';
import CommentList from '../components/CommentList.vue';
  export default {
    name:'PostList',
    components: { CommentList },
   
    
    data(){
      return {
        accedAccount: false, // Accès non autoriser à cette page
        userId: 0,
        userAdmin: 0,
        publications: [],
      }
    },
  created (){
    this.connectedUser()
  },
  beforeMount(){
      this.getAllPublications();
  },

  method: {
    connectedUser(){
    if(localStorage.user === undefined) {
      this.accedAccount = false;
      console.log("Accès non autorisé !")
    }else{//si l'user est bien stoké dans le localStorage
      this.accedAccount = true;
      console.log("Accès autorisé à l'utulisateur !");
     }
    },

    getAllPublications (){
      const token = JSON.parse(localStorage.user).token;
      axios.get("http://localhost:3000/api/publication",{
        headers:{'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'

        }
      })
      .then((res => {
       this.publication = res.data.publication;
      })
       ).catch((error =>{
        console.log(error);
       }))
      
    }

  }

}
</script>

<style scoped>
.card{
    width: 30rem;
    margin: auto;
    background-color: #ededed;
}
.title{
    margin-top: 10px;
    margin-bottom: 16px;
    font-size: 1.5rem;
}
</style>

