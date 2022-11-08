<template>
    <article class="media">
      <figure class="media-left">
        <p class="image is-48x48">
          <img src="../assets/pexels-matheus-bertelli-573299.jpg">
        </p>
      </figure>
      <div class="media-content" v-for="comment in publication.Comments" :key="comment.id">
        <div class="content">
          <p>
            <strong>{{comment.firstname}} {{comment.lastname}} </strong>
            <br>
            {{comment.content}}
            <br>
          </p>
        </div>
      </div>
    </article>
    
<article class="media">
  <figure class="media-left">
    <p class="image is-48x48">
      <img src="../assets/pexels-matheus-bertelli-573299.jpg">
    </p>
  </figure>
  <div class="media-content">
    <div class="field">
      <p class="control">
        <textarea class="textarea is-small" placeholder="Add a comment..." v-model="commentContent" ></textarea>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <button class="button is-rounded">Post comment</button>
      </p>
    </div>
  </div>
</article>
 
</template>
<script>

export default{
  name:'CommentList',
  data() {
    return{

    }
  }
}
</script>


<style scoped>
.textarea{
  min-height: 3em;
  max-height: 16em;
}
.button.is-rounded{
  padding: 5px;
  background-color: #e7b4be;
}
</style>