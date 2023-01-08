<template>
  <div id="head" class="wrapper" :class="{'wrapper--active': isMenuActive}">
    <div class="container">
      <div class="logo-block">
        <nuxt-link to="/">
          <img class="logo-block__image" src="/img/logo.png">
        </nuxt-link>
      </div>
      <div
        class="nav-bar"
        :class="{'nav-bar--active': isMenuActive}"
      >
        <div
          v-for="(link, key) in links"
          :key="key"
          class="nav-bar__link"
        >
          <a
            :href="`/#${key}`"
            @click.prevent="scrollTo(key)"
          >{{ link }}</a>
        </div>
      </div>
      <div
        class="nav-bar-toggle"
        :class="{'nav-bar-toggle--active': isMenuActive}"
        @click="isMenuActive = !isMenuActive"
      >
        <div v-for="i of 4" :key="i" class="nav-bar-toggle__line" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 40px;
  color: #014EA6;
  font-weight: bold;
  font-size: 15px;
  z-index: 100;

  @media(max-width: 768px) {
    padding: 20px;
    transition: background-color .25s ease;
    &--active {
      background: white;
    }
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo-block {
    position: relative;
    flex-shrink: 0;
    &__image {
      width: 100%;
    }

    @media(max-width: 768px) {
      width: 120px;
    }
  }

  .nav-bar {
    display: flex;
    list-style: none;
    align-self: flex-end;
    margin-left: auto;
    font-weight: 500;
    color: #014EA6;

    @media(max-width: 768px) {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      opacity: 0;
      background: white;
      padding-bottom: 10px;

      transition: opacity .25s ease;

      &--active {
        opacity: 1;
      }
    }

    &__link {
      margin: 0 20px;
      cursor: pointer;
      a {
        color: inherit;
        text-decoration: inherit;
      }

      a:active,
      a:hover {
        outline: 0;
      }

      @media(max-width: 768px) {
        margin: 0;
        text-align: center;

        a {
          padding: 10px 30px;
          width: 100%;
          display: block;
        }

        &:hover {
          background: rgba(1, 78, 166, 0.31);
        }
      }
    }
  }

  .nav-bar-toggle {
    $root: &;
    padding: 10px;
    cursor: pointer;
    margin-left: auto;
    &__line {
      height: 2px;
      background: #014EA6;
      width: 20px;
      transition: all .25s ease;

      &:not(:first-child) {
        margin-top: 3px;
      }

      &:nth-child(3) {
        margin-top: -2px;
      }
    }

    @media(min-width: 769px) {
      display: none;
    }

    &--active {
      .nav-bar-toggle {
        &__line {
          &:nth-child(1),
          &:nth-child(4) {
            opacity: 0;
          }
          &:nth-child(2) {
            transform: rotate(45deg);
            transform-origin: center;
          }
          &:nth-child(3) {
            transform: rotate(-45deg);
            transform-origin: center;
          }
        }
      }
    }
  }
}
</style>

<script>
import scrollToMixin from '../mixins/scrollToMixin'

export default {
  mixins: [scrollToMixin],
  data () {
    return {
      isMenuActive: false
    }
  },
  watch: {
    '$route' () {
      this.isMenuActive = false
    }
  }
}
</script>
