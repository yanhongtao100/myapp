<template>
	<div class="main">
		<v-row>
			<v-col cols="6" class="login_left">	
			</v-col>
			<v-col cols="6" class="login_left">	
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	name:"",
	components: {},
	props: {},
	data() {
		return {

		};
	},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeRouteUpdate() {},
	methods: {

	},
	filter: {},
	computed: {},
	watch: {},
};
</script>

<style scoped >
.main{
	position: relative;
	top: -64px;
	left: 0;
	height: 100vh;
	background-color: #ff0;
		z-index: 9;

}
.login_left{
	background-color: #f00;
}
</style>

