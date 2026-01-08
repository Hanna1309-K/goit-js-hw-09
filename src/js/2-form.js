const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// 1. formData поза функціями
let formData = {
    email: '',
    message: '',
};

// 2. Відновлення даних зі сховища при завантаженні
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
    try {
        formData = JSON.parse(savedData);

        form.elements.email.value = formData.email || '';
        form.elements.message.value = formData.message || '';
    } catch (error) {
        console.error('Error parsing localStorage data', error);
    }
}

// 3. Делегування input
form.addEventListener('input', event => {
    const { name, value } = event.target;

    if (!name) return;

    formData[name] = value.trim();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 4. Submit
form.addEventListener('submit', event => {
    event.preventDefault();

    if (!formData.email || !formData.message) {
        alert('Fill please all fields');
        return;
    }

    console.log(formData);

    // очищення
    localStorage.removeItem(STORAGE_KEY);
    formData = { email: '', message: '' };
    form.reset();
});
