<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      auto-complete="on"
      class="login-form"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">运营分析及决策工具</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          auto-complete="on"
          name="username"
          placeholder="Username"
          tabindex="1"
          type="text"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          auto-complete="on"
          name="password"
          placeholder="Password"
          tabindex="2"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        size="medium"
        style="width: 100%; margin-bottom: 30px;"
        type="primary"
        @click.native.prevent="handleLogin"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ min: 3, max: 11, required: true, trigger: 'blur' }],
        password: [
          {
            min: 6,
            max: 20,
            required: true,
            trigger: 'blur'
          }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async handleLogin() {
      const valid = await this.$refs.loginForm.validate()
      if (!valid) {
        return
      }
      this.loading = true
      await this.$store.dispatch('user/login', this.loginForm).finally(() => {
        this.loading = false
      })
      this.$router.push({ path: this.redirect || '/' })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */

/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      -webkit-appearance: none;
      background: transparent;
      border: 0;
      border-radius: 0;
      caret-color: $cursor;
      color: $light_gray;
      height: 47px;
      padding: 12px 5px 12px 15px;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    background: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  background-color: $bg;
  min-height: 100%;
  overflow: hidden;
  width: 100%;

  .login-form {
    margin: 0 auto;
    max-width: 100%;
    overflow: hidden;
    padding: 160px 35px 0;
    position: relative;
    width: 520px;
  }

  .tips {
    color: #fff;
    font-size: 14px;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    color: $dark_gray;
    display: inline-block;
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
  }

  .title-container {
    position: relative;

    .title {
      color: $light_gray;
      font-size: 26px;
      font-weight: bold;
      margin: 0 auto 40px auto;
      text-align: center;
    }
  }

  .show-pwd {
    color: $dark_gray;
    cursor: pointer;
    font-size: 16px;
    position: absolute;
    right: 10px;
    top: 7px;
    user-select: none;
  }
}
</style>
