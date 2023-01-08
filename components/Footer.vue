<template>
  <div class="footer-wrapper">
    <div class="nav-block">
      <div class="footer-logo-wrapper">
        <img class="footer-logo" src="/img/logo-footer.png">
      </div>
      <div class="nav-bar">
        <div class="nav-bar__link">
          <a href="/files/agreement.pdf">Условия предоставления услуг</a>
        </div>
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
    </div>
    <div class="contacts-block">
      По всем вопросам обращайтесь на e-mail support@homecheker.ru, либо по телефону +7 (499) 404-14-58 (с 8:00 до 22:00 МСК)
    </div>
  </div>
</template>

<script>
import scrollToMixin from '../mixins/scrollToMixin'

export default {
  mixins: [scrollToMixin]
}
</script>

<style lang="scss">
  .footer-wrapper {
    background-color: #F2F6FB;
    padding: 50px 40px 20px 40px;

    @media(max-width: 768px) {
      padding: 20px;
    }

    .footer-logo-wrapper {
      @media(max-width: 768px) {
        text-align: center;
      }
    }

    .footer-logo {
      width: 120px;
    }

    .contacts-block {
      text-align: center;
      margin-top: 40px;
    }
    .nav-block {
      display: flex;
      justify-content: space-between;

      @media(max-width: 768px) {
        display: grid;
        grid-gap: 20px;
        justify-content: initial;
      }

      .nav-bar {
        display: flex;
        list-style: none;
        align-self: flex-end;
        font-weight: 500;
        color: #014EA6;
        @media(max-width: 768px) {
          flex-wrap: wrap;
          justify-content: space-between;
        }
        &__link {
          margin: 0 20px;
          cursor: pointer;

          @media(max-width: 768px) {
            text-align: center;
            flex-grow: 1;
            margin: 10px;
          }
          a {
            color: inherit;
            text-decoration: inherit;
          }
          a:focus {
            outline: thin dotted;
          }

          /**
          * Improve readability when focused and also mouse hovered in all browsers.
          */

          a:active,
          a:hover {
            outline: 0;
          }
        }
      }
    }
  }
</style>
