<template>
  <div class="home"><br>
  <h4>投稿されたブックマーク一覧</h4>
    <p><b>{{ userName }}</b>さん ようこそ！</p>
    <br>
    <div>
      <div v-html="list" v-for="list in reverseItems" v-bind:key="list"> <!--リバースした reverseItems を list に in する。-->
      {{ list }}
      </div>
    </div>
  </div>
</template>

<script>
  import liff  from "@line/liff";
  import firebase from 'firebase/app';
  import 'firebase/firestore';

  export default {
    data() {
      return {
        userName: undefined,
        isInClient: undefined,
        isLoggedIn: false,
        userImg: false,
        statusMessage: false,
        db: null,
        lists: [],
      }
    },
    computed: {
      // 配列の要素順番を逆順にする
      reverseItems() {
        return this.lists.slice().reverse(); // Vue.js の v-for側で リバースしてひっくり返せば良かったみたい。
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
        }),
        this.db = firebase.firestore();
        this.db.collection('text').orderBy('timestamp').get().then((querySnap) => {
          querySnap.forEach((doc) => {
            this.lists.push(doc.data().data)
          })
        });
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
  .home, .user {
      background: rgb(240, 240, 240);
  }

  .frame-wrapper__video {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  overflow: hidden;
  margin-bottom: 50px;
}

.frame-wrapper__video iframe {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.text{
  border:1px solid rgb(0, 0, 0);
  box-shadow:rgba(218, 102, 102, 0.059) 0px 0px 6px 3px;
  -webkit-box-shadow:rgba(122, 122, 122, 0.0588235) 0px 0px 6px 3px;
  -moz-box-shadow:rgba(122, 122, 122, 0.0588235) 0px 0px 6px 3px;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  word-wrap:break-all;
}
</style>