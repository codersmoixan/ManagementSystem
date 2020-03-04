<template>
  <div class="zj-list-container">
    <div class="zj-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="zj-user-list zj-base-container">
      <div class="zj-handle zj-base-handle">
        <div class="zj-search-input">
          <el-input placeholder="请输入内容" v-model="searchData.query" class="zj-input">
            <template slot="append">
              <el-button type="primary" @click="queryUser">
                <i class="el-icon-search"></i>
              </el-button>
            </template>
          </el-input>
        </div>
        <div class="zj-search-btn">
          <el-button type="primary" @click="dialogFormVisible  = true">添加用户</el-button>
        </div>
      </div>
      <div class="zj-user-table-list clear-fix zj-base-lis-box">
        <el-table :data="userList" border stripe style="width: 100%">
          <el-table-column type="index" width="50" label="#" fixed="left"></el-table-column>
          <el-table-column prop="username" label="姓名" width="200"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
          <el-table-column prop="mobile" label="电话" width="200"></el-table-column>
          <el-table-column prop="role_name" label="角色" width="200"></el-table-column>
          <el-table-column prop="mg_state" label="状态" width="200"></el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                @click="handleEdit(scope.row)"
                type="primary"
                icon="el-icon-edit"
                size="mini"
              ></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.row)"></el-button>
              <el-tooltip class="item" effect="dark" content="分配角色" placement="top-end"> 
                <el-button type="warning" icon="el-icon-setting" size="mini" @click="handleSet(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <pagination :pageParams="pageParams" class="zj-page" 
        @queryPageSize="queryPageUserData" @queryCurrentPage="queryCurrentPage" />
      </div>
    </div>
    <div class="zj-add-user">
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="40%">
        <el-form :model="addDataForm" :rules="rules">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
            <el-input v-model="addDataForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="addDataForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="addDataForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="addDataForm.phone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="questAddUserData">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="zj-edit-user">
      <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible_edit" width="40%">
        <el-form :model="editDataForm" :rules="rules">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
            <el-input v-model="editDataForm.username" autocomplete="off" disabled=""></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="editDataForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="editDataForm.phone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible_edit = false">取 消</el-button>
          <el-button type="primary" @click="questEditUserData">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="zj-set-user">
      <el-dialog title="分配角色" :visible.sync="dialogFormVisible_set" width="40%">
        <el-form :model="setDataForm" :rules="rules">
          <el-form-item label="当前用户名" :label-width="formLabelWidth" prop="username">
            <el-input v-model="setDataForm.username" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="当前角色" :label-width="formLabelWidth" prop="email">
            <el-input v-model="setDataForm.current_role_name" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="分配新角色" :label-width="formLabelWidth" prop="phone">
            <el-select v-model="setDataForm.rolenameId" placeholder="请选择角色" class="zj-setuserrole-input">
              <el-option :label="item.roleName" :value="item.id" v-for="item in rolenames" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible_set = false">取 消</el-button>
          <el-button type="primary" @click="questSetUserData">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getUserDataAll, 
addUserData, 
editUserData,
deleteUserData,
queryUserData,
getUserRoleList,
setUserRole } from "@/networks/user/user";

import Pagination from "@/components/common/Pagination";

