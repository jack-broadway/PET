<template>
  <b-card header="Add Account">
    <b-card-body>
      <b-form @submit="addAccountSubmit">
        <label>Bank Account Number</label>
        <b-form-row class="mb-3">
          <b-col>
            <b-form-select v-model="form_data.account_id" :options="imported_accounts">
              <template slot="first">
                <option :value="null" disabled>Available Imported Accounts</option>
              </template>
            </b-form-select>
          </b-col>
          <b-col>
            <b-form-input id="bankAccountNumberInput" required placeholder="Bank Account No." v-model="form_data.account_id"/>
          </b-col>
        </b-form-row> 
        <b-form-group label="Account Name" label-for="inp_acc_name">
          <b-input type="text" id="inp_acc_name" required v-model="form_data.account_name"/>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-card-body>
  </b-card>
</template>
<script>
export default {
  name: 'pet-account-add',
  data () {
    return {
      form_data: {
        account_id: null,
        account_name: ''
      }
    }
  },
  methods: {
    addAccountSubmit (evt) {
      evt.preventDefault()
      this.$store.dispatch('addAccount', {
        accountId: this.form_data.account_id,
        name: this.form_data.account_name
      })
    }
  },
  computed: {
    imported_accounts () {
      return this.$store.state.Account.imported_accounts
    }
  },
  created () {
    this.$store.dispatch('refreshAvailableAccounts')
  }
}
</script>
