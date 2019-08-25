const usernameValidate = username => {
	// console.log('un val')
	if(!username) {
		throw new Error("Username is required");
	}
	const usernamePattern = /^[a-zA-Z0-9_]{6,30}$/;
	if (!usernamePattern.test(username)) {
		console.log('not match');
		throw new Error("Username must be 6-30 characters long, include letters, digits or underscore _ .");
	};
	return true;
}

const emailValidate = email => {
	if(!email) {
		throw new Error("Email is required");
	}
	const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!emailPattern.test(email)) {
		throw new Error("Invalid email");
	};
	return true;
}

const passwordValidate = password => {
	if(!password) {
		throw new Error("Password is required");
	}
	const passwordPattern = /^[a-zA-Z0-9`~!@#$%^&*()-_=+[\]{}\\\|;:'",\.<>?/ ]{6,}$/;
	if (!passwordPattern.test(password)) {
		console.log('unvalid pwd');
		throw new Error("Password must be at least 6 characters long, include printable characters!");
	};
	return true;
}

const signUpValidate = (username, email, password) => {
	if (usernameValidate(username) && emailValidate(email) && passwordValidate(password)) {
		return true;
	}
}

const signInValidate = (username, password) => {
	if(!username) {
		throw new Error("Username is required");
	}
	if(!password) {
		throw new Error("Password is required");
	}
	return true;
}

module.exports = {
	signUpValidate,
	signInValidate,
	usernameValidate,
	passwordValidate
}