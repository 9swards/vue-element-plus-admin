<script>
import { h } from 'vue'

const MenuItem = (props, context) => {
  const { icon, title } = props
  return h('div', context.attrs,
    [
      icon.includes('el-icon') ? <i className={[icon, 'sub-el-icon']}/> : <svg-icon icon-class={icon}/>,
      title ? <span slot='title'>{(title)}</span> : ''
    ]
  )
}

MenuItem.props = ['icon', 'title']

export default MenuItem
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
