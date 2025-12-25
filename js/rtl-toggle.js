// ============================================
// TasteIT Restaurant - RTL/LTR Toggle
// ============================================

class RTLToggle {
    constructor() {
        this.init();
    }

    init() {
        // Check for saved direction preference
        const savedDirection = localStorage.getItem('direction') || 'ltr';
        this.setDirection(savedDirection);

        // Initialize toggle button
        this.initToggleButton();
    }

    initToggleButton() {
        const rtlToggle = document.getElementById('rtlToggle');
        if (!rtlToggle) return;

        rtlToggle.addEventListener('click', () => {
            this.toggleDirection();
        });
    }

    toggleDirection() {
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        this.setDirection(newDir);
    }

    setDirection(direction) {
        // Set direction on html element
        document.documentElement.setAttribute('dir', direction);

        // Update body class for additional styling
        if (direction === 'rtl') {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }

        // Save preference to localStorage
        localStorage.setItem('direction', direction);

        // Update toggle button icon if it exists
        this.updateToggleIcon(direction);

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('directionChanged', {
            detail: { direction }
        }));
    }

    updateToggleIcon(direction) {
        // Icon is now static (globe), no need to toggle classes
        /*
        const rtlToggle = document.getElementById('rtlToggle');
        if (!rtlToggle) return;

        const icon = rtlToggle.querySelector('i');
        if (icon) {
            if (direction === 'rtl') {
                icon.classList.remove('fa-align-left');
                icon.classList.add('fa-align-right');
            } else {
                icon.classList.remove('fa-align-right');
                icon.classList.add('fa-align-left');
            }
        }
        */
    }

    getDirection() {
        return document.documentElement.getAttribute('dir') || 'ltr';
    }
}

// Initialize RTL Toggle when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.rtlToggle = new RTLToggle();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RTLToggle;
}
