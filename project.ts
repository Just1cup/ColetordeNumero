document.getElementById('submitBttn')?.addEventListener('click', () => {
    const inputElement = document.getElementById('userInput') as HTMLInputElement;
    
    if (!inputElement) {
        console.error('O elemento de entrada não foi encontrado!');
        return;
    }

    const userInput = inputElement.value;
    console.log(`O número é ${userInput}!`);
});
