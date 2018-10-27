<template>
	<strong>TOTAAL: €{{ totalPrice }}</strong>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	computed: {
		...mapGetters(['totalPrice'])
	}
}
</script>
