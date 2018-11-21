<template>
  <b-card header="Accounts">
    <b-card-body>
      <b-list-group>
        <b-list-group-item class="d-flex justify-content-between align-items-center"
          v-for="account in accounts" :key="account.accountId">
          <h4>{{ account.name }}</h4>
          <h4 class="mono-font">{{ '$'+(account.balance || 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</h4>
        </b-list-group-item>
      </b-list-group>
    </b-card-body>
  </b-card>
</template>
<script>
export default {
  name: 'pet-account-overview',
  computed: {
    accounts () {
      return this.$store.state.Account.accounts
    },
    balances () {
      return this.$store.state
    }
  },
  created () {
    this.$store.dispatch('refreshAccountData')
  }
}
</script>
<style lang="scss">
</style>

