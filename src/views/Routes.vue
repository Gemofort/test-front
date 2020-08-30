<template>
  <div class="routes-wrapper">
    <nav>
      <p class="header-nav">
        <router-link tag="a" to="/">
          Cars
        </router-link>
      </p>
      <p class="header-nav active">
        <router-link tag="a" to="/routes">
          Routes
        </router-link>
      </p>
    </nav>
    <div class="main-box">
      <div class="search-header">
        <app-input
          class="is-marginless"
          v-model="searchPattern.departure"
          @input="searchRoutes()"
        >Departure</app-input>
        <app-input
          class="is-marginless"
          v-model="searchPattern.arrival"
          @input="searchRoutes()"
        >Arrival</app-input>
        <app-select
          class="is-marginless"
          :options="typeOptions"
          v-model="searchPattern.type"
          @input="searchRoutes()"
        >Type</app-select>
        <app-select
          class="is-marginless"
          :options="statusOptions"
          v-model="searchPattern.status"
          @input="searchRoutes()"
        >Status</app-select>

        <router-link
          tag="a"
          to='/routes/create-route'
          class="btn-black"
        >
          Add route
        </router-link>
      </div>

      <div class="routes">
        <div class="route-instance-wrapper" v-for="(route, i) in routes" :key="i">
          <router-link
            tag="a"
            :to='`/routes/${route._id}`'
            class="route"
          >
            <p class="route-column-count title">{{i + 1}}.</p>
            <p class="route-column title">Model: {{ route.departure }}</p>
            <p class="route-column title">Model: {{ route.arrival }}</p>
            <p class="route-column title">Type: {{ route.type }}</p>
            <p class="route-column title">Status: {{ route.status }}</p>
          </router-link>
          <span @click="deleteRoute(route._id, i)" class="delete-icon">
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
export default class Routes extends Vue {
  public routes = [];

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
    { id: 'done', name: 'Done' },
    { id: 'pending', name: 'Pending' },
    { id: 'free', name: 'Free' },
  ];

  public searchPattern: SearchPattern = {
    departure: '',
    status: '',
    type: '',
    arrival: '',
  };

  public mounted() {
    this.getRoutes();
  }

  public getRoutes() {
    http.get('/routes').then((res: any) => {
      this.routes = res.routes;
    });
  }

  public deleteRoute(id: any, index: number) {
    http.delete(`/routes/${id}`).then(() => {
      console.info(`${id} deleted`);
      this.routes.splice(index, 1);
    });
  }

  public searchRoutes() {
    const req: any = {};

    Object.entries(this.searchPattern).forEach(([key, value]) => {
      if (value.length) {
        req[key] = value;
      }
    });

    const query = qs.stringify(req);

    http.get(query.length ? `/routes?${query}` : '/routes').then((res: any) => {
      this.routes = res.routes;
    });
  }
}

type SearchPattern = {
  departure: string;
  arrival: string;
  status: string;
  type: string;
};

</script>

<style lang="sass">
@import "../_sass/variables"
.routes-wrapper
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
    width: 75px
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

.routes
  overflow: auto
  max-height: 450px

.route
  display: flex
  flex-direction: row
  justify-content: flex-start
  align-items: center
  height: 100%

.route-instance-wrapper
  width: 100%
  display: flex
  justify-content: flex-start
  height: 40px
  margin-top: 10px
  margin-bottom: 10px
  align-items: center
  &:hover
    box-shadow: 0 0 2px rgba(0,0,0,0.5)

.route-column
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
