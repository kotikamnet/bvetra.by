// Глобальные переменные
let modal;
let modalForm;

// Функция открытия модального окна (должна быть глобальной)
function openFeedbackForm() {
  if (modal && modal.style) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  }
  return false;
}

// Ожидаем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  // =============================================
  // Инициализация модального окна
  // =============================================
  modal = document.getElementById('feedbackModal');
  modalForm = document.getElementById('feedbackModalForm');
  const trigger = document.querySelector('.feedback-trigger');
  const closeBtn = document.querySelector('.feedback-modal__close');
  const overlay = document.querySelector('.feedback-modal__overlay');

  // =============================================
  // Обработка кнопок "Заказать" в услугах и машинах
  // =============================================
  document.querySelectorAll('.mini-btn').forEach(button => {
    button.addEventListener('click', function() {
      openFeedbackForm();
    });
  });

  // Функция закрытия модального окна
  function closeModal() {
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }, 300);
    }
  }

  // Обработчики событий
  if (trigger) {
    trigger.addEventListener('click', openFeedbackForm);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }

  // Закрытие по ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
      closeModal();
    }
  });

  // Обработка отправки формы
  if (modalForm) {
    modalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Здесь можно добавить AJAX-отправку формы
      const formData = new FormData(modalForm);
      
      fetch('send.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
          modalForm.reset();
          closeModal();
        } else {
          alert('Произошла ошибка: ' + data.message);
        }
      })
      .catch(error => {
        alert('Произошла ошибка при отправке формы.');
        console.error('Error:', error);
      });
      
      // Временное решение для демонстрации
      alert('Форма отправлена! Мы свяжемся с вами в ближайшее время.');
      modalForm.reset();
      closeModal();
    });
  }

  // =============================================
  // Плавная прокрутка для якорных ссылок
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // =============================================
  // Обработка основной формы обратной связи
  // =============================================
  const mainForm = document.getElementById('feedbackForm');
  if (mainForm) {
    mainForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Здесь аналогично можно добавить AJAX-отправку
      const formData = new FormData(mainForm);
      
      // Временное решение для демонстрации
      alert('Основная форма отправлена! Мы свяжемся с вами в ближайшее время.');
      mainForm.reset();
    });
  }

  // =============================================
  // Маска для телефона (если подключена библиотека)
  // =============================================
  // Если используете библиотеку Inputmask
  if (typeof Inputmask !== 'undefined') {
    Inputmask({
      mask: '+375 (29)',
      showMaskOnHover: false
    }).mask(document.querySelectorAll('input[type="tel"]'));
  }
});