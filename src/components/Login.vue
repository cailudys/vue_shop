<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <!-- label-width="0px"用于设置element-ui中输入框label的长度，是配合 el-form-item中的label属性一起使用的-->
      <!-- :model="loginForm"用于绑定行为中data的form项中的数据 -->
      <!-- :rules="loginFormRules" 用于绑定行为中data里规则名为loginFormRules的规则 -->
      <!-- ref属性 简单记ref属性用来定义键，从而让我们有办法获取当前form组件对象。-->
      <el-form
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!-- 用户名部件 -->
        <!-- el-form-item中的prop属性用于指向具体的规则 -->
        <el-form-item prop="username" label="">
          <!-- 用element-ui中的prefix-icon用于添加图标！-->
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码部件 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮部件 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 暴露它下面的配置对象，暴露之后就相当于在此vue组件上直接添加了属性！使用this.longinForm就可以直接得到对应的数据对象。
export default {
  // 私有数据
  data() {
    // 使用return包裹后数据中变量只在当前组件中生效，不会影响其他组件。为何在大型项目中data需要使用return返回数据呢？不使用return包裹的数据会在项目的全局可见，会造成变量污染
    return {
      // loginForm是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // loginFormRules是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 验证密码是是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 9 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    resetLoginForm() {
      // 单文件组件中this获取到当前单文件组件，this.$refs.loginFormRef获取到表单对象，使用表单对象的resetFields()方法即可重置表单。
      // 当方法绑定在点击事件上的时候，方法中的this指向的是全局对象，在html文件和js文件中指向window对象；在vue组件中，指向此vue组件实例。
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      // validate是form组件的方法，其中的valid形参代表的是一个布尔值（验证是否合法的结果）
      this.$refs.loginFormRef.validate(async (valid, a) => {
        if (!valid) return
        // main.js中配置好了，this.$http可以直接发送请求；this.loginForm可以直接获取到表单对象。
        // axios发送请求会返回一个promise对象
        // const ret = this.$http.post('/login', this.loginForm)   //promise对象
        // 利用async和await可以简化操作，使promis对象直接变成一个普通对象。
        // const ret = await this.$http.post('/login', this.loginForm)  //普通对象
        // 解构得到我们需要的值
        const { data: res } = await this.$http.post('/login', this.loginForm)
        // 获取axios请求返回的状态码，判断登录是否成功
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功')
        // 获取axios请求返回的token值并保存在sessionstorage里面。
        window.sessionStorage.setItem('token', res.data.token)
        // 2. 通过编程式导航跳转到后台主页，$router是某个过程自动添加的方法！
        this.$router.push('/home')
      })
    },
    // 根据ID删除对应的用户信息
    removeUserById(id) {
      // 弹框询问用户是否删除数据
      const res = this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  // absolute：生成绝对定位的元素，相对于position属性定义为static之外的第一个父元素进行定位。
  position: absolute;
  // 以绝对定位的父盒子或者html长度为标准，右上角顶点在x,y轴上移动。
  left: 50%;
  top: 50%;
  // 以自身长度为标准，右上角顶点在x,y轴上移动。
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.btns {
  // 采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。
  //它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。
  display: flex;
  justify-content: flex-end;
}

.login_form {
  // absolute之后宽度就不会时默认的100%了，需要自己设置。
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 20px;
  // 换一种计算模式：通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。
  box-sizing: border-box;
}
</style>
