<template>
  <div class="cars-wrapper">
    <router-link tag="a" to='/' class="btn-black">Go back</router-link>
    <h1>Route</h1>
    <div class="car">
      <app-input
        class="car-field"
        :readonly="true"
        v-model="route._id"
      >ID:</app-input>
      <app-input
        @input="changeState"
        class="car-field"
        v-model="route.departure"
      >Departure:</app-input>
      <app-input
        @input="changeState"
        class="car-field"
        v-model="route.arrival"
      >Arrival:</app-input>
      <!-- <app-input @input="changeState"
      class="car-field" v-model="route.modelType">Model:</app-input> -->
      <app-select
        :options="typeOptions"
        v-model="route.type"
        class="car-field"
        :selectTitle="route.type"
        @input="changeState"
      >Type</app-select>
      <app-select
        :options="this.cars"
        v-if="!route.car && routeId !== 'create-route'"
        v-model="route.car"
        class="car-field"
        selectTitle=""
        @input="changeState"
      >Car</app-select>
      <app-input
        v-else
        class="car-field"
        :readonly="true"
        v-model="route.car.modelType"
      >Car</app-input>
      <app-input class="car-field" :readonly="true" v-model="route.status">Status:</app-input>
      <app-input
        class="car-field"
        v-if="route.startedAt"
        :readonly="true"
        v-model="route.startedAt"
      >Started at:</app-input>
      <app-input
        class="car-field"
        v-if="route.deliveredAt"
        :readonly="true"
        v-model="route.deliveredAt"
      >Delivered at:</app-input>
      <app-input
        class="car-field"
        @input="changeState"
        v-model="route.distance"
      >Distance:</app-input>
      <app-input class="car-field" :readonly="true" v-model="route.earnings">Earnings:</app-input>
      <!-- <app-input class="car-field" :readonly="true" v-model="car.soldAt">Sold:</app-input> -->
      <span @click="save(route)" class="btn-black">{{state}}</span>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import http from '@/utils/http';

@Component({})
export default class Route extends Vue {
  public route: IRoute = {
    _id: '',
    departure: '',
    arrival: '',
    distance: 0,
    type: '',
    status: '',
    startedAt: null,
    deliveredAt: null,
    earnings: 0,
    car: '',
  };

  public cars = [];

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
    this.getRoute();
    this.getAvailableCars();
  }

  get routeId() {
    return this.$route.params.id;
  }

  public getAvailableCars() {
    if (this.routeId !== 'create-route') {
      http.get(`/routes/${this.routeId}/cars`).then((res: any) => {
        // eslint-disable-next-line no-underscore-dangle
        this.cars = res.cars.map((car: any) => ({ id: car._id, name: car.modelType }));
      });
    }
  }

  public changeState() {
    this.state = 'Save';
  }

  public save() {
    const routeReq = { ...this.route };
    // eslint-disable-next-line no-underscore-dangle
    delete routeReq._id;
    delete routeReq.startedAt;
    delete routeReq.deliveredAt;
    delete routeReq.car;
    delete routeReq.earnings;
    delete routeReq.status;

    if (this.routeId !== 'create-route') {
      http.put(`/routes/${this.routeId}`, { ...routeReq }).then(() => {
        this.state = 'Saved';
      });
    } else {
      http.post('/routes', { ...routeReq }).then((res: any) => {
        // eslint-disable-next-line no-underscore-dangle
        this.route._id = res._id;
        this.route.status = res.status;
        this.route.earnings = 0;
        // eslint-disable-next-line no-underscore-dangle
        this.$router.push(`/routes/${res._id}`);
        this.$router.go(0);
      });
    }
  }

  public getRoute() {
    if (this.routeId !== 'create-route') {
      http.get(`/routes/${this.routeId}`).then((res: any) => {
        this.route = res;
      });
    }
  }
}

interface IRoute {
  _id: string;
  departure: string;
  arrival: string;
  distance: number;
  earnings: number;
  type: string;
  status: string;
  startedAt: Date | null;
  deliveredAt: Date | null;
  car: string;
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
</style>
