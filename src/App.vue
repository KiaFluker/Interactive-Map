<template>
	<div id="interactive-map">
		<InteractiveMap
			:selectedState="selectedState"
			:displayStories="displayStories" />
	</div>
</template>

<script>
	import InteractiveMap from './components/InteractiveMap.vue'

	export default {
		name: 'App',
		components: {
			InteractiveMap
		},
		data () {
			return {
				selectedState: '',
				displayStories: true
			};
		}
	}
</script>

<style lang="less">
.interactive-map-main {
	max-width: 1400px;
	margin: 0 auto;
	padding: 20px 0;
	border-bottom: 1px solid #e2e5e6;
	.interactive-map-container {
		position: relative;
		.google-map {
			width: 100%;
			min-height: 450px;
			max-height: 600px;
		}
		.map-info-container {
			background-color: #ffffff;
			padding: 10px 25px;
			box-sizing: border-box;
			top: 3%;
			border: 1px solid rgba(0, 0, 0, 0.12);
			border-radius: 5px;
			max-width: 400px;
			position: absolute;
			transform: translateX(-50%);
			width: calc(100% - 10px);
			z-index: 1;
			left: 80%;
			font-size: 0.95rem;
			display: flex;
			flex-direction: row-reverse;
			flex-wrap: wrap;
			@media screen and (max-width: 1100px) {
				left: 70%;
			}
			@media screen and (max-width: 800px) {
				position: relative;
				flex-direction: row;
				left: 50%;
				max-width: 100%;
				border: none;
			}
			.quickLinks-search {
				font-size: 0.95rem;
				padding: 0 0 0.5rem;
				margin-bottom: 1rem;
				border-bottom: .0625rem solid #E3E5E7;
				display: flex;
				flex: 1;
				input,
				.icon-search {
					font-size: 1rem;
				}
				#autosuggest {
					margin-top: 0.25rem;
					.autosuggest__results {
						ul {
							position: absolute;
							background: #fff;
							z-index: 1;
							list-style: none;
							margin: 0.75rem 0 0;
							padding: 0;
							width: 50%;
							left: 5%;
							box-shadow: 0 0 1.75rem -.375rem rgba(33,35,34,0.2);
						}
						.autosuggest__results-item {
							line-height: 2;
							padding: .5rem 1rem;
						}
						.autosuggest__results-item--highlighted {
							background-color: #b5dafc;
						}
					}
				}
			}
			.map-info-content {
				color: #000000;
				div {
					padding: 5px 0;
				}
				.map-info-tabs {
					margin: 0;
					padding-left: 0;
					padding-right: 0;
					list-style: none;
					display: flex;
					justify-content: space-between;
					@media screen and (max-width: 800px) {
						display: flex;
					}
					.map-info-tabs-item {
						font-weight: bold;
						cursor: pointer;
						&.is-active {
							color: #1e90ff;
						}
						@media screen and (max-width: 800px) {
							margin: 0 auto;
						}
						&:first-child {
							@media screen and (max-width: 800px) {
								margin-left: 0;
							}
						}
					}
				}
				.map-info-state {
					font-weight: bold;
					font-size: 2rem;
				}
				.map-info-tab-title {
					font-weight: bold;
				}
				.map-info-flag {
					text-align: center;
				}
			}
		}
		.map-info-responsive-container {
			margin: 1rem 0;
			.map-info-responsive-tabs {
				display: none;
				flex-wrap: wrap;
				list-style: none;
				margin: 0;
				padding: 0;
				@media screen and (max-width: 800px) {
					display: flex;
				}
				.responsive-tab {
					flex: 1;
					text-align: center;
					color: #ffffff;
					background-color: #1e90ff;
					padding: .5rem 0;
					cursor: pointer;
					&.is-active {
							background-color: #0658a5;
					}
					&:first-child {
							border-right: 2px solid #ffffff;
					}
					&:last-child {
							border-left: 2px solid #ffffff;
					}
				}
			}
			.map-content-toggle {
				display: none;
				justify-content: center;
				padding-top: .5rem;
				@media screen and (max-width: 800px) {
					display: flex;
				}
				&.view-less {
					&:after {
						content: '';
						height: 0.65rem;
						width: 0.65rem;
						border-bottom: 2px solid #1e90ff;
						border-left: 2px solid #1e90ff;
						-webkit-transform: rotate(135deg);
						transform: rotate(135deg);
						margin: .6rem .85rem 0;
					}
				}
				&.view-more {
					&:after {
						content: '';
						height: 0.65rem;
						width: 0.65rem;
						border-bottom: 2px solid #1e90ff;
						border-left: 2px solid #1e90ff;
						-webkit-transform: rotate(-45deg);
						transform: rotate(-45deg);
						margin: .3rem .85rem 0;
					}
				}
				span {
					cursor: pointer;
				}
			}
		}
	}
}
</style>