<template>
	<register-login-wrapper>
		<div class="row center-xs middle-xs" style="min-height: 100vh;">
			<div class="col-md-fluid-7 col-lg-6">
				<div style="max-width: 200px; margin: 0 auto;">
					<img class="img-responsive" src="/img/logo.png" alt="">
				</div>
				<cards v-depth="3">
					<form @submit.prevent="registerOrLoginHandler">
						<cards-content>
							<div class="font-subhead no-margin">Set your username</div>
						</cards-content>
						<divider></divider>
						<cards-content>
							<textfield placeholder="Username" v-model="user.username" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textfield>
						</cards-content>
						<divider></divider>
						<cards-action>
							<div class="pull-right">
								<color-button v-ripple class="primary" type="submit">
									<icon name="arrow-right"></icon>Next
								</color-button>
							</div>
						</cards-action>
					</form>
				</cards>
			</div>
		</div>
	</register-login-wrapper>
</template>

<script>
	import {
		User
	} from "/imports/model/User.js";
	import {
		Meteor
	} from 'meteor/meteor';
	
	export default {
		data() {
			return {
				user: {
					username: "",
				}
			}
		},
		mounted() {
			if (Meteor.userId()) {
				this.$router.push("/dashboard/")
			}
		},
		methods: {
			registerOrLoginHandler() {
				let user = new User();
				
				user.callMethod('isExist', this.user.username, (err, result) => {
					Session.set("username", this.user.username);
					if (result) {
						return this.$router.push("/login");
					}

					return this.$router.push("/register");
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.__background-wrap {
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		-webkit-backface-visibility: hidden;
		width: 100%;
		height: 100%;
		.__background {
			background: url(/img/back.jpg) center;
			background-size: cover;
			filter: blur(3px);
			position: absolute;
			top: -10px;
			left: -10px;
			width: calc(100% + 20px);
			height: calc(100% + 20px);
		}
	}
</style>