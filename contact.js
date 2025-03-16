// 항목 목록
var checks = [
  { chkId: "chk-name", containerId: "container-name", extraBtnId: null },
  { chkId: "chk-age", containerId: "container-age", extraBtnId: null },
  { chkId: "chk-gender", containerId: "container-gender", extraBtnId: null },
  {
    chkId: "chk-address",
    containerId: "container-address",
    extraBtnId: "btn-address",
  },
  {
    chkId: "chk-detailAddress",
    containerId: "container-detailAddress",
    extraBtnId: null,
  },
  { chkId: "chk-phone", containerId: "container-phone", extraBtnId: null },
  { chkId: "chk-inquiry", containerId: "container-inquiry", extraBtnId: null },
];

// 체크박스 상태 변경 시 해당 컨테이너 토글 함수 (데이터는 유지)
function toggleField(chkId, containerId, extraBtnId) {
  var chk = document.getElementById(chkId);
  var container = document.getElementById(containerId);
  if (chk.checked) {
    container.style.display = "block";
    if (extraBtnId) {
      document.getElementById(extraBtnId).disabled = false;
    }
  } else {
    container.style.display = "none";
    if (extraBtnId) {
      document.getElementById(extraBtnId).disabled = true;
    }
  }
}

// 체크박스 change 이벤트 등록
checks.forEach(function (item) {
  var c = document.getElementById(item.chkId);
  c.addEventListener("change", function () {
    toggleField(item.chkId, item.containerId, item.extraBtnId);
  });
});

// 전체 선택 / 전체 취소 버튼 이벤트
document.getElementById("selectAllBtn").addEventListener("click", function () {
  checks.forEach(function (item) {
    var chk = document.getElementById(item.chkId);
    chk.checked = true;
    toggleField(item.chkId, item.containerId, item.extraBtnId);
  });
});
document
  .getElementById("deselectAllBtn")
  .addEventListener("click", function () {
    checks.forEach(function (item) {
      var chk = document.getElementById(item.chkId);
      chk.checked = false;
      toggleField(item.chkId, item.containerId, item.extraBtnId);
    });
  });

// 휴대전화 포맷팅
var phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", function (e) {
  var selectionStart = phoneInput.selectionStart;
  var rawValue = phoneInput.value;
  var digits = rawValue.replace(/\D/g, "");
  var digitsBeforeCaret = rawValue
    .slice(0, selectionStart)
    .replace(/\D/g, "").length;
  var formatted = "";
  if (digits.startsWith("010")) {
    if (digits.length < 4) {
      formatted = digits;
    } else if (digits.length < 7) {
      formatted = digits.slice(0, 3) + "-" + digits.slice(3);
    } else {
      formatted =
        digits.slice(0, 3) +
        "-" +
        digits.slice(3, 7) +
        "-" +
        digits.slice(7, 11);
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
  if (
    (!e.inputType ||
      (e.inputType !== "deleteContentBackward" &&
        e.inputType !== "deleteContentForward")) &&
    formatted.charAt(newCaretPosition) === "-" &&
    newCaretPosition < formatted.length
  ) {
    newCaretPosition++;
  }
  phoneInput.setSelectionRange(newCaretPosition, newCaretPosition);
});

// 간단 유효성 검사 함수
function validateField(value, pattern) {
  if (!value.trim()) return false;
  if (pattern) return pattern.test(value);
  return true;
}

// 미리보기 버튼 이벤트: 체크된 항목의 데이터 로드 후 미리보기 영역 표시 및 스크롤
document.getElementById("previewBtn").addEventListener("click", function () {
  var name = document.getElementById("chk-name").checked
    ? document.getElementById("name").value
    : "";
  var age = document.getElementById("chk-age").checked
    ? document.getElementById("age").value
    : "";
  var gender = document.getElementById("chk-gender").checked
    ? document.getElementById("gender").value
    : "";
  var address = document.getElementById("chk-address").checked
    ? document.getElementById("address").value
    : "";
  var detailAddress = document.getElementById("chk-detailAddress").checked
    ? document.getElementById("detailAddress").value
    : "";
  var phone = document.getElementById("chk-phone").checked
    ? document.getElementById("phone").value
    : "";
  var inquiry = document.getElementById("chk-inquiry").checked
    ? document.getElementById("inquiry").value
    : "";
  if (
    (document.getElementById("chk-name").checked && !validateField(name)) ||
    (document.getElementById("chk-age").checked && !validateField(age)) ||
    (document.getElementById("chk-gender").checked && !validateField(gender)) ||
    (document.getElementById("chk-address").checked &&
      !validateField(address)) ||
    (document.getElementById("chk-detailAddress").checked &&
      !validateField(detailAddress)) ||
    (document.getElementById("chk-phone").checked &&
      !validateField(phone, /^010-\d{4}-[0-9]{4}$/)) ||
    (document.getElementById("chk-inquiry").checked && !validateField(inquiry))
  ) {
    alert("체크된 항목은 모두 올바르게 입력해 주세요.");
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
  document.getElementById("previewArea").scrollIntoView({ behavior: "smooth" });
});

// 제출하기 버튼 이벤트
document.getElementById("submitBtn").addEventListener("click", function () {
  var name = document.getElementById("chk-name").checked
    ? document.getElementById("name").value
    : "";
  var age = document.getElementById("chk-age").checked
    ? document.getElementById("age").value
    : "";
  var gender = document.getElementById("chk-gender").checked
    ? document.getElementById("gender").value
    : "";
  var address = document.getElementById("chk-address").checked
    ? document.getElementById("address").value
    : "";
  var detailAddress = document.getElementById("chk-detailAddress").checked
    ? document.getElementById("detailAddress").value
    : "";
  var phone = document.getElementById("chk-phone").checked
    ? document.getElementById("phone").value
    : "";
  var inquiry = document.getElementById("chk-inquiry").checked
    ? document.getElementById("inquiry").value
    : "";
  if (
    (document.getElementById("chk-name").checked && !validateField(name)) ||
    (document.getElementById("chk-age").checked && !validateField(age)) ||
    (document.getElementById("chk-gender").checked && !validateField(gender)) ||
    (document.getElementById("chk-address").checked &&
      !validateField(address)) ||
    (document.getElementById("chk-detailAddress").checked &&
      !validateField(detailAddress)) ||
    (document.getElementById("chk-phone").checked &&
      !validateField(phone, /^010-\d{4}-[0-9]{4}$/)) ||
    (document.getElementById("chk-inquiry").checked && !validateField(inquiry))
  ) {
    alert("체크된 항목은 모두 올바르게 입력해 주세요.");
    return;
  }
  var templateParams = {
    name: name,
    age: age,
    gender: gender,
    address: address,
    detailAddress: detailAddress,
    phone: phone,
    inquiry: inquiry,
    to_email: "shecretto@gmail.com",
  };
  emailjs.send("service_shecretto", "template_j86y56e", templateParams).then(
    function (response) {
      alert("문의가 성공적으로 전송되었습니다!");
      document.getElementById("contactForm").reset();
      document.getElementById("previewArea").style.display = "none";
    },
    function (error) {
      alert("전송에 실패했습니다. 다시 시도해주세요.");
      console.error("메일 전송 실패:", error);
    }
  );
});
