document.getElementById('weight-loss-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const currentWeight = parseFloat(document.getElementById('current-weight').value);
    const goalWeight = parseFloat(document.getElementById('goal-weight').value);
    const months = parseFloat(document.getElementById('months').value);

    if (isNaN(currentWeight) || isNaN(goalWeight) || isNaN(months)) {
        document.getElementById('calculation-result').textContent = "Por favor, insira valores válidos.";
        return;
    }

    const weightToLose = currentWeight - goalWeight;
    const weightLossPerMonth = weightToLose / months;
    const dailyCaloricDeficit = (weightLossPerMonth * 7700) / 30;

    let resultText = `Você precisa perder aproximadamente ${weightLossPerMonth.toFixed(2)} kg por mês.`;
    resultText += ` Para isso, você precisará de um déficit calórico diário de cerca de ${dailyCaloricDeficit.toFixed(0)} calorias.`;

    document.getElementById('calculation-result').textContent = resultText;
});
