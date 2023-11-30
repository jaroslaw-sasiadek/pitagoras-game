document.addEventListener("DOMContentLoaded", function () {
	const inputs = document.querySelectorAll("input");
	const resultsList = document.getElementById("results");

	inputs.forEach((input) => {
		input.addEventListener("input", function () {
			updateResults();
		});
	});

	function updateResults() {
		resultsList.innerHTML = "";
		const INPUTS = [];

		inputs.forEach((input) => {
			INPUTS.push(+input.value);
		});

		const inputTarget = INPUTS.pop();
		const inputCards = INPUTS;

		if (inputTarget !== 0) {
			const fullList = findTarget(inputCards, inputTarget);
			fullList.forEach((record) => {
				const listItem = document.createElement("li");
				listItem.textContent = record;
				resultsList.appendChild(listItem);
			});
		}
	}

	function findTarget(cards, target) {
		let array = [];

		function exploreCombinations(index, currentExpression, currentResult) {
			if (index > cards.length) {
				return;
			}
			if (currentResult === target) {
				if (!array.includes(currentExpression))
					array.push(`${currentExpression} = ${currentResult}`);
			}
			const currentCard = cards[index];

			exploreCombinations(
				index + 1,
				`${currentExpression}+${currentCard}`,
				currentResult + currentCard
			);
			exploreCombinations(
				index + 1,
				`${currentExpression}-${currentCard}`,
				currentResult - currentCard
			);
			exploreCombinations(
				index + 1,
				`${currentExpression}*${currentCard}`,
				currentResult * currentCard
			);
			exploreCombinations(
				index + 1,
				`${currentExpression}/${currentCard}`,
				currentResult / currentCard
			);
		}

		function permute(arr, start = 0) {
			for (let k = start; k < arr.length; k++) {
				for (let i = 0; i <= 5; i++) {
					exploreCombinations(i + 1, cards[i], cards[i]);
				}
				[arr[start], arr[k]] = [arr[k], arr[start]];
				permute(arr, start + 1);
				[arr[start], arr[k]] = [arr[k], arr[start]];
			}
		}

		permute(cards);

		const uniqueArray = [...new Set(array)];
		const sortedArray = uniqueArray.sort((a, b) => b.length - a.length);
		return sortedArray;
	}
});
