// GSAP animation
gsap.from("header", { duration: 1, y: -50, opacity: 0, ease: "power2.out" });
gsap.from("#hero .hero-content", { duration: 1, y: -50, opacity: 0, delay: 0.5, ease: "power2.out" });
gsap.from("#about", { duration: 1, y: -50, opacity: 0, delay: 1, ease: "power2.out" });
gsap.from("#projects .project", { duration: 1, y: -50, opacity: 0, delay: 1.5, stagger: 0.2, ease: "power2.out" });
gsap.from("#contact", { duration: 1, y: -50, opacity: 0, delay: 2, ease: "power2.out" });
