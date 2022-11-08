export async function readRecipes() {
	try {
		const response = await fetch(`/recipes`, {
			method: 'GET',
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
}