<template>
  <div id="app">
    <Header />
    <Banner />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Banner from './pages/inicio/Banner.vue'
import About from './pages/inicio/About.vue'
import Themes from './pages/inicio/Themes.vue'
import Donation from './pages/inicio/Donation.vue'
import Partner from './pages/inicio/Partner.vue'
import Volunteer from './pages/inicio/Volunteer.vue'
import Location from './pages/inicio/Location.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header,
    Banner,
    About,
    Themes,
    Donation,
    Partner,
    Volunteer,
    Location,
    Footer
  }
}
</script>

<style>
#app{
  margin: 0%;
  padding: 0%;
  box-sizing: border-box;
  background-color: aliceblue;
  width: auto;
  
}

p, h3, h2, h1{
  color: black;
}
</style>
