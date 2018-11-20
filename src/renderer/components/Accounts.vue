<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <pet-account-overview/>
      </b-col>
      <b-col>
        <pet-account-add/>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import AccountOverview from './Accounts/AccountOverview'
import AddAccount from './Accounts/AddAccount'
export default {
  components: {
    'pet-account-overview': AccountOverview,
    'pet-account-add': AddAccount
  }
}
</script>
<style lang="scss">

</style>
