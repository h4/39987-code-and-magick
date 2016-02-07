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

  var formReviewElement = document.forms['form-review'];
  var marks = formReviewElement['marks'];
  var mark1 = formReviewElement['review-mark-1'];
  var mark2 = formReviewElement['review-mark-2'];
  var name = formReviewElement['review-name'];
  var review = formReviewElement['review-text'];
  var hints = document.querySelector('#hints');
  var nameHint = document.querySelector('#hint-required-name-field');
  var reviewHint = document.querySelector('#hint-required-review-field');
  var submitButton = formReviewElement.querySelector('button');

  name.value = docCookies.getItem('name');
  formReviewElement['review-mark-' + docCookies.getItem('mark')].checked = true;

  checkMarksValue();
  checkNameValue();

  submitButton.disabled = !formIsValid();

  marks.onclick = function() {
    checkMarksValue();
  };

  name.onchange = function() {
    checkNameValue();
  };

  review.onchange = function() {
    checkReviewValue();
  };

  formReviewElement.onsubmit = function(evt) {
    evt.preventDefault();

    var mark = getMark();
    var expiryDate = 150 * 24 * 60 * 60 * 1000;
    var dateToExpire = Date.now() + expiryDate;
    var formattedDateToExpire = new Date(dateToExpire).toUTCString();

    document.cookie = 'name=' + name.value + ';expires=' + formattedDateToExpire;
    document.cookie = 'mark=' + mark + ';expires=' + formattedDateToExpire;

    formReviewElement.submit();
  };

  function checkMarksValue() {
    if (mark1.checked || mark2.checked) {
      review.setAttribute('required', true);
      if (review.value === null || review.value === '') {
        reviewHint.classList.remove('invisible');
      } else {
        reviewHint.classList.add('invisible');
      }
    } else {
      review.removeAttribute('required', true);
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

    for (var i = 0; i < document.forms['form-review'].elements.length; i++) {
      isValid = document.forms['form-review'].elements[i].validity.valid;
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

  function getMark() {
    for (var i = 1; i < 6; i++) {
      if(formReviewElement['review-mark-' + i].checked) {
        return i;
      }
    }
  }
})();
