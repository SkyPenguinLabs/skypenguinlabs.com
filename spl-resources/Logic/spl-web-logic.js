/*
    ___          ___                           __            
  ,' _/ /7 _ __ / o | __ _     _       ()_    / /  _   /7  __
 _\ `. //_7\V // _,','o// \/7,'o| /7/7/7/ \/7/ /_,'o| /o\ (c'
/___,'//\\  )//_/   |_(/_n_/ |_,'/__////_n_//___/|_,7/_,'/__)
           //                _//                             
---------------------------------------------------------------
[+] Intended for people to read.
[+]
[+] > Entry | JavaScript based Site Logic
----------------------------------------------------------------

The sites logic is written primarily in JS. The *reason* js was chosen
was because we wanted to keep the site as minimal as possible, which meant
no frameworks, third party requirements, systems and more, while still being 
able to manage some form of dynamic content. 

Native JS allows us to make decent dynamic rendering utilities, which we do here.

Excuse the code, for its very experimental and was ported over from PoCs generated
by JSON defined schemas. Some of its really messy, but just bare with us through the
changes, as we are aiming to make this much more simplistic over time.

----- [ how to read this file ]

This file is just all of the sites logic combined into one. Each 
individual class or component will be separated by documentation 
like this which is easy to distinguish. There is no direct order
other than the fact that this is being written top down adjacent 
to the sites design. < which component is used first? > 
*/

function OpenCalendar() {
    window.open("https://calendar.app.google/YeHjeFEC3nZSkhaaA"); 
}


/// -================ [ HELPERS ] | Functions used globally

//// message, type
function LogM(m, t) {
    let tmpl = `[SPL-${t}]`
    if (t == "err") {
        console.error(tmpl + m)
    } else if (t == "log") {
        console.log(tmpl + m)
    }
}

///////// Notification specific function  | Notifications use this overlay system above ^ 
function closeNotification(IDENT) {
    const notification = document.getElementById(`spl-static-notification${IDENT}`);
    if (notification) {
        notification.style.display = 'none';
    }
}

/*

┏━┛┃ ┃┃ ┃┏━┃┏━┛┏━ ┏━┛┃ ┃┛┏━ ┃  ┏━┃┏━ ┏━┛
━━┃┏┛ ━┏┛┏━┛┏━┛┃ ┃┃ ┃┃ ┃┃┃ ┃┃  ┏━┃┏━┃━━┃
━━┛┛ ┛ ┛ ┛  ━━┛┛ ┛━━┛━━┛┛┛ ┛━━┛┛ ┛━━ ━━┛ ~  SkyPenguinLabs - Donation Overlay Logic
-------------------------------------------------------------------------------------------------
|
| Defines all of the logic which involves 
|
*/

////// @TOGGLE INTERNAL (button)
function toggleDonateDropdown() {
    const dropdown = document.getElementById('spl-donate-dropdown');
    dropdown.classList.toggle('active');
}

////// @TOGGLE EXTERNAL
function closeDonateDropdownOutside(e) {
    const dropdown = document.getElementById('donateDropdown');
    const donateButton = document.querySelector('.donate-trigger');

    if (!dropdown.contains(e.target) && !donateButton.contains(e.target)) {
        dropdown.classList.remove('show');
        document.removeEventListener('click', closeDonateDropdownOutside);
    }
}

////// @BUTTON-FUNC
function CpyToClipboard(t) {
    navigator.clipboard.writeText(t).then(
        () => {
            /////@DBG
            LogM('Copied', 'log');
        }
    ).catch(err => {
        /////@DBG
        LogM("Failed to copy the donation address", 'err');
    });
}



