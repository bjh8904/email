var phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", function(e) {
  var selectionStart = phoneInput.selectionStart;
  var rawValue = phoneInput.value;
  var digits = rawValue.replace(/\D/g, '');
  var digitsBeforeCaret = rawValue.slice(0, selectionStart).replace(/\D/g, '').length;
  
  var formatted = "";
  if (digits.startsWith('010')) {
    if (digits.length < 4) {
      formatted = digits;
    } else if (digits.length < 7) {
      formatted = digits.slice(0, 3) + '-' + digits.slice(3);
    } else {
      formatted = digits.slice(0, 3) + '-' + digits.slice(3, 7) + '-' + digits.slice(7, 11);
    }
  } else {
    formatted = digits;
  }
  
  phoneInput.value = formatted;
  
  var newCaretPosition = 0;
  var digitCount = 0;
  for (var i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i])) {
      digitCount++;
    }
    if (digitCount >= digitsBeforeCaret) {
      newCaretPosition = i + 1;
      break;
    }
  }
  if (digitCount < digitsBeforeCaret) {
    newCaretPosition = formatted.length;
  }
  
  if ((!e.inputType || (e.inputType !== "deleteContentBackward" && e.inputType !== "deleteContentForward"))
      && formatted.charAt(newCaretPosition) === '-' && newCaretPosition < formatted.length) {
    newCaretPosition++;
  }
  
  phoneInput.setSelectionRange(newCaretPosition, newCaretPosition);
});

function addValidationListener(fieldId, validator, message) {
  var field = document.getElementById(fieldId);
  var errorElement = document.getElementById("error-" + fieldId);
  field.addEventListener("input", function() {
    errorElement.textContent = validator(field.value) ? "" : message;
  });
}

addValidationListener("name", function(value) {
  return value.trim() !== "";
}, "이름을 입력해 주세요.");

addValidationListener("age", function(value) {
  return value !== "";
}, "나이를 선택해 주세요.");

addValidationListener("gender", function(value) {
  return value !== "";
}, "성별을 선택해 주세요.");

addValidationListener("address", function(value) {
  return value.trim() !== "";
}, "주소를 입력해 주세요.");

addValidationListener("detailAddress", function(value) {
  return value.trim() !== "";
}, "상세주소를 입력해 주세요.");

addValidationListener("phone", function(value) {
  return /^010-\d{4}-\d{4}$/.test(value);
}, "휴대전화 번호 형식(010-0000-0000)을 확인해 주세요.");

addValidationListener("inquiry", function(value) {
  return value.trim() !== "";
}, "문의사항을 입력해 주세요.");

document.getElementById("previewBtn").addEventListener("click", function() {
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var gender = document.getElementById("gender").value;
  var address = document.getElementById("address").value;
  var detailAddress = document.getElementById("detailAddress").value;
  var phone = document.getElementById("phone").value;
  var inquiry = document.getElementById("inquiry").value;
  
  if (name.trim() === "" || age === "" || gender === "" || address.trim() === "" || detailAddress.trim() === "" || phone.trim() === "" || inquiry.trim() === "") {
    alert("모든 항목을 올바르게 입력해 주세요.");
    return;
  }
  
  document.getElementById("preview-name").textContent = name;
  document.getElementById("preview-age").textContent = age;
  document.getElementById("preview-gender").textContent = gender;
  document.getElementById("preview-address").textContent = address;
  document.getElementById("preview-detailAddress").textContent = detailAddress;
  document.getElementById("preview-phone").textContent = phone;
  document.getElementById("preview-inquiry").textContent = inquiry;
  
  document.getElementById("previewArea").style.display = "block";
});

document.getElementById("editBtn").addEventListener("click", function() {
  document.getElementById("previewArea").style.display = "none";
});

document.getElementById("submitBtn").addEventListener("click", function() {
  var nameValid = document.getElementById("name").value.trim() !== "";
  var ageValid = document.getElementById("age").value !== "";
  var genderValid = document.getElementById("gender").value !== "";
  var addressValid = document.getElementById("address").value.trim() !== "";
  var detailAddressValid = document.getElementById("detailAddress").value.trim() !== "";
  var phoneValid = /^010-\d{4}-\d{4}$/.test(document.getElementById("phone").value);
  var inquiryValid = document.getElementById("inquiry").value.trim() !== "";
  
  if (!nameValid || !ageValid || !genderValid || !addressValid || !detailAddressValid || !phoneValid || !inquiryValid) {
    alert("모든 항목을 올바르게 입력해 주세요.");
    return;
  }
  
  var templateParams = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    address: document.getElementById("address").value,
    detailAddress: document.getElementById("detailAddress").value,
    phone: document.getElementById("phone").value,
    inquiry: document.getElementById("inquiry").value,
    to_email: "shecretto@gmail.com"
  };

  emailjs.send("service_shecretto", "template_j86y56e", templateParams)
    .then(function(response) {
      alert("문의가 성공적으로 전송되었습니다!");
      document.getElementById("contactForm").reset();
      document.getElementById("previewArea").style.display = "none";
    }, function(error) {
      alert("전송에 실패했습니다. 다시 시도해주세요.");
      console.error("메일 전송 실패:", error);
    });
});
