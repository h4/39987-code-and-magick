'use strict';

/* global reviews: true */

(function() {
  var reviewsContainer = document.querySelector('.reviews-list');

  reviews.forEach(function(review) {
    var reviewElement = getElementFromTemplate(review);
    reviewsContainer.appendChild(reviewElement);
  });

  function getElementFromTemplate(data) {
    var reviewTemplate = document.querySelector('#review-template');
    var element;

    if ('content' in reviewTemplate) {
      element = reviewTemplate.content.children[0].cloneNode(true);
    } else {
      element = reviewTemplate.children[0].cloneNode(true);
    }

    var reviewerImage = new Image();
    var imageLoadTimeout;

    reviewerImage.onload = function() {
      clearTimeout(imageLoadTimeout);
      element.querySelector('.review-author').setAttribute('src', reviewerImage.src);
    };

    reviewerImage.onerror = function() {
      element.classList.add('review-load-failure');
    };

    reviewerImage.src = data.author.picture;

    var IMAGE_TIMEOUT = 10000;

    imageLoadTimeout = setTimeout(function() {
      reviewerImage.src = '';
      element.classList.add('review-load-failure');
    }, IMAGE_TIMEOUT);

    var ICON_WIDTH = 20;

    element.querySelector('.review-author').alt = data.author.name;
    element.querySelector('.review-author').title = data.author.name;
    element.querySelector('.review-rating-number').textContent = data.rating;
    element.querySelector('.review-date').textContent = data.date;
    element.querySelector('.review-rating').style = 'width:' + ICON_WIDTH * data.rating + 'px';
    element.querySelector('.review-text').textContent = data.description;

    return element;
  }
})();
