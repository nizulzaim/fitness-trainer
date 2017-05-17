<template>
	<register-login-wrapper>
		<div class="row center-xs middle-xs" style="min-height: 100vh;">
			<div class="col-md-fluid-7 col-lg-6">
				<div style="max-width: 200px; margin: 0 auto;">
					<img class="img-responsive" src="/img/logo.png" alt="">
				</div>
				<cards v-depth="3">
					<form @submit.prevent="submitHandler">
						<cards-content>
							<div class="font-subhead no-margin">Account not exist. Register now</div>
						</cards-content>
						<divider></divider>
						<cards-content>
							<textfield placeholder="Username" v-model="user.username" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textfield>
							<textfield placeholder="Password" type="password" v-model="user.password" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textfield>
							<textfield placeholder="Confirm Password" type="password" v-model="user.cpassword" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textfield>
						</cards-content>
						<divider></divider>
						<cards-action>
							<div class="pull-right">
								<color-button v-ripple class="primary" type="submit">
									<icon name="arrow-right"></icon>Register
								</color-button>
							</div>
						</cards-action>
					</form>
				</cards>
			</div>
		</div>
		<loader ref="loader"></loader>
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
					username: Session.get("username"),
                    password: "",
                    cpassword: "",
				}
			}
		},
		mounted() {
            if (!this.user.username) {
                return this.$router.push("/");
            }
			if (Meteor.userId()) {
				this.$router.push("/dashboard/")
			}
		},
		methods: {
			submitHandler() {
				this.$refs.loader.enable();

				if (this.user.password.length < 8) {
					this.$refs.loader.disable();
					this.user.password = "";
					this.user.cpassword = "";
                    return this.$snackbar.run("Password length must at least 8 alphanumeric", () => {}, "OK", "error");
				}
				if (this.user.password !== this.user.cpassword) {
					this.$refs.loader.disable();
					this.user.password = "";
					this.user.cpassword = "";
                    return this.$snackbar.run("Please confirm your password with correct password", () => {}, "OK", "error");
                }
                let user = new User();
                let uObj = {
                    username: this.user.username,
                    password: this.user.password,
                }
                let pObj = {};
                user.callMethod("create", uObj, pObj, (err, result) => {
					this.$refs.loader.toggle();
                    if (err) {
                        return this.$snackbar.run(err.reason, () => {}, "OK", "error");
                    }
                    Meteor.loginWithPassword(this.user.username, this.user.password, (err) => {
                        if (err) {
                            return this.$snackbar.run(err.reason, () => {}, "OK", "error");
                        }
                        this.$snackbar.run("Welcome to Fitness Trainer");
                        this.$router.replace("/dashboard/");
                    })
                });
			}
		},
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