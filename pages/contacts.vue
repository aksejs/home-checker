/* eslint-disable */
<template>
  <div class="contacts-wrapper">
    <h1>Укажите контактные данные</h1>
    <div class="form-block">
      <form class="form-wrapper">
        <input v-model="email" class="form-wrapper__email" type="email" placeholder="Электронная почта">
        <input v-model="phone" class="form-wrapper__phone" type="tel" placeholder="Номер телефона">
        <button :disabled="!isValidate" class="button--green form-wrapper__button" @click="handleSubmit">
          К оплате
        </button>
      </form>
    </div>
    <div class="results-block">
      <p>Ваш заказ</p>
      <table>
        <thead>
          <tr>
            <th class="cadastre">
              Кадастровый номер
            </th>
            <th>Адрес объекта</th>
            <th>Тип и стоимость проверки</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="confirmedObject" class="table-content">
            <td class="cadastre">
              {{ confirmedObject.objectCn }}
            </td>
            <td>
              <div class="cadastre-mobile">
                {{ confirmedObject.objectCn }}
              </div>
              <div class="object-notes">
                {{ confirmedObject.addressNotes }}
              </div>
            </td>
            <td v-if="isPickedFullTariff">
              Пакет “Продвинутый”, 4000 ₽
            </td>
            <td v-else>
              Пакет “Базовый”, 1000 ₽
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .contacts-wrapper {
    background: linear-gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(79.12deg, rgba(89, 158, 236, 0.216) 17.96%, rgba(38, 108, 188, 0.3) 60.77%, rgba(1, 78, 166, 0.3) 82.04%), #FFFFFF;
    padding: 140px 40px;

    @media(max-width: 768px) {
      padding: 100px 20px 0;
    }

    h1 {
      color:#014EA6;

      @media(max-width: 768px) {
        font-size: 32px;
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

    .form-block {
      display: flex;
      justify-content: center;
      margin-top: 40px;

      .form-wrapper {
        display: flex;
        position: relative;
        width: 100%;
        min-height: 80px;

        @media(max-width: 768px) {
          display: grid;
          grid-gap: 20px;
        }

        @media(max-width: 460px) {
          grid-template-columns: 1fr;
        }

        input {
          border: none;
          font-size: 20px;
          padding: 25px 40px;
          outline: 0;

          @media(max-width: 768px) {
            width: 100%;
            border-radius: 20px !important;
            padding: 16px !important;
          }
        }
        &__name {
          border-top-left-radius: 40px;
          border-bottom-left-radius: 40px;
          margin-right: 2px;
          width: 25%;
        }
        &__email {
          border-top-left-radius: 40px;
          border-bottom-left-radius: 40px;
          width: 35%;
        }
        &__phone {
          flex-grow: 1;
          border-top-right-radius: 40px;
          border-bottom-right-radius: 40px;
          margin-left: 2px;
          width: 40%;
        }
        &__button {
          outline: 0;
          position: absolute;
          top: 0;
          right: 10px;
          font-weight: bold;
          white-space: nowrap;
          font-size: 20px;
          height: 60px;
          width: 200px;
          border-radius: 35px;
          margin-left: -210px;
          z-index: 51;
          margin-top: 10px;
          cursor: pointer;
          @media(max-width: 768px) {
            position: initial;
            margin-left: 0;
            width: 100%;
            margin-top: 0;
            border-radius: 16px;
            height: 55px;
          }
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

      .bottom-hint {
        position: absolute;
        bottom: 10px;
        right: 40px;
      }
      .top-hint {
        position: absolute;
        top: 34px;
        right: 40px;
      }
      .hint {
        font-size: 15px;
        color: #646464;
      }
      p {
        font-weight: 500;
      }
      table {
        margin: 26px 0;
        border-spacing: 0;
        th {
          text-align: left;
          font-weight: normal;
          color: #646464;
          padding: 10px 0;

          @media(max-width: 768px) {
            font-size: 14px;
          }
        }
        td {
          padding: 10px 6px;

          @media(max-width: 768px) {
            font-size: 14px;
          }
        }
      }
    }
  }
</style>

<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
import { CLOUD_PAYMENTS_PK } from '@/libs/constants'
export default {
  data () {
    return {
      name: '',
      email: '',
      phone: ''
    }
  },
  computed: {
    isValidate () {
      return this.name && this.validEmail(this.email) && this.validPhone(this.phone)
    },
    currentPrice () {
      return this.isPickedFullTariff ? 4000 : 1000
    },
    ...mapGetters({
      confirmedObject: 'frontState/confirmedObject',
      isPickedFullTariff: 'frontState/isPickedFullTariff'
    })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      const { name, email, phone } = this
      const setOrder = this.setObject
      const goTo = () => this.$router.push('/success')
      axios
        .post('/api/clients', { name, email, phone })
        .then(({ data }) => this.setClient(data))
      const widget = new window.cp.CloudPayments()
      widget.charge({ // options
        publicId: CLOUD_PAYMENTS_PK, // id из личного кабинета
        description: 'Пример оплаты (деньги сниматься не будут)', // назначение
        amount: this.currentPrice, // сумма
        currency: 'RUB', // валюта
        skin: 'modern' // дизайн виджета
      },
      function (options) { // success
        axios
          .post('/api/transactions', { email, status: 'success', price: this.currentPrice })
          .then(function (res) {
            setOrder(res.data)
            goTo()
          })
      },
      function (reason, options) { // fail
        axios.post('/api/transactions', { email, status: 'error', reason, price: this.currentPrice })
        // действие при неуспешной оплате
      })
    },
    validEmail (email) {
      const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    validPhone (phone) {
      const MOBILEREG = /\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*/
      return MOBILEREG.test(phone)
    },
    ...mapMutations({
      setObject: 'frontState/setOrder',
      setClient: 'frontState/setClient'
    })
  }
}
</script>
