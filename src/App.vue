<template>
  <Deals :data="dataset"/>
</template>

<script>
import Deals from "@/components/deals.vue";
import dataset from '@/helpers/db.json'

export default {
  components: {
    Deals
  },
  created() {
    this.dataset = dataset
  }
}
</script>
