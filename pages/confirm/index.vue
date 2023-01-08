<template>
  <div class="select-wrapper">
    <section>
      <h1>Проверьте заказ</h1>
      <div class="results-block">
        <p v-if="!isSingleObject" class="result-text">
          Мы нашли несколько подходящих вариантов по вашему запросу: <a href="#" class="address-span">{{ requestString ? requestString.value : '' }}</a>
        </p>
        <p v-else class="result-text">
          Данные объекта недвижимости:
        </p>
        <table>
          <thead>
            <tr>
              <th class="cadastre">
                Кадастровый номер
              </th>
              <th>Адрес объекта</th>
              <th />
            </tr>
          </thead>
          <tbody
            is="transition-group"
            name="staggered-fade"
            tag="tbody"
            :css="false"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
          >
            <tr
              v-for="(item, index) in objects"
              :key="item.objectId"
              :data-index="index"
              class="table-content"
            >
              <td class="cadastre">
                {{ item.objectCn }}
              </td>
              <td>
                <div class="cadastre-mobile">
                  {{ item.objectCn }}
                </div>
                <div class="object-notes">
                  {{ item.addressNotes }}
                </div>
              </td>
              <td class="object-button">
                <button
                  v-if="!isSingleObject"
                  class="select-button"
                  @click="selectObject(item.objectCn)"
                >
                  Выбрать
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="hint top-hint" @click="handleChangeObject">
          Изменить запрос
        </p>
        <p v-if="!isSingleObject" class="hint bottom-hint">
          Не нашли, что искали? Попробуйте изменить запрос
        </p>
      </div>
    </section>
    <ChooseSection />
  </div>
</template>

<style lang="scss">
  .row-fade-enter-active, .row-fade-leave-active {
    transition: all 1s;
  }
  .row-fade-enter, .row-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-100%);
  }

  .row-face-move {
    transition: transform 1s;
  }

  .select-wrapper {
    background: linear-gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(79.12deg, rgba(89, 158, 236, 0.216) 17.96%, rgba(38, 108, 188, 0.3) 60.77%, rgba(1, 78, 166, 0.3) 82.04%), #FFFFFF;
    padding: 0 40px 80px;

    @media(max-width: 768px) {
      padding: 0 20px 60px;
    }

    section {
      padding-top: 160px;
      h1 {
        color:#014EA6;

        @media(max-width: 768px) {
          font-size: 32px;
        }
      }
    }
    .results-block {
      display: flex;
      background: #FFFFFF;
      font-size: 20px;
      margin-top: 40px;
      padding: 34px 40px 40px 40px;
      border-radius: 40px;
      flex-direction: column;
      position: relative;
      transition: height ease-out 2s;

      @media(max-width: 768px) {
        padding: 20px;
        border-radius: 20px;
      }

      .object-button {
        @media(max-width: 768px) {
          vertical-align: top;
        }
      }

      .cadastre {
        @media(max-width: 768px) {
          display: none;
        }

        &-mobile {
          margin-bottom: 10px;
          font-weight: bold;
          @media(min-width: 769px) {
            display: none;
          }
        }
      }

      .result-text {
        margin-top: 40px;

        @media(max-width: 768px) {
          font-size: 16px;
        }
      }

      .address-span {
        text-decoration: underline;
        color: #014EA6;
      }
      .bottom-hint {
        position: absolute;
        bottom: 10px;
        right: 40px;

        @media(max-width: 768px) {
          right: 10px;
          left: 10px;
          bottom: -10px;
          text-align: center;
        }
      }
      .top-hint {
        position: absolute;
        top: 34px;
        right: 40px;
        cursor: pointer;

        @media(max-width: 768px) {
          right: 20px;
        }
      }
      .hint {
        font-size: 15px;
        color: #646464;
      }
      p {
        font-weight: 500;
      }
      tr:nth-child(2n) {
        background: #FAFAFA;
      }
      .table-content:hover {
        background-color: #F2F6FB;
      }
      table {
        margin: 26px 0;
        border-spacing: 0;
        th {
          text-align: left;
          font-weight: normal;
          color: #646464;
          padding: 13px 0;
          height: 30px;

          @media(max-width: 768px) {
            font-size: 14px;
          }
        }
        td {
          padding: 13px 6px;
          height: 30px;

          @media(max-width: 768px) {
            font-size: 14px;
          }
        }
        .select-button {
          color: #014EA6;
          font-weight: bold;
          display: flex;
        }
        .select-button::after {
          content: '>';
          margin-left: 4px;
        }
      }
    }
  }
</style>

<script>
import { mapState, mapMutations } from 'vuex'
import ChooseSection from '~/components/MainPage/ChooseSection'

export default {
  components: {
    ChooseSection
  },
  computed: mapState({
    objects: (state) => state.frontState.objects.filter((item, index) => index <= 10),
    isSingleObject: (state) => (state.frontState.objects.length === 1),
    requestString: (state) => state.frontState.request
  }),
  mounted () {
    if (!this.objects.length) {
      this.$router.push('/')
    }
  },
  methods: {
    handleChangeObject () {
      this.$router.push('/')
    },
    ...mapMutations({
      selectObject: 'frontState/select',
      setConfirmedObject: 'frontstate/setConfirmedObject'
    }),

    beforeEnter (el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter (el, done) {
      const delay = el.dataset.index * 20
      setTimeout(function () {
        // eslint-disable-next-line no-undef
        Velocity(
          el,
          { opacity: 1, height: '1.6em' },
          { complete: done }
        )
      }, delay)
    },
    leave (el, done) {
      const delay = el.dataset.index * 20
      setTimeout(function () {
        // eslint-disable-next-line no-undef
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    }
  }
}
</script>
