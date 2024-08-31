// Hide the heading initially to avoid flash on page load
document.querySelector(".hero-heading").style.visibility = "hidden";

window.addEventListener("load", function() {
    let tl = gsap.timeline();

    // Hero heading animation
    tl.set(".hero-heading", { visibility: "visible" });
    tl.from(".hero-heading", {
        opacity: 0,
        y: "2rem",
        duration: 1,
        ease: "power2.out"
    });

    // About heading animation
    let splitType = new SplitType(".about-heading", {
        types: "words",
        tagName: "span"
    });

    let tlHeading = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-heading",
            start: "top 80%",
            end: "top center",
            scrub: true
        }
    });

    tlHeading.fromTo(".about-heading .word", 
        { opacity: 0.2 },
        { opacity: 1,
          duration: 1,
          stagger: { each: 0.8 }
        }
    );

    // Animation for gsap-slide-up elements on scroll
    gsap.utils.toArray('.gsap-slide-up').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            y: "2rem",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "top 20%",
                scrub: 1,
                toggleActions: "play none none reverse"
            }
        });
    });

    // Initialize FLIP
    //const flip = new Flip();

    // Get the orb and all orb containers
    const containers = document.querySelectorAll('.orb_container');
    let orb = document.querySelector('.orb');

    containers.forEach((container, index) => {
        ScrollTrigger.create({
            trigger: container,
            start: "top center",
            onEnter: () => moveOrb(container),
            onEnterBack: () => moveOrb(container)
        });
    });

    function moveOrb(targetContainer) {
        const state = Flip.getState(orb);
        targetContainer.appendChild(orb);
        Flip.from(state, {
            duration: 0.8,
            ease: "power2.out",
            absolute: true
        });
    }
});