/*

┏━┛┃ ┃┃ ┃┏━┃┏━┛┏━ ┏━┛┃ ┃┛┏━ ┃  ┏━┃┏━ ┏━┛
━━┃┏┛ ━┏┛┏━┛┏━┛┃ ┃┃ ┃┃ ┃┃┃ ┃┃  ┏━┃┏━┃━━┃
━━┛┛ ┛ ┛ ┛  ━━┛┛ ┛━━┛━━┛┛┛ ┛━━┛┛ ┛━━ ━━┛ ~  SkyPenguinLabs - Tooltips Logic
-------------------------------------------------------------------------------------------------
|
| Tooltips are the notification looking icons you click on that usually create 
| an overlay ontop of the screen and then put a box of information in front of you
| usually describing the area you clicked on.
|
*/

function CheckElement(elementId) {
    return document.getElementById(elementId);
}

//// @NOTE: This overlay can be repurposed for a lot of things...
class SPLToolTipsOverlay {
    constructor() {
        if (
            !CheckElement('spl-overlay-container')
        ) {
            this.createOverlayContainer()
        }
        ////// Overlay breaks down into the following:
        ///// container
        this.overlayContainer = document.getElementById('spl-overlay-container');
        this.overlayBackground = document.getElementById('spl-overlay-background');
        ///// Box & Box Elements 
        this.overlayBox = document.getElementById('spl-overlay-box');
        this.overlayTitle = document.getElementById('spl-overlay-title');
        this.overlaySubtitle = document.getElementById('spl-overlay-subtitle');
        this.overlayDescription = document.getElementById('spl-overlay-description');
        this.overlayCloseBtn = document.getElementById('spl-overlay-close');
        this.overlayButtonContainer = document.getElementById('spl-overlay-button-container');
        this.activeButtons = []; //// @BTN_TRACKER


        /////// @DocuListener 
        this.overlayCloseBtn.addEventListener('click', () => this.close());
        this.overlayBackground.addEventListener('click', (e) => {
            if (e.target === this.overlayBackground) {
                this.close();
            }
        });

        ////// @Feature->OnEscapeKey (Exit)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

    }


    ///////// [@Dynamic]
    ///
    /// This tag defines all of the portions that will generate HTML
    /// or styling dynamically. In this one, we are generating the 
    /// overlay container. 
    ///
    createOverlayContainer() {
        const container = document.createElement('div');
        container.id = 'spl-overlay-container';
        container.innerHTML = `
            <div id="spl-overlay-background" class="spl-overlay-background">
                <div id="spl-overlay-box" class="spl-overlay-box">
                    <div class="spl-overlay-header">
                        <h2 id="spl-overlay-title" class="spl-overlay-title"></h2>
                        <button id="spl-overlay-close" class="spl-static-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <h3 id="spl-overlay-subtitle" class="spl-overlay-subtitle"></h3>
                    <div id="spl-overlay-description" class="spl-overlay-description"></div>
                    <div id="spl-overlay-button-container" class="spl-overlay-button-container"></div>
                </div>
            </div>
        `;
        document.body.appendChild(container);
    }


    ///////// [@API]
    ///
    /// Allows us to add any button we want onto the overlay. Pretty neat 
    /// for special cases like 'Visit our Shop' button, which originally 
    /// caused alignment issues with the precense of the tooltip icon. So
    /// as I mentioned we could do, we repurposed this class to create an 
    /// overlay when a button was clicked, specifically a tooltip overlay 
    /// that has buttons generated by THIS function. 
    /**
     * 
     * @param buttons type [{}] | Defines buttons THIS overlay will use   
     * @returns 
     */
    createButtons(buttons) {
        this.overlayButtonContainer.innerHTML = '';
        this.activeButtons = [];

        if (!buttons || !Array.isArray(buttons)) {
            return;
        }

        ////// Each overlay can have as much buttons as they want 
        buttons.forEach((btn, index) => {
            const button = document.createElement('button');
            button.className = `spl-button ${btn.style || 'spl-button-primary'}`;
            button.textContent = btn.text || 'Action';

            const clickHandler = (e) => {
                e.preventDefault();
                ///// Each button has a URL parameter or suggested route instead 
                ///// of a function
                if (btn.url) {
                    ///// There are possibilities to suggest opening a new tab when 
                    ///// using the `btn.url` property. 
                    if (btn.newTab) {
                        window.open(btn.url, '_blank');
                    } else {
                        window.location.href = btn.url;
                    }
                }
                if (btn.callback) {
                    btn.callback();
                }
                if (btn.closeAfter !== false) {
                    this.close();
                }
            };

            button.addEventListener('click', clickHandler);
            this.activeButtons.push({ element: button, handler: clickHandler });
            this.overlayButtonContainer.appendChild(button);
        });
    }

