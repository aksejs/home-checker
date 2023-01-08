<template>
  <div>
    <Header />
    <div class="main-wrapper">
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,700&display=swap&subset=cyrillic');

.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}

button {
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  outline: none;

  background: transparent;

  /* inherit font & color from ancestor */
  color: inherit;
  font: inherit;

  /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */
  line-height: normal;

  /* Corrects font smoothing for webkit */
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  /* Corrects inability to style clickable `input` types in iOS */
  -webkit-appearance: none;
}
</style>
<style>
html {
  font-family: 'Montserrat', sans-serif;
  color: #333;
  font-size: 15px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

h1 {
  font-size: 40px;
  font-weight: 500;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

button {
  cursor: pointer;
}

.button--green {
  display: inline-block;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  padding: 10px 30px;
  background-color: #F85B29;
}

.button--green:hover {
  background: linear-gradient(106.7deg, rgba(248, 91, 41, 0.5) 0%, rgba(169, 25, 25, 0.5) 100%), #F85B29;
}

.button--green:disabled {
  cursor: not-allowed!important;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.button--inverse {
  display: inline-block;
  border-radius: 4px;
  border: 5px solid #014EA6;
  text-decoration: none;
  background: inherit;
  color: #014EA6;
}
.button--inverse:hover {
  background: #014EA6;
  color: #fff;
}
.main-wrapper {
  background-color: #f7f8f8;
}
</style>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
export default {
  components: {
    Header,
    Footer
  }
}
</script>
