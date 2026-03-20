import React, { useEffect, useRef } from 'react';

const InteractiveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse coordinates
    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Particle Object
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.velocityX = (Math.random() - 0.5) * 1.2;
        this.velocityY = (Math.random() - 0.5) * 1.2;
      }

      update() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Bounce on edges
        if (this.x < 0 || this.x > canvas.width) this.velocityX = -this.velocityX;
        if (this.y < 0 || this.y > canvas.height) this.velocityY = -this.velocityY;

        // Mouse interaction (push away)
        if (mouse.x && mouse.y) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let force = (mouse.radius - distance) / mouse.radius;
            
            this.x -= forceDirectionX * force * 5;
            this.y -= forceDirectionY * force * 5;
          } else {
            // Gradually return to position if disconnected
            if (this.x !== this.baseX) {
                let dxBase = this.x - this.baseX;
                this.x -= dxBase/20;
            }
            if (this.y !== this.baseY) {
                let dyBase = this.y - this.baseY;
                this.y -= dyBase/20;
            }
          }
        }
      }

      draw() {
        ctx.fillStyle = 'rgba(37, 99, 235, 0.4)'; // Primary-600 with transparency
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Initialize Particles along paths
    const particles = [];
    const numberOfParticles = Math.floor((canvas.width * canvas.height) / 10000); // density

    for (let i = 0; i < numberOfParticles; i++) {
      particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    // Connect particles with lines
    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            let opacity = 1 - distance / 120;
            ctx.strokeStyle = `rgba(37, 99, 235, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};

export default InteractiveBackground;