    ///////// [@API]
    ///
    /// Simply calls the generation with a specified set of 
    /// configured data. This is what makes this class fluid 
    /// by nature
    /**
     * Open the overlay with provided content
     * @param {Object} config - Configuration object
     * @param {string} config.title - Overlay title
     * @param {string} config.subtitle - Overlay subtitle
     * @param {string} config.description - Main content/description
     * @param {Function} config.onClose - Optional callback when overlay closes
     */
    open(config) {
        /////// @Content
        this.overlayTitle.textContent = config.title || '';
        this.overlaySubtitle.textContent = config.subtitle || '';

        /////// @Description
        if (typeof config.description === 'string') {
            this.overlayDescription.innerHTML = config.description;
        } else {
            this.overlayDescription.innerHTML = '';
            console.error('Description must be a string');
        }

        /////// @Buttons
        this.createButtons(config.buttons || null);

        /////// @Callback
        this.onCloseCallback = config.onClose;

        /////// @OverlayWithanimation
        this.overlayContainer.style.display = 'block';
        setTimeout(() => {
            this.overlayBackground.classList.add('active');
            this.overlayBox.classList.add('active');
            document.body.classList.add('spl-overlay-open');
            this.isOpen = true;
        }, 10);
    }

    /////// @API->Func [overlay.close()]
    /// @Note: We use our own close function internally for anything 
    ///        that was called within a document listener 
    close() {
        this.overlayBackground.classList.remove('active');
        this.overlayBox.classList.remove('active');
        document.body.classList.remove('spl-overlay-open');
        ////// @PostAnimation
        setTimeout(() => {
            this.overlayContainer.style.display = 'none';
            this.isOpen = false;

            ///// @Callback
            if (typeof this.onCloseCallback === 'function') {
                this.onCloseCallback();
            }
        }, 300);
    }
}



////// Only used for tooltips 
function showSPLOverlay(title, subtitle, description, onClose, buttons = null) {
    const splOverlay = new SPLToolTipsOverlay();
    splOverlay.open({
        title,
        subtitle,
        description,
        onClose,
        buttons
    });
}

/*

┏━┛┃ ┃┃ ┃┏━┃┏━┛┏━ ┏━┛┃ ┃┛┏━ ┃  ┏━┃┏━ ┏━┛
━━┃┏┛ ━┏┛┏━┛┏━┛┃ ┃┃ ┃┃ ┃┃┃ ┃┃  ┏━┃┏━┃━━┃
━━┛┛ ┛ ┛ ┛  ━━┛┛ ┛━━┛━━┛┛┛ ┛━━┛┛ ┛━━ ━━┛ ~  SkyPenguinLabs - Slideshow logic
-------------------------------------------------------------------------------------------------
|
\ All of this is defined for the slideshow. The slideshow was intended to help make it easier to 
\ dynamically update the sites short end purpose, especially if we expand into different projects
\ in the long term. 
|
*/

/**
 * A rather simple slideshow overlay for displaying images with set information
 */
class SPLSlideshow {
    constructor() {
        ///// @Container
        this.overlay = document.getElementById('spl-slideshow-overlay');
        this.titleElement = document.getElementById('spl-slide-title');
        this.imageElement = document.getElementById('spl-slide-image');
        this.descriptionElement = document.getElementById('spl-slide-description');
        this.indicatorsContainer = document.getElementById('spl-slide-indicators');
        ///// @Container->Nav
        this.closeButton = document.getElementById('spl-slideshow-close');
        this.prevButton = document.querySelector('.spl-slide-prev');
        this.nextButton = document.querySelector('.spl-slide-next');
        ///// @Slideshow->Data
        this.slides = [];
        this.currentIndex = 0;

        this.initialize();
    }

