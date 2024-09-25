document.addEventListener('DOMContentLoaded', () => {
    // Agregar animaciones a la carga de la página
    const animateOnLoad = () => {
        const elementsToAnimate = document.querySelectorAll('.login-container, .register-container');
        elementsToAnimate.forEach(el => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                el.style.transition = 'all 0.5s ease-out';
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
            }, 100);
        });
    };

    animateOnLoad();

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);

            formData.append('action', 'register');
            fetch('auth.php', {
                method: 'POST',
                body: formData,
            })
            .then(response => {
                console.log('Response received:', response);  // Log para verificar la respuesta
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert('Registro exitoso');
                    window.location.href = 'login.html';
                } else {
                    alert('Hubo un error en el registro: ' + data.message);
                }
            })
            .catch(error => console.error('Error en la operación de fetch:', error));
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);

            formData.append('action', 'login');
            fetch('auth.php', {
                method: 'POST',
                body: formData,
            })
            .then(response => {
                console.log('Response received:', response);  // Log para verificar la respuesta
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert('Inicio de sesión exitoso');
                    window.location.href = 'reservations.html';
                } else {
                    alert('Credenciales incorrectas. Inténtalo de nuevo: ' + data.message);
                }
            })
            .catch(error => console.error('Error en la operación de fetch:', error));
        });
    }

    const buttons = document.querySelectorAll('input[type="submit"]');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    const addScrollBackgroundAnimation = () => {
        const background = document.body;
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            background.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    };

    addScrollBackgroundAnimation();
});
