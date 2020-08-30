<template>
  <div class="">
    <label class="label">
      <slot />
    </label>
    <div class="select">
      <select v-model="selectedValue" @change="selectUpdate()">
        <option value="" selected>{{ selectTitle }}</option>
        <option v-for="(o, index) of options" :key="`option-${index}`" :value="o[optionValue]">
          {{ o[optionName] }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';

@Component({})
export default class AppSelect extends Vue {
  @Prop() options: any;

  @Prop({
    default: 'id',
  })

  optionValue!: string;

  @Prop({
    default: 'name',
  })
  optionName!: string;

  @Prop({
    default: 'All',
  })
  selectTitle!: string;

  @Prop() value!: any;

  public selectedValue = '';

  public selectUpdate() {
    this.$emit('input', this.selectedValue);
  }

  mounted() {
    this.setValue();
  }

  @Watch('value')
  public setValue() {
    this.selectedValue = this.value || '';
  }
}
</script>

<style lang="sass" scoped>
@import "@/_sass/variables"
.select
  padding: 0
  margin: 0
  border: 1px solid #C4C4C4
  position: relative
  overflow: hidden
  background: #ffffff
  background-size: 25%
  cursor: pointer
  text-align: center
  display: block
  width: 100%
  max-width: 260px
  height: 25px
  // line-height: 40px
  border-radius: 6px
  outline: 0
  &:after
    content: ''
    position: absolute
    top: 50%
    transform: translateY(-50%)
    right: 15px
    width: 0
    height: 0
    border-style: solid
    border-width: 8px 6px 0 6px
    border-color: $gray transparent transparent transparent
  select
    padding: 0  40px 0 20px
    cursor: pointer
    width: 256px
    height: 25px
    outline: none
    font-family: $Montserrat
    font-style: normal
    font-weight: normal
    font-size: 14px
    line-height: 150%
    color: #030208
    border: none
    box-shadow: none
    background-color: transparent
    background-image: none
    -webkit-appearance: none
    -moz-appearance: none
    appearance: none
    &:focus
      outline: none

.label
  font-family: $Montserrat
  font-style: normal
  font-weight: 600
  font-size: 15px
  color: $dark
  line-height: 120%
  margin-bottom: 10px
</style>