    initialize() {
        /////// @Slideshow->NavActions
        if (this.closeButton) { this.closeButton.addEventListener('click', () => this.close()); }
        if (this.prevButton) { this.prevButton.addEventListener('click', () => this.prevSlide()); }
        if (this.nextButton) { this.nextButton.addEventListener('click', () => this.nextSlide()); }
        /////// @Handler->Keydown[Escape, Arrowleft, ArrowRight]=action
        document.addEventListener('keydown', (e) => {
            if (!this.overlay.classList.contains('active')) return;
            if (e.key === 'Escape') {
                this.close();
            } else if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });

        /////// @Handler->ClickOutside=Close
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
    }

    /**
     * Set the slides for the slideshow
     * @param {Array} slides - Array of slide objects with title, image, and description
     */
    setSlides(slides) {
        if (!Array.isArray(slides) || slides.length === 0) {
            console.error('Invalid slides data');
            return;
        }

        this.slides = slides;
        this.currentIndex = 0;
        this.updateIndicators();
    }

    /**
     * Create indicator dots for each slide
     */
    updateIndicators() {
        if (!this.indicatorsContainer) return;

        this.indicatorsContainer.innerHTML = '';

        for (let i = 0; i < this.slides.length; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'spl-slide-indicator';
            if (i === this.currentIndex) {
                indicator.classList.add('active');
            }

            indicator.addEventListener('click', () => {
                this.goToSlide(i);
            });

            this.indicatorsContainer.appendChild(indicator);
        }
    }

