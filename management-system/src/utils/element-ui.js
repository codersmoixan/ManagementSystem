import Vue from 'vue'

import { 
    Button, 
    Select,
    Form,
    Message,
    MessageBox,
    Menu,
    Row,
    Submenu,
    MenuItem,
    Col,
    MenuItemGroup,
    Container,
    Header,
    Aside,
    Main,
    Breadcrumb,
    BreadcrumbItem,
    Input,
    TableColumn,
    Table,
    Pagination,
    Tooltip,
    Dialog,
    FormItem,
    Option,
    Tag
  } from 'element-ui'
  
  Vue.use(Button)
  Vue.use(Select)
  Vue.use(Form)
  Vue.use(Menu)
  Vue.use(Row)
  Vue.use(Submenu)
  Vue.use(MenuItem)
  Vue.use(Col)
  Vue.use(MenuItemGroup)
  Vue.use(Container)
  Vue.use(Header)
  Vue.use(Aside)
  Vue.use(Main)
  Vue.use(Breadcrumb)
  Vue.use(BreadcrumbItem)
  Vue.use(Input)
  Vue.use(TableColumn)
  Vue.use(Table)
  Vue.use(Pagination)
  Vue.use(Tooltip)
  Vue.use(Dialog)
  Vue.use(FormItem)
  Vue.use(Option)
  Vue.use(Tag)
  
  
  
  
  Vue.prototype.$message = Message
  Vue.prototype.$confirm = MessageBox
  Vue.prototype.$ELEMENT = { size: 'small' }