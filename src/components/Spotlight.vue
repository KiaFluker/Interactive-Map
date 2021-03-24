<template lang="html">
	<div class="map-spotlight-container">
		<div class="map-spotlight-content">
			<h3>Top Stories</h3>
			<ul class="spotlight-items">
				<li
					v-for="(story, index) in paginatedStories"
					:key="index"
					@click="goToVideo(story)"
					:class="{'is-active': currentStory.videoId === story.videoId}">
					<span>{{ story.name }}</span> - {{ story.title }}
				</li>
			</ul>
			<ul v-if="pageCount > 1" class="spotlight-pagination">
				<li
					v-for="(page, index) in pageCount"
					:key="index"
					@click="goToPage(page)"
					:class="{'is-active': pageNumber === (page - 1)}">
					{{page}}
				</li>
			</ul>
		</div>
		<div
			:class="[
					'map-spotlight-overlay',
					{ 'is-active': useResponsive && modalOpen }]">
			<div class="map-spotlight-overlay-mask">
				<div class="map-spotlight-overlay-content">
					<div
						class="map-spotlight-overlay-close"
						@click="closeModal"></div>
					<div
							:class="[
								'map-video-player',
								{ 'responsive-video': modalOpen }]">
							<iframe
								:src="currentVideo"
								allow="
									accelerometer;
									autoplay;
									encrypted-media;
									gyroscope;
									picture-in-picture"
								width="560"
								height="315"
								frameborder="0">
							</iframe>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Spotlight",
		props: {
			stories: {
				type: Array,
				required: true
			},
			useResponsive: {
				type: Boolean
			},
			size: {
				type: Number,
				default: 4
			}
		},
		data() {
			return {
				currentStory: this.stories && this.stories[0],
				youtubeSource: "https://www.youtube.com/embed/",
				vimeoSource: "https://player.vimeo.com/video/",
				pageNumber: 0,
				modalOpen: false
			}
		},
		computed: {
			currentVideo() {
				let src = this.currentStory && this.currentStory.videoSrc === "vimeo"
					? `${this.vimeoSource}${this.currentStory.videoId}`
					: `${this.youtubeSource}${this.currentStory.videoId}`;

				return src;
			},
			pageCount() {
				let
					l = this.stories.length,
					s = this.size;

				return Math.ceil(l/s);
			},
			paginatedStories() {
				const
					start = this.pageNumber * this.size,
					end = start + this.size;
						
				return this.stories.slice(start, end);
			}
		},
		methods: {
			goToPage(page) {
				this.pageNumber = page === 1 ? 0 : page - 1;
			},
			goToVideo(story) {
				this.currentStory = story;
				if (this.useResponsive) {
						this.addModalStyles();
						this.modalOpen = true;
				}
			},
			closeModal() {
				this.removeModalStyles();
				this.modalOpen = false;
			},
			addModalStyles() {
				document
					.querySelector("html")
					.classList.add("no-scroll");
			},
			removeModalStyles() {
				document
					.querySelector("html")
					.classList.remove("no-scroll");
			}
		}
	}
</script>

<style lang="less">
.map-spotlight-container {
	margin: 0 1rem;
	@media screen and (min-width: 901px) {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			padding-top: 3%;
	}
	.map-spotlight-content {
		flex: 1;
		margin-right: 10%;
		h3 {
			font-size: 24px;
			@media screen and (max-width: 800px) {
				padding: 10px 40px;
			}
		}
		.spotlight-items {
			li {
				font-size: 16px;
				cursor: pointer;
				padding: 1.75rem 0;
				border-top: 1px solid #b0b7b9;
				list-style: none;
				transition: 0.25s ease;
				&:hover {
					color: #1e90ff;
					padding-left: 1.25rem;
				}
				&.is-active {
					color: #1e90ff;
				}
			}
			span {
				font-weight: bold;
			}
		}
		.spotlight-pagination {
			list-style: none;
			display: flex;
			justify-content: center;
			color: #808b8f;				
			li {
				cursor: pointer;
				margin: 0 10px;
				&.is-active {
					border-bottom: 1px solid;
				}
			}
		}
	}
	.map-spotlight-overlay {
		flex: 1;
		justify-content: right;
		display: flex;
		&.is-active {
			@media screen and (max-width: 800px) {
				display: flex;
			}
		}
		@media screen and (max-width: 800px) {
			display:none;
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			-webkit-transform: translate3d(0, 0, 0);
			transform: translateZ(.125rem);
		}
		@media screen and (max-width: 900px) {
			justify-content: center;
		}
		.map-spotlight-overlay-mask {
			@media screen and (max-width: 800px) {
				position: absolute;
				z-index: 2;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				display: flex;
				overflow-x: hidden;
				overflow-y: scroll;
				-webkit-box-align: start;
				align-items: flex-start;
				-webkit-box-pack: center;
				justify-content: center;
				padding: 2.5rem 0 5.625rem;
				background: rgba(255,255,255,0.9);
				.map-spotlight-overlay-content {
					@media screen and (max-width: 800px) {
						position: relative;
						display: flex;
						overflow: hidden;
						z-index: 2;
						width: 87.5rem;
						max-width: calc(100% - 1.875rem);
						height: auto;
						margin: auto 0;
					}
					.map-spotlight-overlay-close {
						@media screen and (max-width: 800px) {
							position: absolute;
							z-index: 10;
							top: .125rem;
							right: .125rem;
							width: 1.25rem;
							height: 1.25rem;
							cursor: pointer;
						}
						&:before,
						&:after {
							@media screen and (max-width: 800px) {
									position: absolute;
									top: 0;
									right: 0;
									bottom: 0;
									left: 0;
									display: block;
									width: 1.25rem;
									height: .1875rem;
									margin: auto;
									content: '';
									transform: rotate(45deg);
									border-radius: .125rem;
									background: #000;
							}
						}
						&:after {
							@media screen and (max-width: 800px) {
								transform: rotate(-45deg);
							}
						}
					}
					.map-video-player {
						@media screen and (max-width: 800px) {
							position: relative;
							width: 100%;
							height: 0;
							padding-bottom: 56.25%;
							overflow: hidden;
							margin: 1.875rem 0 1.25rem;
						}
						iframe {
							@media screen and (max-width: 800px) {
								position: absolute;
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
		}
	}
}
</style>