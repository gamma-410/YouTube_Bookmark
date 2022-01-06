<template>
  <div class="user"><br>
    <b-container>
      <b-container>
      <b-container class="bv-example-row">
        <hr>
        <b-row style="text-align:left;">
          <b-col sm="3"><img :src="userImg" style="border-radius:100%;" width="100%"></b-col>
          <b-col sm="9">
            <br>&nbsp;<h3><b>{{ userName }}</b></h3>
            <p>{{ statusMessage }}</p>
          </b-col>
        </b-row>
        </b-container>
        <hr>
        <br>
        <h4>📖 あなたのブックマーク</h4>
        <p>ごめんなさい...準備中です。</p>
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
        statusMessage: false,
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
