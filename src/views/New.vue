<template>
  <div class="new"><br>
    <h4>📝 新規ブックマーク作成</h4>

    <br>
    <span>共有したい動画のリンクをペースト</span>
      <div>
        <b-form-input v-model="movie" placeholder="https://youtu.be/・・・・" autocomplete="off"></b-form-input>
      </div>

    <br>
    <span>動画についてコメントを入力</span>
      <div>
        <b-form-textarea v-model="text" rows="5" no-resize placeholder="例) この動画めっちゃスゲー...
みんな、一度は観てみてください!!" type="text"></b-form-textarea>
      </div>
    <br>
    <b-button @click="addData()" block>ブックマークを投稿</b-button>
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
        date: '',
        text: '',
        movie: '',
        create_link: '',
        movies: ''
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
                this.lists.push(doc.data().data) //(1)ここの名前が重要だった。(これ、コレクション名じゃなくて、フィールドの方説がある)
            })
        });
    },
    methods: {
      logout(){
        if (liff.isLoggedIn()) {
          liff.logout();
          setTimeout(() => {
            window.location.href = "/"
          }, 1000)
        }
      },
      addData(){

        // 文字列の改行
        let a = this.text
        const b = a.replace(/\n/g, '<br>&nbsp;&nbsp;');
        this.text = b

        // 日付の取得
        let now = new Date();
        let year = now.getFullYear();
        let mon = now.getMonth()+1; //１を足すこと
        let day = now.getDate();
        let date = year + '年' + mon + '月' + day + '日'
        this.date = date

        let movie_link = 'https://youtu.be/' // リンク元
        this.create_link = this.movie.replace(movie_link, '') // IDを取得
        alert(this.create_link)
        this.movies = `<div class="frame-wrapper__video"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/`+this.create_link+`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`

        this.db.collection('text').add({
          data: `
                <b-col sm="6">
                <div class="text">
                    `+this.movies+`
                    <b-list-group-item>
                      &nbsp;<img src="`+this.userImg+`" width="50px" style="border-radius:50px;">
                      <b>`+this.userName+`</b>
                    </b-list-group-item><br><br>
                    &nbsp;&nbsp;`+this.date+` 投稿:<br>
                    &nbsp;&nbsp;`+this.text+`</p><br>
                </div>
                </b-col>`,
          timestamp: firebase.firestore.Timestamp.fromDate(new Date())
        })
        this.exit()
      },
      exit(){
        alert('ブックマークの投稿が完了しました。')
        setTimeout(() => {
          window.location.href = ""
        }, 1000)
      }
    }
  }
</script>

<style>
  .home, .user, .new {
      background: rgb(240, 240, 240);
  }
</style>