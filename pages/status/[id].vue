<script setup>
const { getTweetById } = useTweets();
const { useAuthUser } = useAuth();
const user = useAuthUser();
const loading = ref(false);
const tweet = ref(null);

// watch for URL change to navigate get new tweet
watch(
	() => useRoute().fullPath,
	() => getTweet()
);

// this is not a compued because we want the lastest tweet every time its called
function getTweetIdFromRoute() {
	return useRoute().params.id;
}

async function getTweet() {
	loading.value = true;
	try {
		const response = await getTweetById(getTweetIdFromRoute());
		tweet.value = response.tweet;
		console.log(tweet.value);
	} catch (error) {
		console.log(error);
	} finally {
		loading.value = false;
	}
}
//console.log(getTweetIdFromRoute());

onBeforeMount(() => {
	getTweet();
});
</script>
<template>
	<div>
		<MainSection
			title="Tweet"
			:loading="loading"
		>
			<Head>
				<Title>Home / Twitter</Title>
			</Head>

			<TweetDetails
				:user="user"
				:tweet="tweet"
			/>
		</MainSection>
	</div>
</template>
