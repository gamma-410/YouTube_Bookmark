<template>
  <div id="app">
    <br>
    <b-container fluid>
    <b-navbar toggleable>
      <b-navbar-brand><router-link style="color:#000;text-decoration:none;" to="/">YouTube Bookmark</router-link></b-navbar-brand>

       <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" class="fa fa-remove fa "></b-icon>
            <b-icon v-else class="fa fa-reorder fa "></b-icon>
          </template>
        </b-navbar-toggle>

       <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto"><br>
          <b-nav-item><router-link style="color:#000;" to="/">ホーム</router-link></b-nav-item><br>
          <b-nav-item><router-link style="color:#000;" to="/new">ブックマーク作成</router-link></b-nav-item><br>
          <b-nav-item><router-link style="color:#000;" to="/user">ユーザー情報</router-link></b-nav-item><br>
          <b-nav-item><a v-if="!isInClient" @click="logout" style="color:#000;">ログアウト</a></b-nav-item><br>
          </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container fluid>
      <router-view/>
    </b-container>
    </b-container>
  </div>
</template>

<script>
  import liff  from "@line/liff";
  export default {
    data() {
      return {
        userName: undefined,
        isInClient: undefined,
        isLoggedIn: false,
        userImg: false,
        statusMessage: false
      }
    },
    created() {
      liff
        .init({
          liffId: process.env.VUE_APP_LIFF_ID
        })
        .then(() => {
          this.isLoggedIn = liff.isLoggedIn();
          if (!liff.isInClient() && !liff.isLoggedIn()) {
            liff.login();
          } else {
            this.isInClient = liff.isInClient();
            liff.getProfile()
              .then(profile => {
                this.userName = profile.displayName;
                this.userImg = profile.pictureUrl;
                this.statusMessage = profile.statusMessage;
              })
          }
        })
    },
    methods: {
      logout: function () {
        if (liff.isLoggedIn()) {
          liff.logout();
          setTimeout(() => {
            window.location.href = "/"
          }, 1000)
        }
      }
    }
  }
</script>

<style>
body, html, #app {
  background: rgb(240, 240, 240);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000b16;
}

#nav {
  background: rgb(240, 240, 240);
}

#nav a {
  font-weight: bold;
  color: #3b3b3b;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.container-fluid{
  margin-right: auto;
  margin-left: auto;
  max-width: 800px;
}
</style>
