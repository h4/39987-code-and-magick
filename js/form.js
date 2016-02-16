'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  var formReviewElement = document.querySelector('.review-form');
  var marks = formReviewElement.querySelector('.review-form-group-mark');
  var mark1 = formReviewElement.querySelector('input[type="radio"][value="1"]');
  var mark2 = formReviewElement.querySelector('input[type="radio"][value="2"]');
  var name = formReviewElement.querySelector('.review-form-field-name');
  var review = formReviewElement.querySelector('.review-form-field-text');
  var hints = formReviewElement.querySelector('.review-fields');
  var nameHint = formReviewElement.querySelector('.review-fields-name');
  var reviewHint = formReviewElement.querySelector('.review-fields-text');
  var submitButton = formReviewElement.querySelector('button');

  submitButton.disabled = !formIsValid();

  marks.onclick = function() {
    checkMarksValue();
  };

  name.oninput = function() {
    checkNameValue();
  };

  review.oninput = function() {
    checkReviewValue();
  };

  function checkMarksValue() {
    if (mark1.checked || mark2.checked) {
      review.setAttribute('required', 'true');
      if (review.value === null || review.value === '') {
        reviewHint.classList.remove('invisible');
      } else {
        reviewHint.classList.add('invisible');
      }
    } else {
      review.removeAttribute('required');
      reviewHint.classList.add('invisible');
    }

    setHintsBlockVisible();
    submitButton.disabled = !formIsValid();
  }

  function checkNameValue() {
    if (name.value === null || name.value === '') {
      nameHint.classList.remove('invisible');
    } else {
      nameHint.classList.add('invisible');
    }

    setHintsBlockVisible();
    submitButton.disabled = !formIsValid();
  }

  function checkReviewValue() {
    if (mark1.checked || mark2.checked) {
      if (review.value === null || review.value === '') {
        reviewHint.classList.remove('invisible');
      } else {
        reviewHint.classList.add('invisible');
      }
    }

    setHintsBlockVisible();
    submitButton.disabled = !formIsValid();
  }

  function formIsValid() {
    var isValid = true;

    for (var i = 0; i < formReviewElement.elements.length; i++) {
      isValid = formReviewElement.elements[i].validity.valid;
      if (!isValid) {
        break;
      }
    }

    return isValid;
  }

  function setHintsBlockVisible() {
    if (nameHint.classList.contains('invisible') && reviewHint.classList.contains('invisible')) {
      hints.classList.add('invisible');
    } else {
      hints.classList.remove('invisible');
    }
  }
})();
