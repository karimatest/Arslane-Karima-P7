<template>
    <footer id="footer" class="footer">
        <div>
           <!-- <p class="footer__img" @click="returnTop()"><img src="../assets/icon-above-font.png" alt="logo Groupomania" title="Retour au haut de la page"></p> -->
            <ul class="footer__links">
                <li class="footer__links__item"><a href="https://www.facebook.com/" title="Suivez-nous sur Facebook"><i class="fab fa-facebook-square"></i></a></li>
                <li class="footer__links__item"><a href="https://www.instagram.com/" title="Suivez-nous sur Instagram"><i class="fab fa-instagram"></i></a></li>
                <li class="footer__links__item"><a href="https://twitter.com/" title="Suivez-nous sur Twitter"><i class="fab fa-twitter-square"></i></a></li>
                <li class="footer__links__item"><a href="mailto:groupomania-support@gmail.com" title="Contactez-nous par mail"><i class="far fa-envelope"></i></a></li>
            </ul>
        </div>
    </footer>
</template>
<script>
export default {
    name: 'PageFooter',
  
    methods: {
        returnTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
    }
        
    
}
</script>

<style>

</style>