export default {
  name: "PersonnelList",
  data() {
    return {
      searchData: {
        query: '',
        pagenum: '',
        pagesize: ''
      },
      userList: [],
      questParams: { query: "", pagenum: 1, pagesize: 10 },
      pageParams: {
        current_page: 4,
        page_sizes: [10, 15, 20],
        page_size: 100,
        total: 400
      }, 
      dialogFormVisible: false, // 控制dialog显示与隐藏
      addDataForm: {
        username: '',
        password: '',
        email: '',
        phone: ''
      }, // 添加用户信息
      formLabelWidth: '120px',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ]
      }, // 表达验证规则
      editDataForm: {
        username: '',
        email: '',
        phone: ''
      }, // 编辑用户信息
      dialogFormVisible_edit: false,
      questEditData: {}, // 提交修改的数据
      dialogFormVisible_set: false,
      setDataForm: {
        username: '',
        current_role_name: '',
        rolenameId: []
      },
      rolenames: [], // 角色列表
    };
  },
  mounted() {
    this._getUserDataAll();
  },
  components: {
    pagination: Pagination
  },
  methods: {
    /**获取所有用户列表 */
    async _getUserDataAll() {
      this.userList = [];
      const { data, meta } = await getUserDataAll(this.questParams);
      if (meta.status === 200) {
        this.$message.success(meta.msg);
        let list = data.users;
        this.userList.push(...list);

        this.pageParams.total = data.total;
        this.pageParams.current_page = data.pagenum;
      }
    },
    /**添加用户 */
    async questAddUserData() {
      let questFlag = true;
      // 遍历添加对象中的内容是否为空，为空时不添加数据
      for(let item in this.addDataForm) {
        if(!this.addDataForm[item]) {
          questFlag = false
        }
      }
      if(!questFlag) return this.$message.warning('请输入正确的信息！')
      
      // 发送请求添加用户信息
      let res = await addUserData(this.addDataForm)
      if(res.meta.status === 201) {
        this._getUserDataAll()
        this.$message.success('创建成功！')
        this.dialogFormVisible = false // 关闭dialog
      }else {
        this.$message.warning('创建失败！')
      }
    },
    /**编辑用户信息 */
    handleEdit(data) {
      this.editDataForm.id = data.id
      this.editDataForm.username = data.username
      this.editDataForm.email = data.email
      this.editDataForm.phone = data.mobile

      // 打开编辑界面
      this.dialogFormVisible_edit = true
    },
    async questEditUserData() {
      // 判断是否填入信息
      if(!this.editDataForm.phone && !this.editDataForm.email) {
        return this.$message.warning('请输入正确的信息！')
      }

      let questEditData = {
        id: this.editDataForm.id,
        email: this.editDataForm.email,
        phone: this.editDataForm.phone
      }
      // 发送请求修改信息
      let res = await editUserData(this.editDataForm)
      if(res.meta.status !== 200) {
        return this.$message.warning(res.meta.msg)
      }
      // 更新成功
      this.dialogFormVisible_edit = false // 关闭编辑信息界面
      this._getUserDataAll() // 重新渲染页面
      this.$message.success(res.meta.msg)

    },
    /**删除用户信息 */
    handleDelete(data) {
      let deleteId = data.id
      
       this.$confirm('确定删除该用户信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUserData(deleteId).then(res => {
            if(res.meta.status !== 200) {
              return this.$message.warning(res.meta.msg)
            }

            // 删除成功
            this._getUserDataAll() // 重新渲染页面
            this.$message.success(res.meta.msg)
            
          })
        }).catch(() => {
          this.$message.info('已取消删除')  
        }); 
    },
    /**分配角色信息 */
    // 获取所有角色信息列表
    async handleSet(data) {
      this.rolenames = []
      this.dialogFormVisible_set = true
      
      this.setDataForm.username = data.username
      this.setDataForm.current_role_name = data.role_name
      
      // 发送请求获取所有的角色列表
      let res = await getUserRoleList()
      if(res.meta.status !== 200) return this.$message.warning(res.meta.msg)
      this.rolenames.push(...res.data)
    },
    // 提交修改后的角色信息
    async questSetUserData(){
      // 判断用户是否选择了角色
      if(!this.setDataForm.rolenameId) return this.$message.warning('请选择要分配的角色！')

      let id = this.setDataForm.rolenameId
      let res = await setUserRole(id)
      console.log(res)
      if(res.meta.status !== 200) return this.$message.warning(res.meta.msg)
      this._getUserDataAll()
      this.dialogFormVisible_set = false
      this.$message.success(res.meta.msg)
    },
    /**查询用户信息 */
    async queryUser() {
      this.searchData.pagenum = this.questParams.pagenum
      this.searchData.pagesize = this.questParams.pagesize

      let res = await queryUserData(this.searchData)
      console.log(res)
      if(res.meta.status !== 200) return this.$message.warning(res.meta.msg)

      // 请求成功
      this.userList = []
      this.userList.push(...res.data.users)
      this.pageParams.total = res.data.total
      this.pageParams.current_page = res.data.pagenum
      this.$message.success(res.meta.msg)
    },
    /**分页显示用户信息 */
    queryPageUserData(index) {
      this.questParams.pagesize = index
      this._getUserDataAll()
    },
    /**切换分页 */
    queryCurrentPage(index) {
      this.questParams.pagenum = index
      this._getUserDataAll()
    }
  }
};
</script>

<style scoped lang="less">
.zj-list-container {
  .zj-user-list {

    .zj-handle {
      display: flex;
      width: 35%;
      .zj-search-input {
        width: 100%;
        .zj-input {
          width: 100%;
        }
      }

      .zj-search-btn {
        margin-left: 20px;
      }
    }
  }
  .zj-page {
    margin-top: 20px;
    float: left;
  }

  .zj-setuserrole-input {
    margin: 0;
    float: left;
  }
}
</style>