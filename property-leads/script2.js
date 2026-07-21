  <!-- JavaScript Section -->


        document.addEventListener('DOMContentLoaded', function() {
            // Initialize all carousels
            document.querySelectorAll('.carousel-container').forEach(initCarousel);
            
            function initCarousel(container) {
                const slides = container.querySelectorAll('.carousel-slide');
                const dots = container.nextElementSibling.querySelectorAll('.dot');
                let currentIndex = 0;
                
                // Next/previous controls
                container.querySelector('.next').addEventListener('click', () => {
                    changeSlide(currentIndex + 1);
                });
                
                container.querySelector('.prev').addEventListener('click', () => {
                    changeSlide(currentIndex - 1);
                });
                
                // Dot controls
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        changeSlide(index);
                    });
                });
                
                function changeSlide(newIndex) {
                    // Wrap around if at ends
                    if (newIndex >= slides.length) newIndex = 0;
                    if (newIndex < 0) newIndex = slides.length - 1;
                    
                    // Hide current slide
                    slides[currentIndex].classList.remove('active');
                    dots[currentIndex].classList.remove('active');
                    
                    // Show new slide
                    currentIndex = newIndex;
                    slides[currentIndex].classList.add('active');
                    dots[currentIndex].classList.add('active');
                }
                
                // Auto-advance every 5 seconds
                setInterval(() => {
                    changeSlide(currentIndex + 1);
                }, 5000);
            }
        });