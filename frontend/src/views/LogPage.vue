<template>
  <header>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <img src="../assets/icon-left-font.png" width="330" height="70" />
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a
                @click="(loginUser = false), (signupUser = true)"
                class="button is-primary"
              >
                <strong>S'inscrire</strong>
              </a>
              <a
                @click="(loginUser = true), (signupUser = false)"
                class="button is-light"
              >
                Se connecter
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <main id="main" class="main">
    <!-- Bloc de connexion -->
    <div v-if="loginUser" class="main__form section">
      <form method="post" @submit.prevent="login()">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="email"
              placeholder="Email"
              v-model="email"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="password"
              placeholder="Password"
              v-model="password"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button type="submit" class="button is-success">
              Se connecter
            </button>
          </p>
        </div>
      </form>
      <br />
      <p>
        Pas encore inscrit?
        <span
          ><a
            href="#"
            @click="
              loginUser = false;
              signupUser = true;
            "
            >S'inscrire</a
          ></span
        >
      </p>
    </div>

    <!-- Bloc D'inscription -->
    <div v-if="signupUser" class="main__form section">
      <form method="post" @submit.prevent="signup()">
        <div id="order" class="field">
          <label class="label"></label>
          <div class="control has-icons-left has-icons-right">
            <input
              id="nom"
              class="input is-success"
              type="text"
              placeholder="Nom"
              v-model="nom"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label"></label>
          <div class="control has-icons-left has-icons-right">
            <input
              id="prénom"
              class="input is-success"
              type="text"
              placeholder="Prénom"
              v-model="prénom"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
          <p class="help is-success">Ce utilisateur est valide</p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              id="email"
              class="input"
              type="email"
              placeholder="Email"
              v-model="email"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input
              id="password"
              class="input"
              type="password"
              placeholder="Password"
              v-model="password"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button type="" class="button is-success">S'inscrire</button>
          </p>
        </div>
      </form>
      <br />
      <p>
        Déjà inscrit?
        <span
          ><a
            href="#"
            @click="
              loginUser = true;
              signupUser = false;
            "
            >Se connecter</a
          ></span
        >
      </p>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginUser: true,
      signupUser: false,
      validPassword: false,
      nom: null,
      prénom: null,
      email: null,
      password: null,
    };
  },

  methods: {
    // Fonction connexion
    login() {
      axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (!this.email) {
            return alert ("Utilisateur non existant!");
          }
          localStorage.setItem("user", res.data.userId);
          localStorage.setItem("token", res.data.token);
          this.$router.push("/home"),
            alert(
              " Bienvenue sur Groupomania, vous pouvez à présent échanger avec votre équipe ! "
            );
        })
        .catch((error) => console.log(error));
    },
    signup() {
      if (!this.nom || !this.prénom || !this.email || !this.password) {
        alert("Merci de renseigner tous les champs obligatoire");
        return false;
      }

      axios
        .post("http://localhost:3000/api/auth/signup", {
          nom: this.nom,
          prénom: this.prénom,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.login();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style >
.is-success.input{
  border-color: black;
}
.button.is-primary{
  background-color: red;
}
.input{
  border-color: black;
}
.button.is-success{
  background-color: red;
}
a {
  color: red;
}

</style>