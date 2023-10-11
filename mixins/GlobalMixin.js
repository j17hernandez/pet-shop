import Swal from 'sweetalert2'

const GlobalMixin = {
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    isMobile() {
      let status = false
      switch (this.$vuetify.breakpoint.name) {
        case 'sm':
        case 'xs':
          status = true
          break
        default:
          status = false
          break
      }
      return status
    },
  },
  methods: {
    $list(path) {
      return this.$axios.get(path)
    },
    $create(path, data) {
      return this.$axios.post(path, data)
    },
    $success(text) {
      this.$swal('Excelente!', text, 'success')
    },
    $error(err) {
      this.$swal('Oops! algo ha pasado', err, 'error')
    },
    $globalAlert(title, text, icon) {
      this.$swal(title, text, icon)
    },
    $updateSite() {
      this.$globalAlert(
        'Warning',
        'These features are under construction',
        'info'
      )
    },
    // Función para mostrar alertas
    $swal(text, err, typeIcon) {
      Swal.fire({
        title: text,
        text: err,
        icon: typeIcon,
        confirmButtonColor: '#3085d6',
      })
    },
  },
}

export default GlobalMixin
