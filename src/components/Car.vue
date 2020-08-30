<template>
  <div class="cars-wrapper">
    <router-link tag="a" to='/' class="btn-black">Go back</router-link>
    <h1>Cars</h1>
    <div class="car">
      <app-input
        class="car-field"
        :readonly="true"
        v-model="car._id"
      >ID:</app-input>
      <app-input
        @input="changeState"
        class="car-field"
        v-model="car.numberPlate"
      >Number Plate:</app-input>
      <app-input @input="changeState" class="car-field" v-model="car.modelType">Model:</app-input>
      <app-select
        :options="typeOptions"
        v-model="car.type"
        class="car-field"
        :selectTitle="car.type"
        @input="changeState"
      >Type</app-select>
      <app-input class="car-field" :readonly="true" v-model="car.status">Status:</app-input>
      <app-input class="car-field" @input="changeState" v-model="car.mileage">Mileage:</app-input>
      <app-input
        v-if="this.carId !== 'create-car'"
        class="car-field"
        :readonly="true"
        v-model="car.soldAt"
      >Sold:</app-input>
      <div class="car-field" v-else>
        <p>Sold:</p>
        <datepicker placeholder="Select Date" class="input-date" v-model="car.soldAt"></datepicker>
      </div>
      <span @click="save(car)" class="btn-black">{{state}}</span>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import Datepicker from 'vuejs-datepicker';
import http from '@/utils/http';

@Component({
  components: {
    Datepicker,
  },
})
export default class Car extends Vue {
  public car: ICar = {
    _id: '',
    numberPlate: '',
    modelType: '',
    type: '',
    status: '',
    mileage: '',
    soldAt: '',
  };

  public state = 'Save';

  public typeOptions = [
    { id: 'sedan', name: 'Sedan' },
    { id: 'coupe', name: 'Coupe' },
    { id: 'minivan', name: 'Minivan' },
    { id: 'hatchback', name: 'Hatchback' },
    { id: 'truck', name: 'Truck' },
    { id: 'pickup truck', name: 'Pickup truck' },
    { id: 'crossover', name: 'Crossover' },
  ];

  public statusOptions = [
    { id: 'free', name: 'Free' },
    { id: 'unavailable', name: 'Unavailable' },
  ];

  public mounted() {
    if (this.carId !== 'create-car') {
      this.getCar();
    }
  }

  get carId() {
    return this.$route.params.id;
  }

  public changeState() {
    this.state = 'Save';
  }

  public save() {
    const carReq = { ...this.car };
    // eslint-disable-next-line no-underscore-dangle
    delete carReq._id;
    delete carReq.status;
    if (this.carId !== 'create-car') {
      http.put(`/cars/${this.carId}`, { ...carReq }).then(() => {
        this.state = 'Saved';
      });
    } else {
      http.post('/cars', { ...carReq }).then((res: any) => {
        // eslint-disable-next-line no-underscore-dangle
        this.car._id = res._id;
        this.car.status = res.status;
        this.car.soldAt = res.soldAt;
        // eslint-disable-next-line no-underscore-dangle
        this.$router.push(`/cars/${res._id}`);
        this.$router.go(0);
      });
    }
  }

  public getCar() {
    http.get(`/cars/${this.carId}`).then((res: any) => {
      this.car = res;
    });
  }
}

interface ICar {
  _id: string;
  numberPlate: string;
  modelType: string;
  type: string;
  status: string;
  mileage: string;
  soldAt: string;
}
</script>

<style scoped lang="sass">
@import "../_sass/variables"
.car
  width: 100%
  max-width: 500px
  height: 100%
  display: flex
  flex-direction: column
  align-items: center
  justify-content: space-around

h1
  font-family: $Montserrat
  font-size: 30px

.btn-black
  width: 100px
  height: 50px
  background: $black
  color: $white
  font-family: $Montserrat
  font-size: 20px
  border-radius: 5px
  margin-top: 20px
  margin-bottom: 20px
  display: flex
  justify-content: center
  align-items: center
  cursor: pointer

.car-field
  margin-top: 20px
  width: 100%
  max-width: 260px
  p
    font-family: $Montserrat
    font-style: normal
    font-weight: 600
    font-size: 15px
    color: $dark
    line-height: 120%
    margin-bottom: 10px

input,
select
  padding: 0.75em 0.5em
  font-size: 100%
  border: 1px solid #ccc
  width: 100%

  // border: 1px solid #C4C4C4
  // display: block
  // width: 100%
  // &::placeholder
  //   font-family: $Montserrat
  //   font-style: italic
  //   font-weight: normal
  //   font-size: 14px
  //   line-height: 150%
</style>
