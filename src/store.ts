import Vue from 'vue';
import Vuex, {
  // ActionContext, ActionTree, GetterTree, MutationTree, Store,
  GetterTree, MutationTree, Store,
} from 'vuex';

const debug: boolean = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

function backUpState(state: any) {
  localStorage.setItem('state', JSON.stringify(state));
}

class State {
  public cars: ICartDish[];

  constructor() {
    const state: any = JSON.parse(localStorage.getItem('state') || '{}');
    this.cars = (state && state.cars) || [];
  }
}

const getters: GetterTree<State, State> = {
  cars(state: State) {
    return state.cars;
  },
};

const mutations: MutationTree<State> = {
  addCar(state, car) {
    state.cars.push(car);
    backUpState(state);
  },
};

export interface ICartDish {
  id: number;
  name: string;
  description: string;
  photo: string;
  price: number;
  amount: number;
  newPrice?: number;
  modificators?: { name: string; id: number; price: number }[];
}

export default new Store<State>({
  state: new State(),
  mutations,
  // actions,
  getters,
  strict: debug,
});
