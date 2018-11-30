<template>
  <b-form @submit="submitTransaction">
    <b-form-group label="Transaction Date" label-for="transaction_date">
      <b-input type="date" id="transaction_date" v-model="transaction_form.date" required/>
    </b-form-group>
    <b-form-group label="Transaction Account">
      <b-form-select v-model="transaction_form.accountId" required>
        <option :value="null">Please select an account</option>
        <option v-for="account in accounts" :key="account.accountId" :value="account.accountId">{{ `${account.name} : ${account.accountId}` }}</option>
      </b-form-select>
    </b-form-group>
    <b-form-group label="Transaction Amount" label-for="transaction_amount">
      <b-input id="transaction_amount" v-model="transaction_form.amount" required/>
    </b-form-group>
    <b-form-group label="Transaction Description" label-for="transaction_description">
      <b-input id="transaction_description" v-model="transaction_form.description" required/>
    </b-form-group>
    <b-form-group label="Transaction Category">
      <b-form-select v-model="transaction_form.categoryId" required>
        <option :value="null">Please select a category</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </b-form-select>
    </b-form-group>
    <b-button type="submit" variant="primary" class="text-light">Submit</b-button>
    <b-button v-if="on_cancel" @click="on_cancel" variant="secondary" class="ml-3">Cancel</b-button>
  </b-form>
</template>
<script>
import controllers from '../../data/controllers'

export default {
  name: 'pet-transaction-form',
  props: ['editId', 'on_cancel'],
  watch: {
    async editId (newVal, oldVal) {
      console.log(`${newVal} : ${oldVal}`)
      if (newVal === oldVal) return
      let transaction = await controllers.transaction.getTransactionById(newVal)
      this.transaction_form = {
        date: transaction.date,
        accountId: transaction.accountId,
        amount: (transaction.debit || transaction.credit),
        description: transaction.description,
        categoryId: transaction.categoryId
      }
    }
  },
  data () {
    return {
      transaction_form: {
        date: null,
        accountId: null,
        amount: 0,
        description: '',
        categoryId: null
      }
    }
  },
  methods: {
    submitTransaction (evt) {
      evt.preventDefault()
      if (this.editId) {
        // Updating existing
        let updatedTransaction = {
          categoryId: this.transaction_form.categoryId,
          accountId: this.transaction_form.accountId,
          date: this.transaction_form.date,
          description: this.transaction_form.description
        }
        if (this.transaction_form.amount > 0) {
          updatedTransaction.credit = this.transaction_form.amount
        } else {
          updatedTransaction.debit = this.transaction_form.amount
        }
        controllers.transaction.updateTransactionById(this.editId, updatedTransaction)
      } else {
        // New Transaction
      }
      if (this.on_cancel) this.on_cancel()
      this.$store.dispatch('refreshTransactions')
    }
  },
  computed: {
    accounts () {
      return this.$store.state.Account.accounts
    },
    categories () {
      return this.$store.state.Categories.categories
    }
  },
  created () {
    this.$store.dispatch('refreshAccountData')
    this.$store.dispatch('refreshCategories')
  }
}
</script>
<style lang="scss">

</style>
