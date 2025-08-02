// LÜXEN - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Admin Panel Functionality
    const adminButton = document.getElementById('adminButton');
    const adminModal = document.getElementById('adminModal');
    const closeAdmin = document.querySelector('.close-admin');
    
    if (adminButton && adminModal) {
        adminButton.addEventListener('click', function(e) {
            e.preventDefault();
            openAdminPanel();
        });
    }
    
    if (closeAdmin) {
        closeAdmin.addEventListener('click', function() {
            closeAdminPanel();
        });
    }
    
    // Close admin modal when clicking outside
    if (adminModal) {
        adminModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeAdminPanel();
            }
        });
    }
    
    function openAdminPanel() {
        adminModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        adminModal.style.opacity = '0';
        adminModal.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            adminModal.style.opacity = '1';
            adminModal.style.transform = 'scale(1)';
        }, 10);
    }
    
    function closeAdminPanel() {
        adminModal.style.opacity = '0';
        adminModal.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            adminModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Admin Navigation Tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            const tabName = this.getAttribute('data-tab');
            showTabContent(tabName);
            showNotification(`Cambiando a: ${tabName}`, 'info');
        });
    });

    function showTabContent(tabName) {
        // Hide all tab content
        const tabContents = document.querySelectorAll('#products-tab, #users-tab, #config-tab, #finance-tab');
        tabContents.forEach(content => {
            content.style.display = 'none';
        });
        
        // Show selected tab content
        const selectedTab = document.getElementById(`${tabName}-tab`);
        if (selectedTab) {
            selectedTab.style.display = 'block';
        }
    }

    // Admin Action Buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent;
            const row = this.closest('tr');
            const productName = row.querySelector('td:first-child').textContent;
            
            switch(action) {
                case 'Publicar':
                    showNotification(`${productName} publicado exitosamente`);
                    updateProductStatus(row, 'published');
                    break;
                case 'Despublicar':
                    showNotification(`${productName} despublicado`);
                    updateProductStatus(row, 'draft');
                    break;
                case 'Archivar':
                    showNotification(`${productName} archivado`);
                    updateProductStatus(row, 'archived');
                    break;
                case 'Desarchivar':
                    showNotification(`${productName} desarchivado`);
                    updateProductStatus(row, 'published');
                    break;
                case 'Editar':
                    showNotification(`Editando: ${productName}`);
                    break;
                case 'Eliminar':
                    if (confirm(`¿Estás seguro de que quieres eliminar ${productName}?`)) {
                        showNotification(`${productName} eliminado`, 'success');
                        row.style.opacity = '0.5';
                        setTimeout(() => {
                            row.remove();
                        }, 500);
                    }
                    break;
            }
        });
    });

    // User Management Functionality
    const addUserBtn = document.querySelector('.add-user-btn');
    const viewPermissionsBtns = document.querySelectorAll('.view-permissions-btn');
    
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            showNotification('Funcionalidad de agregar usuario en desarrollo...', 'info');
        });
    }
    
    viewPermissionsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const userName = row.querySelector('td:first-child').textContent;
            const permissionsText = row.querySelector('.permissions-text').textContent;
            showNotification(`Permisos de ${userName}: ${permissionsText}`, 'info');
        });
    });

    // Configuration Functionality
    const changeVideoBtn = document.querySelector('.change-video-btn');
    const defaultVideoCheckbox = document.getElementById('default-video');
    
    if (changeVideoBtn) {
        changeVideoBtn.addEventListener('click', function() {
            showNotification('Funcionalidad de cambio de video en desarrollo...', 'info');
        });
    }
    
    if (defaultVideoCheckbox) {
        defaultVideoCheckbox.addEventListener('change', function() {
            const statusBox = document.querySelector('.video-status-box');
            const statusText = statusBox.querySelector('.status-text');
            const statusDescription = statusBox.querySelector('.status-description');
            
            if (this.checked) {
                statusText.textContent = 'Vídeo por defecto';
                statusDescription.textContent = 'Los clientes ven el marcador de posición';
                showNotification('Video por defecto activado', 'success');
            } else {
                statusText.textContent = 'Vídeo personalizado';
                statusDescription.textContent = 'Los clientes ven el video configurado';
                showNotification('Video personalizado activado', 'success');
            }
        });
    }

    // Finance PRO Functionality
    const addExpenseBtn = document.querySelector('.add-expense-btn');
    
    if (addExpenseBtn) {
        addExpenseBtn.addEventListener('click', function() {
            showNotification('Funcionalidad de agregar gasto en desarrollo...', 'info');
        });
    }

    // User Action Buttons (Edit/Delete)
    const userActionButtons = document.querySelectorAll('.users-table .action-btn');
    
    userActionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('i').classList.contains('fa-edit') ? 'Editar' : 'Eliminar';
            const row = this.closest('tr');
            const userName = row.querySelector('td:first-child').textContent;
            
            if (action === 'Editar') {
                showNotification(`Editando usuario: ${userName}`, 'info');
            } else if (action === 'Eliminar') {
                if (confirm(`¿Estás seguro de que quieres eliminar al usuario ${userName}?`)) {
                    showNotification(`Usuario ${userName} eliminado`, 'success');
                    row.style.opacity = '0.5';
                    setTimeout(() => {
                        row.remove();
                    }, 500);
                }
            }
        });
    });

    function updateProductStatus(row, status) {
        const statusCell = row.querySelector('.status-badge');
        const actionButtons = row.querySelector('.action-buttons');
        
        // Update status badge
        statusCell.className = `status-badge ${status}`;
        
        switch(status) {
            case 'published':
                statusCell.textContent = 'Publicado';
                actionButtons.innerHTML = `
                    <button class="action-btn unpublish">Despublicar</button>
                    <button class="action-btn archive">Archivar</button>
                    <button class="action-btn edit">Editar</button>
                    <button class="action-btn delete">Eliminar</button>
                `;
                break;
            case 'draft':
                statusCell.textContent = 'Borrador';
                actionButtons.innerHTML = `
                    <button class="action-btn publish">Publicar</button>
                    <button class="action-btn archive">Archivar</button>
                    <button class="action-btn edit">Editar</button>
                    <button class="action-btn delete">Eliminar</button>
                `;
                break;
            case 'archived':
                statusCell.textContent = 'Archivado';
                actionButtons.innerHTML = `
                    <button class="action-btn unpublish">Despublicar</button>
                    <button class="action-btn unarchive">Desarchivar</button>
                    <button class="action-btn edit">Editar</button>
                    <button class="action-btn delete">Eliminar</button>
                `;
                break;
        }
        
        // Reattach event listeners to new buttons
        const newButtons = actionButtons.querySelectorAll('.action-btn');
        newButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.textContent;
                const row = this.closest('tr');
                const productName = row.querySelector('td:first-child').textContent;
                
                switch(action) {
                    case 'Publicar':
                        showNotification(`${productName} publicado exitosamente`);
                        updateProductStatus(row, 'published');
                        break;
                    case 'Despublicar':
                        showNotification(`${productName} despublicado`);
                        updateProductStatus(row, 'draft');
                        break;
                    case 'Archivar':
                        showNotification(`${productName} archivado`);
                        updateProductStatus(row, 'archived');
                        break;
                    case 'Desarchivar':
                        showNotification(`${productName} desarchivado`);
                        updateProductStatus(row, 'published');
                        break;
                    case 'Editar':
                        showNotification(`Editando: ${productName}`);
                        break;
                    case 'Eliminar':
                        if (confirm(`¿Estás seguro de que quieres eliminar ${productName}?`)) {
                            showNotification(`${productName} eliminado`, 'success');
                            row.style.opacity = '0.5';
                            setTimeout(() => {
                                row.remove();
                            }, 500);
                        }
                        break;
                }
            });
        });
    }

    // Admin Header Buttons
    const viewStoreBtn = document.querySelector('.view-store-btn');
    const logoutBtn = document.querySelector('.logout-btn');
    
    if (viewStoreBtn) {
        viewStoreBtn.addEventListener('click', function() {
            closeAdminPanel();
            showNotification('Redirigiendo a la tienda...');
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                closeAdminPanel();
                showNotification('Sesión cerrada exitosamente', 'success');
            }
        });
    }

    // Add Product Button
    const addProductBtn = document.querySelector('.add-product-btn');
    
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            showNotification('Funcionalidad de agregar producto en desarrollo...', 'info');
        });
    }

    // Explore button functionality
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const collectionsSection = document.querySelector('#colecciones');
            if (collectionsSection) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = collectionsSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Product card click functionality
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            const modal = document.getElementById(`${productId}-modal`);
            
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Add entrance animation
                modal.style.opacity = '0';
                modal.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    modal.style.opacity = '1';
                    modal.style.transform = 'scale(1)';
                }, 10);
            }
        });
    });

    // Close modal functionality
    const closeButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.product-modal');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.product-modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.product-modal[style*="display: block"]');
            if (openModal) {
                closeModal(openModal);
            }
            
            if (adminModal && adminModal.style.display === 'block') {
                closeAdminPanel();
            }
        }
    });

    function closeModal(modal) {
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Size selection in modals
    const sizeOptions = document.querySelectorAll('.size-option');
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const sizeContainer = this.closest('.size-options');
            const activeOption = sizeContainer.querySelector('.size-option.active');
            
            if (activeOption) {
                activeOption.classList.remove('active');
            }
            
            this.classList.add('active');
        });
    });

    // Modal action buttons
    const addToCartModalBtns = document.querySelectorAll('.add-to-cart-modal');
    const buyNowModalBtns = document.querySelectorAll('.buy-now-modal');
    
    addToCartModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.product-modal');
            const productName = modal.querySelector('.modal-title').textContent;
            const selectedSize = modal.querySelector('.size-option.active')?.getAttribute('data-size') || 'M';
            
            // Add to cart animation
            this.textContent = 'Agregado ✓';
            this.style.background = '#33CC66';
            
            showNotification(`${productName} (Talla ${selectedSize}) agregado al carrito`);
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.textContent = 'Agregar al Carrito';
                this.style.background = '';
            }, 2000);
        });
    });

    buyNowModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.product-modal');
            const productName = modal.querySelector('.modal-title').textContent;
            const selectedSize = modal.querySelector('.size-option.active')?.getAttribute('data-size') || 'M';
            
            showNotification(`Procediendo al checkout: ${productName} (Talla ${selectedSize})`);
            
            // Simulate checkout process
            setTimeout(() => {
                showNotification('¡Gracias por tu compra!', 'success');
                closeModal(modal);
            }, 2000);
        });
    });

    // Newsletter subscription
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const emailInput = document.querySelector('.email-input');
    
    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', function() {
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                showNotification('¡Gracias por suscribirte!');
                emailInput.value = '';
            } else {
                showNotification('Por favor, ingresa un email válido', 'error');
            }
        });
        
        // Allow Enter key to submit
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeBtn.click();
            }
        });
    }

    // Control button functionality
    const controlBtn = document.querySelector('.control-button');
    if (controlBtn) {
        controlBtn.addEventListener('click', function() {
            // Toggle between play/pause states
            const controlIcon = this.querySelector('.control-icon');
            const controlNumber = this.querySelector('.control-number');
            
            if (this.classList.contains('playing')) {
                this.classList.remove('playing');
                controlIcon.innerHTML = '<span></span><span></span>';
                controlNumber.textContent = '00';
            } else {
                this.classList.add('playing');
                controlIcon.innerHTML = '<span style="width: 12px; height: 2px;"></span>';
                controlNumber.textContent = '01';
            }
        });
    }

    // Real-time indicator animation
    const realTimeIndicator = document.querySelector('.real-time-indicator');
    if (realTimeIndicator) {
        const bolt = realTimeIndicator.querySelector('i');
        
        setInterval(() => {
            bolt.style.opacity = '0.5';
            setTimeout(() => {
                bolt.style.opacity = '1';
            }, 500);
        }, 2000);
    }

    // Product card hover effects
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Header scroll effect
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    
    window.addEventListener('scroll', function() {
        if (heroSection) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.product-card, .about-content, .community-container');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff4444' : type === 'info' ? '#3B82F6' : '#33CC66'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            font-weight: 600;
            font-size: 0.9rem;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Initialize any additional features
    initializeFeatures();
});

function initializeFeatures() {
    // Add loading animation
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    loadingScreen.innerHTML = `
        <div style="text-align: center; color: #33CC66;">
            <div style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">LÜXEN</div>
            <div style="width: 50px; height: 2px; background: #33CC66; margin: 0 auto; animation: loading 1.5s infinite;"></div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Add loading animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes loading {
            0% { width: 0; }
            50% { width: 50px; }
            100% { width: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Remove loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    document.body.removeChild(loadingScreen);
                }
            }, 500);
        }, 1000);
    });
} 