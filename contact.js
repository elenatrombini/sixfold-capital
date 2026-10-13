(() => {
  'use strict';
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#contact-status');
  const messages = {
    en: 'Thank you! This is a demo: your message has not been sent or saved.',
    it: 'Grazie! Questa è una demo: il messaggio non è stato inviato né salvato.',
    fr: 'Merci ! Ceci est une démonstration : votre message n’a été ni envoyé ni enregistré.'
  };
  form.addEventListener('submit', event => {
    event.preventDefault();
    status.textContent = messages[document.documentElement.lang] || messages.en;
    status.focus();
  });
})();
