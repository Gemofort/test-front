<template>
  <div class="cars-wrapper">
    <div class="cars">
      <div class="car" v-for="(car, i) in cars" :key="i">
        {{ car }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import http from '@/utils/http';

@Component({})
export default class Car extends Vue {
  public cars = [];

  public mounted() {
    this.getCars();
  }

  get carId() {
    return this.$route.params.id;
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

  h1
    font-size: 35px
    font-family: $Montserrat
</style>
