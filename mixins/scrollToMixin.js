import anime from 'animejs'

export default {
  methods: {
    scrollTo (anchor) {
      const isIndex = this.$route.name === 'index'
      if (!isIndex) {
        this.$router.push({
          name: 'index'
        })
      }

      setTimeout(async () => {
        const item = document.getElementById(anchor)

        await anime({
          targets: document.scrollingElement,
          scrollTop: item.getBoundingClientRect().top + document.scrollingElement.scrollTop,
          duration: 500,
          easing: 'easeInOutQuad'
        }).finished

        this.$router.push({
          hash: anchor
        })
      }, isIndex ? 0 : 1000)
    }
  },
  computed: {
    links () {
      return this.$store.state.frontState.nav
    }
  }
}
