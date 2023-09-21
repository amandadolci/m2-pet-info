const token = JSON.parse(localStorage.getItem('@petInfo:token')) || '';
const baseURL = 'https://api-petinfo-45zv.onrender.com/';
const requestHeaders = {
	'Content-Type': 'application/json',
	Authorization: `Bearer ${token}`,
};

export async function loginRequest(loginBody) {
	const token = await fetch(`${baseURL}/login`, {
		method: 'POST',
		headers: requestHeaders,
		body: JSON.stringify(loginBody),
	}).then(response => {
		if (response.ok) {
			const responseJson = response.json().then(({ token }) => {
				localStorage.setItem('@petInfo:token', JSON.stringify(token));

				window.location.replace('./src/pages/dashboard.html');

				return token;
			});

			return responseJson;
		} else {
			return response.json().then(({ message }) => message);
		}
	});
	return token;
}

export async function registerRequest(registerBody) {
	const newUser = await fetch(`${baseURL}/users/create`, {
		method: 'POST',
		headers: requestHeaders,
		body: JSON.stringify(registerBody),
	}).then(response => {
		if (response.ok) {
			setTimeout(() => {
				window.location.replace('../../index.html');
			}, 8000);
			return response.json();
		} else {
			return response.json().then(({ message }) => message);
		}
	});
	return newUser;
}

export async function getUser() {
	const user = await fetch(`${baseURL}/users/profile`, {
		method: 'GET',
		headers: requestHeaders,
	}).then(response => {
		if (response.ok) {
			return response.json();
		} else {
			response.json().then(({ message }) => {
				console.log(message);
			});
		}
	});
	return user;
}

export async function createPost(postBody) {
	const newPost = await fetch(`${baseURL}/posts/create`, {
		method: 'POST',
		headers: requestHeaders,
		body: JSON.stringify(postBody),
	}).then(response => {
		if (response.ok) {
			const postJson = response.json().then(resJson => {
				return resJson;
			});
			return postJson;
		} else {
			response.json().then(({ message }) => {
				return message;
			});
		}
	});
	return newPost;
}

export async function getAllPosts() {
	const posts = await fetch(`${baseURL}/posts`, {
		method: 'GET',
		headers: requestHeaders,
	}).then(response => {
		if (response.ok) {
			return response.json();
		}
	});
	return posts;
}

export async function deletePost(postId) {
	const post = await fetch(`${baseURL}/posts/${postId}`, {
		method: 'DELETE',
		headers: requestHeaders,
	}).then(response => {
		if (response.ok) {
			return response.json();
		}
	});
	return post;
}

export async function updatePost(postId, postBody) {
	const post = await fetch(`${baseURL}/posts/${postId}`, {
		method: 'PATCH',
		headers: requestHeaders,
		body: JSON.stringify(postBody),
	}).then(response => {
		if (response.ok) {
			return response.json();
		}
	});
	return post;
}
