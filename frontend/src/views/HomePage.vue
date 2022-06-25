<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <img src="../assets/icon-left-font.png" width="300" height="70" />
      </a>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Mon profil</strong>
            </a>
            <a class="button is-light"> Se deconnecter </a>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div class="poster">
    <form class="form">
       <figure class="image is-48x48">
         <img src="../assets/avatar.png">
       </figure>
       
        <input
          class="input is-rounded"
          type="text"
          placeholder="Votre titre"
        />

        <textarea class="textarea" placeholder="Exprimez-vous"></textarea>

      <div className="poster-footer">
        <label v for="file-input-poster">
          <i className="fa-solid fa-file-arrow-up"></i>
          <p>Importer une image</p>
        </label>
        <input
          type="file"
          id="file-input-poster"
          name="image"
          accept="image/png, image/jpeg, image/gif"
        >

        <div id="image-container"></div>
      </div>
      <!--p className="delete">Supprimer l'image</p-->

      <button class="button is-danger is-rounded">Envoyer</button>
    </form>
  </div>
</template>

<script>
//import axios from "axios";

export default {};
</script>

<style scoped>
.navbar-item {
margin-right: 35rem;
}
  

.navbar-item img {
  max-height: 100%;
}
.form{
  
 border: 1px solid black;
 height: auto;
 border-radius: 30px;
 margin: 0 50px 0 50px;
 padding: 10px;
 background-color: #dab4b4;;
}

.button.is-danger.is-rounded {
width: 30rem;
border-radius: 20px;
}

.poster-footer{
  height: 100px;
}

.input.input.is-rounded {
  width: 30rem;
  height: 2.5rem;
  margin-bottom: 20px;
}
.textarea {
  min-width: 60%;
 margin: 0 10px 0 10px;
  border-radius: 15px;
}
</style>