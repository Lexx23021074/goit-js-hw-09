// 1. Оголошуємо ключ для сховища та глобальний об'єкт стану форми (за вимогами ТЗ)
const STORAGE_KEY = 'feedback-form-state';
const formData = { email: '', message: '' };

// 2. Знаходимо елементи форми в DOM
const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

// 3. Перевіряємо сховище одразу при завантаженні сторінки
populateForm();

// 4. Використовуємо делегування подій: вішаємо один слухач 'input' на всю форму
form.addEventListener('input', onFormInput);

function onFormInput(event) {
  // Записуємо значення в об'єкт formData за ім'ям поля (email або message)
  // Метод trim() прибирає випадкові пробіли на початку й у кінці
  formData[event.target.name] = event.target.value.trim();

  // Зберігаємо оновлений об'єкт у локальне сховище, перетворивши його на рядок
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// 5. Функція для заповнення форми зі сховища при перезавантаженні сторінки
function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);

      // Оновлюємо глобальний об'єкт formData актуальними даними
      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';

      // Заповнюємо самі поля у сховищі, щоб користувач бачив свій текст
      emailInput.value = formData.email;
      messageInput.value = formData.message;
    } catch (error) {
      console.error('Помилка відновлення даних з LocalStorage:', error);
    }
  }
}

// 6. Обробка сабміту форми
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  // Скасовуємо перезавантаження сторінки браузером за замовчуванням
  event.preventDefault();

  // Перевіряємо за вимогами ТЗ, чи заповнені обидва поля (властивості об'єкта formData)
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return; // Зупиняємо функцію, якщо хоч одне поле порожнє
  }

  // Якщо все заповнено — виводимо об'єкт в консоль
  console.log('Submitted Data:', formData);

  // Очищаємо локальне сховище
  localStorage.removeItem(STORAGE_KEY);

  // Очищаємо поля самої HTML-форми
  event.currentTarget.reset();

  // Скидаємо значення глобального об'єкта formData до початкових порожніх рядків
  formData.email = '';
  formData.message = '';
}
