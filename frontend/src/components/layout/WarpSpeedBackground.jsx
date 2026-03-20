import React, { useEffect, useRef } from 'react';

const WarpSpeedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Star/Particle structure
    const numStars = 200;
    const stars = [];
    
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width, // depth
      });
    }

    const speed = 15; // Running Speed Simulation
    let angle = 0; // For Head Bobbing effect

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)'; // Slate-900 with motion blur opacity
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 🏃‍♂️ Add "Head Bobbing" to simulate footsteps
      angle += 0.12; 
      const bob = Math.sin(angle) * 12; // bounce up and down 12px

      ctx.save();
      ctx.translate(canvas.width / 2, (canvas.height / 2) + bob);

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];

        // Move particle forward in depth (Z axis)
        star.z -= speed;

        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
          star.z = canvas.width;
        }

        // Project coordinate with perspective division
        const k = 128 / star.z;
        const px = star.x * k;
        const py = star.y * k;

        if (px > -canvas.width / 2 && px < canvas.width / 2 && py > -canvas.height / 2 && py < canvas.height / 2) {
          const size = (1 - star.z / canvas.width) * 3;
          
          ctx.fillStyle = 'rgba(37, 99, 235, 0.8)'; // Primary blue color
          ctx.beginPath();
          ctx.arc(px, py, size > 0 ? size : 0.1, 0, Math.PI * 2);
          ctx.fill();

          // Draw motion trail
          ctx.strokeStyle = `rgba(37, 99, 235, ${(1 - star.z / canvas.width) * 0.4})`;
          ctx.lineWidth = size > 0 ? size : 0.5;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(star.x * (128 / (star.z + speed)), star.y * (128 / (star.z + speed)));
          ctx.stroke();
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
};

export default WarpSpeedBackground;
