<template>
  <div class="cars-wrapper">
    <nav>
      <p class="header-nav active">
        <router-link tag="a" to="/">
          Cars
        </router-link>
      </p>
      <p class="header-nav">
        <router-link tag="a" to="/routes">
          Routes
        </router-link>
      </p>
    </nav>
    <div class="main-box">
      <div class="search-header">
        <app-input
          class="is-marginless"
          v-model="searchPattern.modelType"
          @input="searchCars()"
        >Model</app-input>
        <app-select
          class="is-marginless"
          :options="typeOptions"
          v-model="searchPattern.type"
          @input="searchCars()"
        >Type</app-select>
        <app-select
          class="is-marginless"
          :options="statusOptions"
          v-model="searchPattern.status"
          @input="searchCars()"
        >Status</app-select>
        <app-input
          class="is-marginless"
          v-model="searchPattern.numberPlate"
          @input="searchCars()"
        >Number Plate</app-input>

        <router-link
          tag="a"
          to='/cars/create-car'
          class="btn-black"
        >
          Add car
        </router-link>
      </div>

      <div class="cars">
        <div class="car-instance-wrapper" v-for="(car, i) in cars" :key="i">
          <router-link
            tag="a"
            :to='`/cars/${car._id}`'
            class="car"
          >
            <p class="car-column-count title">{{i + 1}}.</p>
            <p class="car-column title">Model: {{ car.modelType }}</p>
            <p class="car-column title">Type: {{ car.type }}</p>
            <p class="car-column title">Status: {{ car.status }}</p>
            <p class="car-column numberplate title">Number Plate: {{ car.numberPlate }}</p>
            <p class="car-column title">Mileage: {{ car.mileage }} km</p>
          </router-link>
          <span @click="deleteCar(car._id, i)" class="delete-icon">
            <app-icon name="delete" ></app-icon>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import http from '@/utils/http';
import * as qs from 'qs';

@Component({})
export default class Cars extends Vue {
  public cars = [];

  // [sedan, coupe, minivan, hatchback, truck, pickup truck, crossover]

  public typeOptions = [
    { id: '', name: 'All' },
    { id: 'sedan', name: 'Sedan' },
    { id: 'coupe', name: 'Coupe' },
    { id: 'minivan', name: 'Minivan' },
    { id: 'hatchback', name: 'Hatchback' },
    { id: 'truck', name: 'Truck' },
    { id: 'pickup truck', name: 'Pickup truck' },
    { id: 'crossover', name: 'Crossover' },
  ];

  public statusOptions = [
    { id: '', name: 'All' },
    { id: 'free', name: 'Free' },
    { id: 'unavailable', name: 'Unavailable' },
  ];

  public searchPattern: SearchPattern = {
    numberPlate: '',
    status: '',
    type: '',
    modelType: '',
  }

  public mounted() {
    this.getCars();
  }

  public getCars() {
    http.get('/cars').then((res: any) => {
      this.cars = res.cars;
    });
  }

  public deleteCar(id: any, index: number) {
    http.delete(`/cars/${id}`).then(() => {
      console.info(`${id} deleted`);
      this.cars.splice(index, 1);
    });
  }

  public searchCars() {
    const req: any = {};

    Object.entries(this.searchPattern).forEach(([key, value]) => {
      if (value.length) {
        req[key] = value;
      }
    });

    const query = qs.stringify(req);

    http.get(query.length ? `/cars?${query}` : '/cars').then((res: any) => {
      this.cars = res.cars;
    });
  }
}

type SearchPattern = {
  numberPlate: string;
  status: string;
  type: string;
  modelType: string;
};

</script>

<style lang="sass">
@import "../_sass/variables"
.cars-wrapper
  height: 100wh
  width: 100%
  display: flex
  align-items: center
  flex-direction: column

nav
  display: flex
  flex-direction: row

  .header-nav
    margin-top: 50px
    margin-bottom: 50px
    margin-left: 30px
    font-size: 35px
    font-family: $Montserrat
    border-bottom: 1px solid transparent
    &.active
      border-bottom: 1px solid $black

.main-box
  width: 70%
  min-width: 700px
  display: flex
  flex-direction: column
  background: $gray
  height: 100%
  min-height: 500px
  border-radius: 5px

.title
  font-size: 15px
  font-family: $Montserrat

.search-header
  width: 100%
  height: 70px
  border: 1px solid $black
  display: flex
  justify-content: space-around
  align-items: center
  border-radius: 5px 5px 0px 0px
  background: $lightgray
  .btn-black
    width: 65px
    height: 40px
    background: $black
    color: $white
    font-family: $Montserrat
    font-size: 13px
    border-radius: 5px
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer

.cars
  overflow: auto
  max-height: 450px

.car
  display: flex
  flex-direction: row
  justify-content: flex-start
  align-items: center
  height: 100%

.car-instance-wrapper
  width: 100%
  display: flex
  justify-content: flex-start
  height: 40px
  margin-top: 10px
  margin-bottom: 10px
  align-items: center
  &:hover
    box-shadow: 0 0 2px rgba(0,0,0,0.5)

.car-column
  width: 150px
  margin-left: 5px
  &-count
    width: 20px
    margin-left: 20px

.numberplate
  width: 250px

.delete-icon
  z-index: 1
</style>
