<template>
  <b-form @submit="AccountFormSubmit">
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
    <b-button type="submit" variant="primary" class="text-light">Submit</b-button>
    <b-button v-if="on_cancel" @click="on_cancel" variant="secondary" class="ml-3">Cancel</b-button>
  </b-form>
</template>
<script>
import controllers from '../../data/controllers'

export default {
  name: 'pet-account-form',
  props: ['editId', 'on_cancel'],
  watch: {
    async editId (newVal, oldVal) {
      if (newVal === oldVal) return
      if (newVal == null) {
        this.form_data = {
          account_id: null,
          account_name: ''
        }
      }
      let account = await controllers.account.getAccountById(newVal)
      this.form_data.account_id = account.accountId
      this.form_data.account_name = account.name
    }
  },
  data () {
    return {
      form_data: {
        account_id: null,
        account_name: ''
      }
    }
  },
  methods: {
    AccountFormSubmit (evt) {
      evt.preventDefault()
      if (this.editId) {
        // Updating existing
        return controllers.account.updateAccountById(this.editId, {
          accountId: this.form_data.account_id,
          name: this.form_data.account_name
        }).then(() => {
          this.$store.dispatch('refreshAccountData')
          this.$store.dispatch('refreshAvailableAccounts')
          if (this.on_cancel) return this.on_cancel()
        })
      } else {
        // New Transaction
        return controllers.account.addAccount({
          accountId: this.form_data.account_id,
          name: this.form_data.account_name
        }).then(() => {
          this.$store.dispatch('refreshAccountData')
          this.$store.dispatch('refreshAvailableAccounts')
          if (this.on_cancel) return this.on_cancel()
        })
      }
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
