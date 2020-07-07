<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-form :inline="true" label-width="50" class="status-form">
      <el-form-item label="地区">
        <el-select :value="area" placeholder="选择地区" @change="onAreaChange">
          <el-option label="国内" value="mainlan" />
          <el-option label="国外" value="overseas" />
        </el-select>
      </el-form-item>
      <el-form-item label="项目">
        <el-select
          :value="project"
          placeholder="选择项目"
          @change="onProjectChange"
        >
          <el-option
            v-if="area === 'mainlan'"
            label="快应用"
            value="quickapp"
          />
          <template v-else>
            <el-option label="繁体版" value="app_tw" />
            <el-option label="英文版" value="app_en" />
            <el-option label="越南版" value="app_vn" />
          </template>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    const { area, project } = this.$store.state.project.currentDataPath
    return {
      area,
      project
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  methods: {
    onAreaChange(value) {
      this.project = ''
      this.area = value
    },
    onProjectChange(value) {
      this.project = value
      this.$store.commit('project/CHANGE_PROJECT_TARGET', {
        area: this.area,
        project: this.project
      })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push({
        path: '/login',
        params: {
          redirect: this.$route.fullPath
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: 50px;
  overflow: hidden;
  position: relative;

  .hamburger-container {
    cursor: pointer;
    float: left;
    height: 100%;
    line-height: 46px;
    -webkit-tap-highlight-color: transparent;
    transition: background 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .status-form {
    float: right;
    height: 100%;
    line-height: 50px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      color: #5a5e66;
      display: inline-block;
      font-size: 18px;
      height: 100%;
      padding: 0 8px;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          border-radius: 10px;
          cursor: pointer;
          height: 40px;
          width: 40px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          font-size: 12px;
          position: absolute;
          right: -20px;
          top: 25px;
        }
      }
    }
  }
}

::v-deep .el-form--inline .el-form-item__content {
  vertical-align: middle;
}
</style>
