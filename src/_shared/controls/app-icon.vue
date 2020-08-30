<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CreateElement, VNode } from 'vue';

import IconDelete from '../../_assets/icons/icon-delete.vue';

@Component({
  components: {
    'icon-delete': IconDelete,
  },
})
export default class AppIcon extends Vue {
  @Prop() name!: string;

  /**
   * List of components to get text name for comparing
   */
  public componentsObj: any = this.$options.components;

  /**
   * Create span and <icon-***> component in span
   * params: elementName, options(class, etc), childrenElements
   * @param create - default callback for `render` function in vue.
   */
  public render(create: CreateElement): VNode {
    const iconName = this.generateIconName();
    return create('span', { class: `icon ${iconName}` }, [create(iconName)]);
  }

  public generateIconName(): any {
    const componentKeys = Object.keys(this.componentsObj);
    const componentName = `icon-${this.name}`;
    return componentKeys.includes(componentName) ? componentName : '';
  }
}
</script>

<style lang="sass" scoped>
.icon
  display: inline-flex
  vertical-align: middle
  justify-content: center
  align-items: center
  > svg
    height: 100%
/*
  Example of styling in nested components
  .icon/deep/ */
</style>
