<script setup lang="ts">
import { login } from '@/api/authApi';
import naiveui from '@/utils/naiveui';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import {useUserStore} from "@/stores/user";

const router = useRouter();
const form = reactive({
  username: '',
  password: ''
});
/**
 * 处理登录
 */
function handleLogin() {
  login(form).then(res => {
    const {setAll} = useUserStore();
    console.log('登录成功')
    const {loginId, staffInfo,  menuList, roleList} = res.data;
    setAll(loginId, staffInfo, roleList, menuList);
    router.push({path: '/dashboard/analysis'});
    naiveui.message.success(res.msg);
  });
}
</script>
<template>
  <div class="login w-full h-full">
    <n-card embedded title="登录" class="w-1/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <n-form>
        <n-form-item label="用户名">
          <n-input :input-props="{ autocomplete: 'username' }" v-model:value="form.username" placeholder="请输入用户名" clearable />
        </n-form-item>
        <n-form-item label="密码">
          <n-input  :input-props="{ autocomplete: 'current-password' }" v-model:value="form.password" type="password" show-password-on="mousedown"
                   placeholder="请输入密码" :maxlength="8" clearable/>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" block strong @click="handleLogin">
            登录
          </n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </div>
</template>
<style scoped>
.login {
  background-image: url('../../assets/后台服务.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>