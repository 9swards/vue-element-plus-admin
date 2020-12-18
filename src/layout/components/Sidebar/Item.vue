<script>
import { h } from 'vue'

const SidebarMenuItem = (props, context) => {
  const { icon, title } = props
  return h('span', context.attrs,
    [
      icon.includes('el-icon') ? <i className={[icon, 'sub-el-icon']}/> : <svg-icon icon-class={icon}/>,
      title ? <span slot='title'>{(title)}</span> : ''
    ]
  )
}

SidebarMenuItem.props = ['icon', 'title']

export default SidebarMenuItem
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
