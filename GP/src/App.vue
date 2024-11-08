<template>
  <div id="app">
    <Header />
    <Banner />
    <About />
    <Themes />
    <Donation />
    <Partner />
    <Volunteer />
    <Location />
    <Footer />
    <VolunteerForm />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Banner from './components/Banner.vue'
import About from './components/About.vue'
import Themes from './components/Themes.vue'
import Donation from './components/Donation.vue'
import Partner from './components/Partner.vue'
import Volunteer from './components/Volunteer.vue'
import Location from './components/Location.vue'
import Footer from './components/Footer.vue'
import VolunteerForm from './components/VolunteerForm.vue'

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
    Footer,
    VolunteerForm
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
