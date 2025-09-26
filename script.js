$(document).ready(function() {
    // Smooth scrolling for navigation links
    $('.smooth-scroll, .navbar-nav a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        var target = this.hash;
        var $target = $(target);
        
        if ($target.length) {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 70
            }, 900, 'swing');
        }
    });
    
    // Update active navigation link on scroll
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();
        
        $('section').each(function(i) {
            if ($(this).position().top <= scrollDistance + 100) {
                $('.navbar-nav a.active').removeClass('active');
                $('.navbar-nav a').eq(i).addClass('active');
            }
        });
    }).scroll();
    
    // Portfolio filtering
    $('.filter-btn').on('click', function() {
        var filterValue = $(this).attr('data-filter');
        
        // Update active button
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter portfolio items
        if (filterValue === 'all') {
            $('.portfolio-item').removeClass('hidden').show();
        } else {
            $('.portfolio-item').each(function() {
                var category = $(this).attr('data-category');
                if (category === filterValue) {
                    $(this).removeClass('hidden').show();
                } else {
                    $(this).addClass('hidden').hide();
                }
            });
        }
    });
    
    // Portfolio modal functionality
    $('#projectModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        var title = button.data('title');
        var description = button.data('description');
        
        var modal = $(this);
        modal.find('.modal-title').text(title);
        modal.find('#modal-body-content').html(`
            <p>${description}</p>
            <p><strong>Technologies used:</strong> HTML, CSS, JavaScript, Bootstrap</p>
            <p><strong>Project duration:</strong> 2-4 weeks</p>
            <p>This project showcases modern web development techniques and best practices, 
            focusing on user experience and responsive design principles.</p>
        `);
    });
    
    // Contact form handling
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var message = $('#message').val().trim();
        
        // Basic validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all required fields.', 'danger');
            return;
        }
        
        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'danger');
            return;
        }
        
        // Simulate form submission
        var $submitBtn = $(this).find('button[type="submit"]');
        var originalText = $submitBtn.html();
        
        $submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...');
        
        // Simulate API call delay
        setTimeout(function() {
            showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            $('#contactForm')[0].reset();
            $submitBtn.prop('disabled', false).html(originalText);
        }, 2000);
    });
    
    // Bootstrap form validation
    (function() {
        'use strict';
        window.addEventListener('load', function() {
            var forms = document.getElementsByClassName('needs-validation');
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();
    
    // Function to show form messages
    function showFormMessage(message, type) {
        var alertClass = 'alert-' + type;
        var alertHtml = `
            <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        
        $('#form-messages').html(alertHtml);
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(function() {
                $('.alert').alert('close');
            }, 5000);
        }
    }
    
    // Navbar background change on scroll
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('navbar-scrolled');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
        }
    });
    
    // Add some CSS for navbar scroll effect
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .navbar-scrolled {
                background-color: rgba(33, 37, 41, 0.95) !important;
                backdrop-filter: blur(10px);
                transition: background-color 0.3s ease;
            }
        `)
        .appendTo('head');
    
    // Animate elements on scroll
    function animateOnScroll() {
        $('.portfolio-card, .profile-img, .contact-info').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate__animated animate__fadeInUp');
            }
        });
    }
    
    // Call animation function on scroll
    $(window).scroll(animateOnScroll);
    
    // Initial call to animate visible elements
    animateOnScroll();
    
    // Loading animation for images
    $('img').on('load', function() {
        $(this).addClass('loaded');
    });
    
    // Add CSS for image loading
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            img {
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            img.loaded {
                opacity: 1;
            }
        `)
        .appendTo('head');
});