    /**
     * Update the content of the current slide
     */
    updateSlideContent() {
        if (this.slides.length === 0) return;

        const slide = this.slides[this.currentIndex];

        if (this.titleElement) {
            this.titleElement.textContent = slide.title || '';
        }

        if (this.imageElement) {
            this.imageElement.classList.remove('active');
            this.imageElement.src = slide.image || '';
            this.imageElement.alt = slide.title || 'Slideshow image';
            setTimeout(() => {
                this.imageElement.classList.add('active');
            }, 10);
        }

        if (this.descriptionElement) {
            this.descriptionElement.textContent = slide.description || '';
        }

        const indicators = this.indicatorsContainer.querySelectorAll('.spl-slide-indicator');
        indicators.forEach((indicator, index) => {
            if (index === this.currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    /**
     * Go to the next slide
     */
    nextSlide() {
        if (this.slides.length <= 1) return;

        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlideContent();
    }

    /**
     * Go to the previous slide
     */
    prevSlide() {
        if (this.slides.length <= 1) return;

        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlideContent();
    }

    /**
     * Go to a specific slide
     * @param {number} index - Index of the slide to display
     */
    goToSlide(index) {
        if (index < 0 || index >= this.slides.length) return;

        this.currentIndex = index;
        this.updateSlideContent();
    }

    /**
     * Open the slideshow
     * @param {Array} slides - Optional array of slides to display
     * @param {number} startIndex - Optional starting slide index
     */
    open(slides, startIndex = 0) {
        if (slides) {
            this.setSlides(slides);
            this.currentIndex = startIndex < slides.length ? startIndex : 0;
        }

        if (this.slides.length === 0) {
            LogM("No slides were found :(", 'err');
            return;
        }

        this.updateSlideContent();
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close the slideshow
     */
    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}


///////////////// SLIDESHOW INSTANCE 
const splSlideshow = new SPLSlideshow();


document.addEventListener('DOMContentLoaded', () => {
    fetch('../../DemoAssets/spl_tldrpanelassetlist.json')
        .then(response => response.json())
        .then(splScreenshots => {
            /////// @Handler->Button[tldr-button]
            const tldrButton = document.querySelector('.spl-button-tertiary');
            if (tldrButton) {
                tldrButton.addEventListener('click', () => {
                    splSlideshow.open(splScreenshots);
                });
            }
        })
        .catch(error => {
            LogM("Failed to load slides: " + error, 'err');
        });
});

function showSPLSlideshow(slides, startIndex = 0) {
    splSlideshow.open(slides, startIndex);
}

/*

┏━┛┃ ┃┃ ┃┏━┃┏━┛┏━ ┏━┛┃ ┃┛┏━ ┃  ┏━┃┏━ ┏━┛
━━┃┏┛ ━┏┛┏━┛┏━┛┃ ┃┃ ┃┃ ┃┃┃ ┃┃  ┏━┃┏━┃━━┃
━━┛┛ ┛ ┛ ┛  ━━┛┛ ┛━━┛━━┛┛┛ ┛━━┛┛ ┛━━ ━━┛ ~ SkyPenguinLabs 2025 | Engineer: @Totally_Not_A_Haxxer [product-manager(featured-products)]
-------------------------------------------------------------------------------------------------
|
| Welcome to the first logical component of the SPLabs site. This component is dedicated to managing 
| the featured products that get listed on the site. The idea behind this component was that it would
| allow us to dynamically generate product listings, pretty much whenever and however we wanted to.
|
| The old site had a lot of code, like fucking WAY too much JS for handling basic product listing generation.
| So, I decided to automate it and fix that problem by making a class responsible for dynamically generating 
| and displaying featured product cards. The component simplifies product listing management by handling the 
| creation of structured HTML elements (which have styles standardized in stylesheets) which makes sure that 
| there is some consistency across the site while minimizing the amount of redundant JS and bullshit logic we 
| have to add which slows performance every time we want to add a new product category, listing or type. 
|  
| [A] Products can be initialized with pre-defined data or added dynamically via the API
|
| [B] Each product card includes a title, description (auto-truncated to 150 characters), price,  
| and a customizable purchase link
|
| [C] By default, the component supports up to four featured products at once.  
|
*/


class SPLProductManager {
    constructor(containerId = 'spl-featured-products') {
        this.container = document.getElementById(containerId);
        this.products = [];

        if (!this.container) {
            ///// @ERR -> Container missing? 
            LogM(`Container with ID [${this.container}] not found in the environment`, 'err');
        }
    }

    /**
     * [FUNC: RegisterProduct] - This will register a product to the class. It requires a standardized
     *                           set of information described below: 
     * 
     * @param {Object} product                  | Product data
     * @param {string} product.title            | Product title
     * @param {string} product.description      | Product description (max 150 chars)
     * @param {string|number} product.price     | Product price
     * @param {string} product.link             | URL to purchase the product
     * @param {string} product.linkText         | Text for the purchase link (optional)
     */
    RegisterProduct(product) {
        if (!product.title || !product.description || !product.price || !product.link) {
            ///// @ERR -> Product data missing? Dev error
            LogM(`Product must have title, description, price, and link @ATTEMPT_REGISTER->${product}`, 'err');
            return;
        }

        if (product.title.length > 36) {
            LogM("PRODUCT_TITLE_TOO_LONG -> TRIMMING")
            product.title = product.title.substring(0, 36)
        }
        product.title = "> " + product.title

        if (product.description.length > 118) {
            ///// @ERR -> Developer warning, product description will be cut, caps at 150 characters for UI/UX
            LogM(`PRODUCT_DESC_LENGTH_TOO_LONG -> product description was ${product.description.length} for product ['${product.title}'], cutting in dynamic generation....`, 'err');
            product.description = product.description.substring(0, 118) + '...';
        }

        ///// @ERR -> 4 max per registration for right now, this is testing
        if (this.products.length < 4) {
            this.products.push(product);
        } else {
            LogM(`max products reached on registration, quitting product regtistration {TESTING}`, 'err')
        }
    }


    /**
     * [FUNC: RenderProducts] - Calls to render all products to the DOM
     */
    renderProducts() {
        if (!this.container) return;

        //// @Clear
        this.container.innerHTML = '';

        //// @New
        const grid = document.createElement('div');
        grid.className = 'spl-product-grid';

        //// @Push->Products to @New
        this.products.forEach(product => {
            const card = this.createProductCard(product);
            grid.appendChild(card);
        });

        this.container.appendChild(grid);
    }

    /**
     * [FUNC: RenderProducts] - Creates a product card for registration
     *          * @param {Object} product          | Product data
     *          * @returns {HTMLElement}           | Product card element
     */
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'spl-product-card';

        //// @Create->Header
        const header = document.createElement('div');
        header.className = 'spl-product-header';
        //// @New->Header:Title
        const title = document.createElement('h3');
        title.className = 'spl-product-title';
        title.textContent = product.title;
        header.appendChild(title);
        card.appendChild(header);
        //// @New->Header:Divider
        const divider = document.createElement('hr');
        divider.className = 'spl-product-divider';
        card.appendChild(divider);

        //// @Create->Body
        const body = document.createElement('div');
        body.className = 'spl-product-body';
        //// @New->Body:Description
        const description = document.createElement('p');
        description.className = 'spl-product-description';
        description.textContent = product.description;
        body.appendChild(description);
        card.appendChild(body);
        //// @Create->Footer
        const footer = document.createElement('div');
        footer.className = 'spl-product-footer';
        const price = document.createElement('div');
        price.className = 'spl-product-price';
        price.textContent = typeof product.price === 'number' ?
            `> $${product.price.toFixed(2)}` : product.price;
        const link = document.createElement('a');
        link.className = 'spl-product-link ';
        link.href = product.link;
        link.textContent = product.linkText || 'Purchase';


        ///// @Assemble 
        footer.appendChild(price);
        footer.appendChild(link);
        card.appendChild(footer);
        return card;
    }
}

/*
┏━┛┃ ┃┃ ┃┏━┃┏━┛┏━ ┏━┛┃ ┃┛┏━ ┃  ┏━┃┏━ ┏━┛
━━┃┏┛ ━┏┛┏━┛┏━┛┃ ┃┃ ┃┃ ┃┃┃ ┃┃  ┏━┃┏━┃━━┃
━━┛┛ ┛ ┛ ┛  ━━┛┛ ┛━━┛━━┛┛┛ ┛━━┛┛ ┛━━ ━━┛ ~ SkyPenguinLabs 2025 | Engineer: @Totally_Not_A_Haxxer [product-filter]
-------------------------------------------------------------------------------------------------
|
| This is the component that allows for the filtering and product display functionality to work. The one thing is 
| this is essentially a product summary as its really only designed to display a few courses at a time. Not our 
| entire catalog, which is quite expansive.
|
*/
class SPLProductFilter {
    constructor(containerId = 'spl-products-container') {
        this.container = document.getElementById(containerId);
        this.products = [];
        this.categories = new Set();
        this.activeCategory = 'all';
        this.searchTerm = '';

        if (!this.container) {
            console.error(`Container with ID '${containerId}' not found`);
            return;
        }
    }

    /**
     * Add a product to the catalog
     * @param {Object} product - Product data
     * @param {string} product.id - Unique product ID
     * @param {string} product.title - Product title
     * @param {string} product.category - Product category (e.g., 'books', 'ebooks', 'lessons')
     * @param {string} product.description - Product description
     * @param {string|number} product.price - Product price
     * @param {string} product.link - URL to product page
     */
    addProduct(product) {
        if (!product.id || !product.title || !product.category || !product.price) {
            console.error('Product must have id, title, category, and price');
            return;
        }

        this.products.push(product);
        this.categories.add(product.category);
    }

    /**
     * Set up multiple products at once
     * @param {Array} products - Array of product objects
     */
    setProducts(products) {
        products.forEach(product => this.addProduct(product));
    }

    /**
     * Handle filter button clicks for regular category buttons
     * @param {HTMLElement} button - The clicked button element
     */
    handleFilterClick(button) {
        const category = button.dataset.category;
        this.container.querySelectorAll('.spl-filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');
        this.activeCategory = category;
        this.filterProducts();
    }

    /**
     * Set up event listeners for filtering
     */
    setupEventListeners() {
        this.container.addEventListener('click', (e) => {
            ///// @Hanlder->spl-filter-btn
            if (e.target.classList.contains('spl-filter-btn')) {
                this.handleFilterClick(e.target);
            }

            ///// @Handler->spl-filter-all
            if (e.target.classList.contains('spl-filter-all')) {
                window.location.href = '/spl-new-page/spl_product_iceberg.html';
            }
        });

        ///// @Handler->spl-filter-search-input
        this.container.addEventListener('input', (e) => {
            if (e.target.classList.contains('spl-filter-search-input')) {
                this.searchTerm = e.target.value.toLowerCase().trim();
                this.filterProducts();
            }
        });
    }

    /**
     * Filter products based on active category and search term
     */
    filterProducts() {
        const filteredProducts = this.products.filter(product => {
            //// Category filter
            const categoryMatch = this.activeCategory === 'all' || product.category === this.activeCategory;
            //// Search term filter
            const searchMatch = this.searchTerm === '' ||
                product.title.toLowerCase().includes(this.searchTerm) ||
                product.description.toLowerCase().includes(this.searchTerm);
            return categoryMatch && searchMatch;
        });

        this.renderProducts(filteredProducts);
    }

    /**
     * Render the product grid
     */
    renderProducts(filteredProducts) {
        const productGrid = this.container.querySelector('.spl-product-grid');
        if (!productGrid) return;

        productGrid.innerHTML = '';

        if (filteredProducts.length === 0) {
            productGrid.innerHTML = `
                <div class="spl-product-empty">
                    <i class="fas fa-search"></i>
                    <p>Psssttttt....you should.uh check your input- and...try again (no such product exists..)</p>
                </div>
            `;
            return;
        }

        filteredProducts.forEach((product, idx) => {
            //// Hard limit of 4 per showcase
            if (idx < 4) {
                const productEl = this.createProductElement(product);
                productGrid.appendChild(productEl);
            }
        });
    }

    /**
     * Create a product element
     * @param {Object} product - Product data
     * @returns {HTMLElement} - Product element
     */
    createProductElement(product) {
        const productEl = document.createElement('div');
        productEl.className = 'spl-product-item';
        productEl.dataset.category = product.category;

        productEl.innerHTML = `
            <div class="spl-product-content">
                <div class="spl-product-category">${product.category}</div>
                <h3 class="spl-product-title">${product.title}</h3>
                <p class="spl-product-description">${product.description}</p>
                <div class="spl-product-footer">
                    <div class="spl-product-price">${typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}</div>
                    <a href="${product.link}" class="spl-product-link">View Details</a>
                </div>
            </div>
        `;

        return productEl;
    }

    /**
     * Initialize the filter UI and render products
     */
    initialize() {
        if (!this.container) return;

        const categoryButtons = [...this.categories, 'all'].map(category => {
            if (category === 'all') {
                return `
                    <button class="spl-filter-all" data-category="all">
                        All Products
                    </button>
                `;
            }

            ////// Category based buttons
            return `
                <button class="spl-filter-btn" data-category="${category}">
                    ${category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
            `;
        }).join('');

        ///// Filtering 
        const filterUI = `
            <div class="spl-filter-header">
                <div class="spl-filter-categories">
                    ${categoryButtons}
                </div>
                <div class="spl-filter-search">
                    <i class="fas fa-search"></i>
                    <input type="text" class="spl-filter-search-input" placeholder="Search products...">
                </div>
            </div>
            <div class="spl-product-grid">
                <!-- Products rendered here -->
            </div>
        `;

        this.container.innerHTML = filterUI;
        ////// Ui needed to be created first
        this.setupEventListeners();
        /// \ render 
        this.filterProducts();
    }
}

