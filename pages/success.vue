<template>
  <div class="success-wrapper">
    <h1>Спасибо за заказ!</h1>
    <div class="description">
      Мы уже отправили ваши данные нашим экспертам и скоро они начнут проверку.<br>
      Мы свяжемся с вами, как только все будет готово.
    </div>
    <div class="results-block">
      <p>Заказ № 1234-{{ order.id }} от {{ order.createdAt }}</p>
      <table>
        <thead>
          <tr>
            <th class="cadastre">
              Кадастровый номер
            </th>
            <th class="cadastre">
              Адрес объекта
            </th>
            <th class="cadastre">
              Тип и стоимость проверки
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="confirmedObject" class="table-content">
            <td class="cadastre">
              {{ confirmedObject.objectCn }}
            </td>
            <td>
              <div class="cadastre-mobile">
                {{ confirmedObject.addressNotes }}
              </div>
              <div class="object-note">
                {{ confirmedObject.addressNotes }}
              </div>
              <div class="tariff">
                {{ isPickedFullTariff ? 'Пакет “Продвинутый”, 4000 ₽' : 'Пакет “Базовый”, 1000 ₽' }}
              </div>
            </td>
            <td v-if="isPickedFullTariff" class="cadastre">
              Пакет “Продвинутый”, 4000 ₽
            </td>
            <td v-else class="cadastre">
              Пакет “Базовый”, 1000 ₽
            </td>
          </tr>
        </tbody>
      </table>
      <table class="contacts contacts--desktop">
        <thead>
          <tr>
            <th>Контактное лицо</th>
            <th>Электронная почта</th>
            <th>Номер телефона</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="client" class="table-content">
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.phone }}</td>
          </tr>
        </tbody>
      </table>
      <table class="contacts contacts--mobile">
        <tbody>
          <tr class="table--content">
            <th>Контактное лицо:</th>
            <td>{{ client.name }}</td>
          </tr>
          <tr class="table--content">
            <th>Электронная почта:</th>
            <td>{{ client.email }}</td>
          </tr>
          <tr class="table--content">
            <th>Номер телефона:</th>
            <td>{{ client.phone }}</td>
          </tr>
        </tbody>
      </table>
      <div class="logo-block">
        <div class="logo-block__content">
          <img src="/img/logo-small.png">
          <p>homechecker.ru</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .success-wrapper {
    padding: 140px 40px 80px;

    background:
            linear-gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),
            linear-gradient(79.12deg, rgba(89, 158, 236, 0.216) 17.96%, rgba(38, 108, 188, 0.3) 60.77%, rgba(1, 78, 166, 0.3) 82.04%),
            url(../assets/bgs/success.png) top right no-repeat,
            #FFFFFF;

    @media(max-width: 1170px) {
      background:
              linear-gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),
              linear-gradient(79.12deg, rgba(89, 158, 236, 0.216) 17.96%, rgba(38, 108, 188, 0.3) 60.77%, rgba(1, 78, 166, 0.3) 82.04%),
              #FFFFFF;
    }

    @media(max-width: 768px) {
      padding: 100px 20px 80px;
    }

    h1 {
      color: #014EA6;
      margin-bottom: 40px;

      @media(max-width: 768px) {
        font-size: 32px;
      }
    }
    .description {
      font-size: 20px;
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

    .tariff {
      margin-top: 20px;
      @media(min-width: 768px) {
        display: none;
      }
    }

    .results-block {
      display: flex;
      background: #FFFFFF;
      font-size: 20px;
      margin-top: 40px;
      padding: 34px 40px 12px 40px;
      border-radius: 40px;
      flex-direction: column;
      position: relative;
      transition: height ease-out 2s;

      @media(max-width: 768px) {
        padding: 16px;
        border-radius: 20px;
      }

      table {
        margin: 26px 0;
        border-spacing: 0;
        width: 100%;
        tr:first-child {
          width: 20%;
        }
        th {
          text-align: left;
          font-weight: 500;
          color: #646464;
          padding: 10px 6px;
        }
        td {
          padding: 10px 6px;
          font-weight: 500;

          @media(max-width: 768px) {
            font-size: 16px;
          }
        }
      }
      .logo-block {
        display: flex;
        justify-content: center;
        margin-top: 5px;
        &__content {
          display: flex;
          flex-direction: column;
          img {
            width: 30px;
            margin: auto;
          }
          p {
            font-size: 15px;
          }
        }
      }
    }

    .contacts {
      font-size: 12px;

      &--desktop {
        @media(max-width: 768px) {
          display: none;
        }
      }

      &--mobile {
        @media(min-width: 769px) {
          display: none;

          td {
            font-size: 14px;
          }
        }
      }
    }
  }
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      order: 'frontState/order',
      client: 'frontState/client',
      confirmedObject: 'frontState/confirmedObject',
      isPickedFullTariff: 'frontState/isPickedFullTariff'
    })
  }
}
</script>
