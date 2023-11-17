<script setup>
const { login } = useAuth();
const data = reactive({
	username: '',
	password: '',
	loading: false
});

async function handleLogin() {
	data.loading = true;
	try {
		await login(data);
	} catch (error) {
		console.log(error);
	} finally {
		data.loading = false;
	}
}
</script>

<template>
	<div class="pt-5 space-y-6">
		<UIInput
			v-model:model-value="data.username"
			type="text"
			label="Username"
			value=""
			placeholder="@username"
		/>
		<UIInput
			v-model:model-value="data.password"
			type="password"
			label="Password"
			value=""
			placeholder="******"
		/>

		<div>
			<button @click="handleLogin">Login</button>
		</div>
	</div>
</template>

<style scoped></style>
