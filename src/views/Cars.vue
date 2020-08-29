<template>
  <div class="cars-wrapper">
    <h1>Cars:</h1>
    <div class="main-box">
      <div class="search-header">
        <p>numberplate</p>
        <p>numberplate</p>
        <p>numberplate</p>
        <p>numberplate</p>
      </div>

      <div class="cars">
        <div class="car-wrapper" v-for="(car, i) in cars" :key="i">
          <div class="car"></div>
          {{ car }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import http from '@/utils/http';

@Component({})
export default class Cars extends Vue {
  public cars = [];

  public mounted() {
    this.getCars();
  }

  public getCars() {
    http.get('/cars').then((res: any) => {
      this.cars = res.cars;
    });
  }
}
</script>

<style scoped lang="sass">
@import "../_sass/variables"
.cars-wrapper
  height: 100wh
  width: 100%
  display: flex
  align-items: center
  flex-direction: column

  h1
    margin-top: 50px
    margin-bottom: 50px
    font-size: 35px
    font-family: $Montserrat

.main-box
  width: 70%
  min-width: 700px
  display: flex
  flex-direction: column
  background: $gray
  height: 100%
  min-height: 500px

</style>
