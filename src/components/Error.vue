<template lang="html">
	<div class="error">
		<h1>There was an error loading the data.</h1>
		<h5>We apologize for the inconvenience. Please try again later.</h5>
	</div>
</template>

<style lang="less" scoped>
	.error {
		flex: 1 1 100%;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 2rem;
		will-change: position, opacity;
		h1 {
			color: #321ca8;
			font-size: 42px;
			@media (min-width: 900px) {
				font-size: 82px;
			}
		}
	}
</style>