<script setup>
import { ref } from 'vue';
const { twitterBorderColor } = useTailwindConfig();
const { getHomeTweets } = useTweets();
const loading = ref(false);
const { useAuthUser } = useAuth();

const homeTweets = ref([]);

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

function handleFormSuccess(tweet) {
	navigateTo(`/status/${tweet.id}`);
}
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
				<TweetForm
					:user="user"
					@on-success="handleFormSuccess"
				/>
			</section>
			<TweetListFeed :tweets="homeTweets" />
		</MainSection>
	</div>
</template>

<style scoped></style>
