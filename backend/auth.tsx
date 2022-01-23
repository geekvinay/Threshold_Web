interface commonData {
	userName: string,
	role: string,
	mobile: string
}

interface loginData extends commonData {
	password: string,
}

interface signupData extends loginData {
	mobileConfirm: string,
	passwordConfirm: string
}

interface otpData extends commonData {
	otp: string
}


class Auth {

	userName: string;
	role: string;
	mobile: string;
	token: string;
	baseUrl: string;
	primaryPath: string;

	constructor() {
		this.userName = '';
		this.role = '';
		this.mobile = '';
		this.token = '';
		this.baseUrl = 'https://thresholdd.herokuapp.com';
		this.primaryPath = '/api/v1/users';
	}

	async signup(data: signupData) {
		let response: any = await fetch(this.baseUrl + this.primaryPath + '/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		response = await response.json();
		this._saveData(data);
		return response.message;
	}

	async login(data: loginData) {
		let response: any = await fetch(this.baseUrl + this.primaryPath + '/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		response = await response.json();
		this._saveData(data);
		return response.message;
	}

	async verifyOtp(data: otpData) {
		let response: any = await fetch(this.baseUrl + this.primaryPath + '/verify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		response = await response.json();

		const token = response.token;

		//Saving token to local storage
		localStorage.setItem('token', token);
		this.token = token;
		return response.message;
	}


	_saveData(data: commonData) {
		this.role = data.role;
		this.mobile = data.mobile;
		this.userName = data.userName;
	}
}

export default Auth;