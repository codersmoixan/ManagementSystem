<template>
  <div class="zj-role-list">
    <div class="zj-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="zj-base-container">
      <div class="zj-base-handle zj-role-handle clear-fix">
        <el-button type="primary" class="zj-role-add" @click="dialogFormVisible_add = true">添加角色</el-button>
      </div>
      <div class="zj-role-list">
        <div class="zj-list zj-base-lis-box">
          <el-table :data="roleData" style="width: 100%" border>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-row
                  :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter' ]"
                  v-for="(item1, i1) in props.row.children"
                  :key="item1.id"
                >
                  <el-col :span="5">
                    <el-tag closable class="tbmargin">{{item1.authName}}</el-tag>
                  </el-col>
                  <el-col :span="19">
                    <el-row
                      v-for="(item2, i2) in item1.children"
                      :key="i2"
                      :class="[ i2 === 0 ? ' ' : 'bdtop', 'vcenter' ]"
                    >
                      <el-col :span="5">
                        <el-tag closable type="success">{{item2.authName}}</el-tag>
                      </el-col>
                      <el-col :span="19">
                        <el-tag
                          closable
                          type="warning"
                          v-for="(item3, i3) in item2.children"
                          :key="i3"
                          :class="[ 'lfmargin' ]"
                          @close="deleteCurrentRole(props.row, item3.id)"
                        >{{item3.authName}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)" type="primary">
                  <i class="el-icon-edit"></i> 编辑
                </el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
                  <i class="el-icon-delete"></i> 删除
                </el-button>
                <el-button size="mini" type="warning" @click="handleSet(scope.row)">
                  <i class="el-icon-setting"></i> 分配权限
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="zj-edit-role">
        <el-dialog title="修改角色" :visible.sync="dialogFormVisible_edit" width="40%">
            <el-form :model="editRoleForm" :rules="rules">
                <el-form-item label="角色名称" label-width="120px" prop="username">
                    <el-input v-model="editRoleForm.role_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" label-width="120px" prop="email">
                    <el-input v-model="editRoleForm.role_desc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible_set = false">取 消</el-button>
                <el-button type="primary" @click="questEditRoleData">确 定</el-button>
            </div>
            
        </el-dialog>
    </div>
    <div class="zj-add-role">
        <el-dialog title="修改角色" :visible.sync="dialogFormVisible_add" width="40%">
            <el-form :model="addRoleParams" :rules="rules">
                <el-form-item label="角色名称" label-width="120px" prop="username">
                    <el-input v-model="addRoleParams.role_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" label-width="120px" prop="email">
                    <el-input v-model="addRoleParams.role_desc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible_add = false">取 消</el-button>
                <el-button type="primary" @click="questAddRoleData">确 定</el-button>
            </div>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoleListAll, 
deletePowerById, 
getRoleById, 
questEditRolesById,
deleteRolesById,
addRoleData } from "@/networks/power/power";

export default {
  name: "zj-role",
  data() {
    return {
      addRoleParams: {
          role_name: '',
          role_desc: ''
      }, // 添加角色信息参数  
      dialogFormVisible_add: false,
      roleData: [],
      editRoleForm: {
          rode_id: '',
          role_name: '',
          role_desc: ''
      }, // 修改权限信息
      dialogFormVisible_edit: false, // 修改权限信息界面开关
      rules: {
          role_name: [
              { required: true, message: '请输入角色名称', trigger: 'blur' }
          ],
          role_desc: [
              { required: true, message: '请输入角色描述', trigger: 'blur' }
          ]
      }
    };
  },
  mounted() {
    this._getRoleListAll();
  },
  methods: {
    async _getRoleListAll() {
      this.roleData = [];

      let res = await getRoleListAll();
      if (res.meta.status !== 200) return this.$message.warning(res.meta.msg);

      this.$message.success(res.meta.msg);
      this.roleData.push(...res.data);
    },
    /**添加角色信息 */
    async questAddRoleData() {
        let res = await addRoleData(this.addRoleParams) 
        if(res.meta.status !== 201) return this.$message.warning(res.meta.msg)
        
        // 添加成功
        this._getRoleListAll()
        this.dialogFormVisible_add = false
        this.$message.success(res.meta.msg)
    },    
    /**编辑当前角色信息 */
    async handleEdit(data) {
        this.dialogFormVisible_edit = true

        let editId = data.id
        let res = await getRoleById(editId)
        if(res.meta.status !== 200) return this.$message.warning(res.meta.msg)
        // 请求成功
        this.editRoleForm = {
            role_id: res.data.roleId,
            role_name: res.data.roleName,
            role_desc: res.data.roleDesc
        }
        

    },
    // 发送请求修改角色信息
    async questEditRoleData() {
        // 如果表单中的内容为空则提示用户输入正确信息
        let role_name_length = this.editRoleForm.role_name.trim().length
        let role_desc_length = this.editRoleForm.role_desc.trim().length

        if(!role_name_length && !role_desc_length) return this.$message.warning('请输入正确的信息！')

        let editId = this.editRoleForm.role_id
        let res = await questEditRolesById(editId)
        if(res.meta.status !== 200) return this.$message.warning(res.meta.msg)
        // 修改成功
        this._getRoleListAll()
        this.dialogFormVisible_edit = false
        this.$message.success(res.meta.msg)
    },
    /**删除当前角色信息 */
    handleDelete(data) {
        let deleteId = data.id
        this.$confirm('确认删除该角色信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deleteRolesById(deleteId).then(res => {
                if(res.meta.status !== 200) return this.$message.warning(res.meta.msg)
                // 删除成功
                this._getRoleListAll()
                this.$message.success(res.meta.msg)
            }, err => this.$message.warning('删除失败！'))
        }).catch(() => {
          this.$message.info('已取消删除')
        });
        

    },
    handleSet() {},
    /**删除当前权限 */
    deleteCurrentRole(role, id) {
      let rolesId = role.id;

      this.$confirm("确定删除该权限?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deletePowerById(rolesId, id).then(res => {
            if (res.meta.status !== 200) return this.$message.warning(res.meta.msg)
            // 删除成功
            role.children = res.data // 将返回的数据直接添加到需要展示的权限数据中
          }, err => this.$message.warning("删除失败"));
        })
        .catch(() => {
          this.$message.info("已取消删除")
        });
    },

  }
};
</script>

<style scoped lang="less">
.zj-role-list {
  .zj-role-handle {
    width: 100%;
    .zj-role-add {
      float: left;
    }
  }

  .bdbottom {
    border-bottom: 1px solid #ccc;
  }
  .bdtop {
    border-top: 1px solid #ccc;
  }
  .vcenter {
    display: flex;
    align-items: center;
    padding: 10px 0px;
  }
  .tbmargin {
    margin: 10px 0px;
  }
  .lfmargin {
    margin: 10px 10px;
  }
}
</style>