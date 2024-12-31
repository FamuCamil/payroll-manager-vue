<template>
  <BasicLayout>
    <div class="payrolls">
      <h1>Mis nóminas</h1>
      <UploadPayroll></UploadPayroll>
    </div>
  </BasicLayout>
</template>

<script>
import BasicLayout from "@/layouts/BasicLayout.vue";
import UploadPayroll from "@/components/payrolls/UploadPayroll.vue";
export default {
  name: "Payrolls",
  components: {
    BasicLayout,
    UploadPayroll,
  },
};
</script>

<style lang="scss" scoped>
.payrolls {
  margin: 50px 0;
  text-align: center;
}
</style>
