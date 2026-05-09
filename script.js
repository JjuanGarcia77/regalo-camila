// script.js

// Detectar si es un dispositivo móvil
const isMobile = window.innerWidth <= 768;

// 1. Generar partículas de fondo (luciérnagas)
const particleContainer = document.createElement('div');
document.body.appendChild(particleContainer);

// Menos partículas en celular para mejor rendimiento y no saturar
const particleCount = isMobile ? 30 : 60; 

for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}vw`;
    p.style.top = `${Math.random() * 100}vh`;
    p.style.boxShadow = `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`;
    
    // Si es aleatorio, hacer algunas partículas de tono rosado
    if (Math.random() > 0.8) {
        p.style.background = '#ffb3c6';
        p.style.boxShadow = `0 0 ${size * 2}px #ffb3c6`;
    }
    
    particleContainer.appendChild(p);

    anime({
        targets: p,
        opacity: [0, Math.random() * 0.8 + 0.2, 0],
        translateY: () => Math.random() * -150 - 50,
        translateX: () => Math.random() * 100 - 50,
        duration: () => Math.random() * 4000 + 3000,
        loop: true,
        easing: 'linear',
        delay: () => Math.random() * 3000
    });
}

// 2. Generar Claveles (Flores) dinámicamente
const flowerContainer = document.getElementById('flower-container');
// Menos claveles y menos dispersión de pétalos en pantallas pequeñas
const numFlowers = isMobile ? 5 : 9; 
const petalSpread = isMobile ? 35 : 60; 

for (let i = 0; i < numFlowers; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'clavel-wrapper';
    
    // Distribuir a lo largo de la pantalla
    const baseX = (i + 1) * (100 / (numFlowers + 1));
    const randomX = baseX + (Math.random() * 6 - 3);
    wrapper.style.left = `${randomX}vw`;
    
    const stem = document.createElement('div');
    stem.className = 'stem';
    // Altura del tallo aleatoria (entre 35% y 75% de la pantalla)
    const targetHeight = window.innerHeight * (0.35 + Math.random() * 0.4); 
    
    const head = document.createElement('div');
    head.className = 'head';
    
    // Generar hojas para el tallo
    const numLeaves = 2 + Math.floor(Math.random() * 3);
    const leaves = [];
    for(let l = 0; l < numLeaves; l++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        // Posición de la hoja en el tallo
        const leafH = Math.random() * targetHeight * 0.7 + targetHeight * 0.15; 
        leaf.style.bottom = `${leafH}px`;
        const side = Math.random() > 0.5 ? 1 : -1;
        
        if (side === -1) { // Izquierda
            leaf.style.transformOrigin = 'bottom right';
            leaf.style.right = '4px'; // centro del tallo (8px / 2)
            leaf.style.borderRadius = '100% 0 100% 0';
        } else { // Derecha
            leaf.style.transformOrigin = 'bottom left';
            leaf.style.left = '4px';
            leaf.style.borderRadius = '0 100% 0 100%';
        }
        leaf.dataset.side = side;
        stem.appendChild(leaf);
        leaves.push(leaf);
    }
    
    // Generar pétalos del clavel
    // Menos pétalos en celular para no saturar y mantener fluidez
    const numPetals = isMobile ? 35 : 50; 
    for(let p = 0; p < numPetals; p++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        // Variación de color para dar profundidad al clavel
        if (Math.random() > 0.75) {
            petal.style.background = 'radial-gradient(circle at 30% 30%, #ff7eb3, #ff0f7b, #c9184a)';
        } else if (Math.random() < 0.2) {
            petal.style.background = 'radial-gradient(circle at 30% 30%, #ff1493, #d81159, #8f2d56)';
        }
        head.appendChild(petal);
    }
    
    stem.appendChild(head);
    wrapper.appendChild(stem);
    flowerContainer.appendChild(wrapper);
    
    // Retraso en escalera para que no crezcan todas a la vez
    const delay = i * 250 + 500;
    
    // Animación de crecimiento del tallo
    anime({
        targets: stem,
        height: [0, targetHeight],
        duration: 3500,
        easing: 'easeOutSine',
        delay: delay
    });
    
    // Animación de las hojas
    leaves.forEach((leaf) => {
        const leafDelay = delay + (parseFloat(leaf.style.bottom) / targetHeight) * 3500;
        anime({
            targets: leaf,
            opacity: [0, 1],
            scale: [0, 1],
            rotate: [0, parseInt(leaf.dataset.side) * (30 + Math.random() * 40)],
            duration: 1500,
            easing: 'easeOutElastic(1, .6)',
            delay: leafDelay
        });
    });
    
    // Animación de apertura del clavel (pétalos)
    anime({
        targets: head.querySelectorAll('.petal'),
        scale: [0, () => 0.4 + Math.random() * 0.7],
        rotate: [0, () => Math.random() * 360],
        translateX: () => (Math.random() - 0.5) * petalSpread,
        translateY: () => (Math.random() - 0.5) * petalSpread,
        opacity: [0, 0.95],
        duration: 3000,
        delay: delay + 2800, // Comienza cuando el tallo está casi completo
        easing: 'easeOutBack'
    });

    // Pequeño movimiento del viento una vez que floreció
    anime({
        targets: head,
        rotate: () => (Math.random() - 0.5) * 15,
        duration: () => 4000 + Math.random() * 3000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        delay: delay + 6000
    });
}

// 3. Animación de aparición del mensaje final
const messageDelay = numFlowers * 250 + 4500; // Después de que casi todas las flores crezcan

anime({
    targets: '.message-container',
    opacity: [0, 1],
    scale: [0.8, 1],
    translateY: [30, 0],
    duration: 3000,
    delay: messageDelay,
    easing: 'easeOutCubic',
    complete: function() {
        // Animación flotante suave para el mensaje
        anime({
            targets: '.message-container',
            translateY: [-5, 5],
            duration: 4000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });
    }
});
