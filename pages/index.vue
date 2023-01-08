<template>
  <div>
    <div class="inner-wrapper">
      <div class="content-wrapper">
        <div class="input-tile">
          <h1>Юридическая проверка<br>недвижимости</h1>
        </div>
        <AddressQuery
          v-model="address"
          class="address-query"
          placeholder="Введите адрес или кадастровый номер"
          hint="Например: 59:07:2540101:111 или Москва, Шоссейная, 32, 21"
          button-label="Найти"
          options-label="Выберите из списка или продолжите ввод"
          :is-mobile="isMobile"
          :options="options"
          @query="fetchAddresses"
          @submit="submitAddress"
        />
      </div>
    </div>
    <MainInfo />
  </div>
</template>

<script>
import axios from 'axios'
import AddressQuery from '../components/AddressQuery/AddressQuery'
import MainInfo from '~/components/MainPage/MainInfo'

export default {
  components: {
    AddressQuery,
    MainInfo
  },
  data () {
    return {
      options: [],
      address: null,
      isMobile: false
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleWindowResize)
    this.handleWindowResize()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {
    handleWindowResize () {
      this.isMobile = window.innerWidth < 768
    },
    async submitAddress () {
      const { data } = await axios.post('/api/rosreestr/search', { data: this.address })
      this.set(data)
      this.$router.push('/confirm')
    },
    async fetchAddresses (query) {
      if (query.length < 3) {
        return
      }

      const { data } = await axios.post('/api/rosreestr/hint', { query })
      this.options = data.map((option) => ({
        id: option.data.fias_id,
        label: option.unrestricted_value,
        data: option.data
      }))
    }
  }
}
</script>

<style lang="scss">
  @import "../components/MainPage/styles.scss";

  .address-query {
    margin: 70px 0;

    z-index: 1;
  }
</style>
