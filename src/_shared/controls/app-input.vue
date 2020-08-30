<template>
  <div class="app-input">
    <label class="label">
      <slot />
    </label>

    <input
      class="input"
      ref="field"
      :readonly="readonly"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="dataUpdate()"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class AppInput extends Vue {
  @Prop() settings: object | undefined;

  @Prop() value: any;

  @Prop() rules: any;

  @Prop() name: any;

  @Prop() type: any;

  @Prop() placeholder: any;

  @Prop() readonly: any;

  public dataUpdate() {
    this.$emit('input', (this.$refs.field as Vue & { value: () => string }).value);
  }
}
</script>

<style lang="sass" scoped>
@import "@/_sass/variables"
.app-input
  margin-bottom: 20px
  &.is-marginless
    margin: 0

.input
  border: 1px solid #C4C4C4
  display: block
  width: 100%
  &::placeholder
    font-family: $Montserrat
    font-style: italic
    font-weight: normal
    font-size: 14px
    line-height: 150%
  &[readonly]
    background-color: $gray
    &:hover
      cursor: not-allowed

.label
  margin-bottom: 10px
.error
  display: block
  font-size: 12px
  margin-top: 5px
  color: $red

.label
  font-family: $Montserrat
  font-style: normal
  font-weight: 600
  font-size: 15px
  color: $dark
  line-height: 120%
  margin-bottom: 10px
</style>
