<script setup>
import { ref } from 'vue';
const { twitterBorderColor } = useTailwindConfig();
const { getHomeTweets } = useTweets();
const loading = ref(false);
const { useAuthUser } = useAuth();

const homeTweets = ref([{ 2: 2 }, { 2: 1 }]);

const user = useAuthUser();

onBeforeMount(async () => {
	loading.value = true;
	try {
		const { tweets } = await getHomeTweets();
		homeTweets.value = tweets;
	} catch (error) {
		console.log(error);
	} finally {
		loading.value = false;
	}
});
</script>

<template>
	<div>
		<MainSection
			title="Home"
			:loading="loading"
		>
			<Head>
				<Title>Home / Twitter</Title>
			</Head>
			<section
				class="border-b"
				:class="twitterBorderColor"
			>
				<TweetForm :user="user" />
			</section>
			<TweetListFeed :tweets="homeTweets" />
		</MainSection>
	</div>
</template>

<style scoped></style>
