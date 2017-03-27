'use strict';

function Gallery(options) {

    var config = mergeOptions(options);
    var galleryOptions = init();

    var translatePosition = 0;
    var currentSlide = 0;

    function mergeOptions(options) {

        var settings = {
            selector: '.gallery',
            slides: 3,
            interval: 1,
            autoplay: false,
            duration: '.3s',
            animation: 'ease',
            preview: true
        };

        var userSettings = options;

        for (var key in userSettings) {
            settings[key] = userSettings[key];
        }

        return settings;
    };

    function init() {

        if (document.querySelector(config.selector) === null) {
            throw new Error('I cant find gallery-element on this page');
        };

        var galleryItems = document.querySelector(config.selector).children;
        var gallery = document.querySelector(config.selector);

        var full = gallery.cloneNode(true);
        var preview = gallery.cloneNode(true);

        var fullWrapper = document.createElement('div');
        fullWrapper.classList.add('full-wrapper');

        var arrowLeft = document.createElement('div');
        arrowLeft.classList.add('arrow');
        arrowLeft.classList.add('arrow-left');

        var arrowRight = document.createElement('div');
        arrowRight.classList.add('arrow');
        arrowRight.classList.add('arrow-right');

        full.classList.add('full');
        full.classList.remove('gallery');

        gallery.innerHTML = '';

        gallery.appendChild(fullWrapper);
        fullWrapper.appendChild(full);
        fullWrapper.appendChild(arrowLeft);
        fullWrapper.appendChild(arrowRight);

        var slidesAmount = full.children.length;
        var fullSlideWidth = gallery.offsetWidth / config.slides;

        full.style.width = fullSlideWidth * slidesAmount + 'px';
        setVendor(full, 'transition', config.animation + ' ' + config.duration);

        if (config.preview) {

            preview.classList.add('preview');
            preview.classList.remove('gallery');
            gallery.appendChild(preview);
            var previewSlideWidth = gallery.offsetWidth / preview.children.length;

            var _loop = function _loop(_i) {

                preview.children[_i].onclick = function() {

                    removeActiveClasses(galleryOptions.preview, 'gallery-item--active');

                    this.classList.add('gallery-item--active');

                    if (_i >= preview.children.length - config.slides + 1) {
                        translatePosition = -fullSlideWidth * (preview.children.length - config.slides);
                    } else {
                        translatePosition = -fullSlideWidth * _i;
                    }

                    setVendor(galleryOptions.full, 'Transform', 'translateX(' + translatePosition + 'px)');
                    currentSlide = _i;
                };
            };

            for (var _i = 0; _i < preview.children.length; _i++) {
                _loop(_i);
            }
        }

        for (var i = 0; i < slidesAmount; i++) {

            full.children[i].style.minWidth = fullSlideWidth + 'px';

            if (slidesAmount > 6 && config.preview) {
                preview.children[i].style.width = previewSlideWidth + 'px';
            }
        }

        return {
            slidesAmount: slidesAmount,
            preview: preview,
            gallery: gallery,
            full: full,
            fullSlideWidth: fullSlideWidth,
            arrowLeft: arrowLeft,
            arrowRight: arrowRight
        };
    }

    function setVendor(element, property, value) {
        element.style["webkit" + property] = value;
        element.style["moz" + property] = value;
        element.style["ms" + property] = value;
        element.style["o" + property] = value;

        element.style[property.toLowerCase()] = value;
    }

    function prev() {

        translatePosition += galleryOptions.fullSlideWidth;
        setVendor(galleryOptions.full, 'Transform', 'translateX(' + translatePosition + 'px)');
    }

    function next() {

        translatePosition -= galleryOptions.fullSlideWidth;
        setVendor(galleryOptions.full, 'Transform', 'translateX(' + translatePosition + 'px)');
    }

    function removeActiveClasses(elements, className) {

        for (var i = 0; i < galleryOptions.slidesAmount; i++) {
            elements.children[i].classList.remove(className);
        }
    }

    function galleryInterval() {

        if (config.autoplay) {

            if (currentSlide >= galleryOptions.slidesAmount - config.slides) {
                currentSlide = 0;
            }

            ++currentSlide;
            translatePosition = -galleryOptions.fullSlideWidth * currentSlide;
            setVendor(galleryOptions.full, 'Transform', 'translateX(' + translatePosition + 'px)');
        }
    }

    galleryOptions.arrowLeft.addEventListener('click', function() {

        removeActiveClasses(galleryOptions.preview, 'gallery-item--active');

        if (currentSlide == 0) {
            return;
        }

        --currentSlide;
        prev();
    }, false);

    galleryOptions.arrowRight.addEventListener('click', function() {

        removeActiveClasses(galleryOptions.preview, 'gallery-item--active');

        if (currentSlide >= galleryOptions.slidesAmount - config.slides) {
            return;
        }

        ++currentSlide;
        next();
    }, false);

    galleryOptions.gallery.addEventListener('mouseover', function(event) {

        clearTimeout(gallerysetTimeout);
    }, false);

    galleryOptions.gallery.addEventListener('mouseleave', function(event) {

        gallerysetTimeout = setInterval(galleryInterval, config.interval * 1000);
    }, false);

    var gallerysetTimeout = setInterval(galleryInterval, config.interval * 1000);
}