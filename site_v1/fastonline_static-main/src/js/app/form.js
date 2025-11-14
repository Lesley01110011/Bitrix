import axios from "axios";
import { Fancybox } from "@fancyapps/ui";

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("[data-form]");
  forms.forEach((form) => {
    new Form(form);
  });
});

class Form {
  constructor(el) {
    this.form = el;
    this.url = this.form.getAttribute("action");
    this.successMsg = this.form.querySelector("[data-form-success]");
    this.errorMsg = this.form.querySelector("[data-form-error]");
    this.button = this.form.querySelector("[data-form-submit]");
    this.inputs = this.form.querySelectorAll("input");
    this.agreement = this.form.querySelector("[data-form-agreement]");
    this.formValid = this.form.getAttribute("data-form-valid");
    this.validateInputs();
    this.submit();
  }

  validateInputs() {
    const errorMsg = "Поле заполнено неверно";
    this.inputs.forEach((el) => {
      const inputParent = el.closest("label");
      const textTmpl = inputParent.querySelector("span");
      if (el.type == "email") {
        const maskEmail = new RegExp(
          "^([A-Za-z0-9_-]+\\.)*[A-Za-z0-9_-]+@[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*\\.[A-Za-z]{2,6}$"
        );
        el.addEventListener("blur", () => {
          if (maskEmail.test(el.value)) {
            el.setAttribute("data-valid", true);
            textTmpl.innerHTML = el.placeholder;
          } else {
            el.setAttribute("data-valid", false);
            textTmpl.innerHTML = errorMsg;
            el.focus();
          }
        });
      } else if (el.type == "tel") {
        el.addEventListener("blur", () => {
          if (el.value.length < 17) {
            textTmpl.innerHTML = errorMsg;
            el.setAttribute("data-valid", false);
            this.form.setAttribute("data-form-valid", false);
            el.focus();
          } else {
            el.setAttribute("data-valid", true);
            this.form.setAttribute("data-form-valid", true);
            textTmpl.innerHTML = el.placeholder;
          }
        });
      }
    });
  }

  checkAgreement() {
    this.agreement.addEventListener("change", () => {
      console.log("check agreement")
      if (this.agreement.checked) {
        this.disableSubmit(false);
      } else {
        this.disableSubmit(true);
      }
    });
  }

  disableSubmit(state) {
    if (state) {
      this.button.setAttribute("disabled", "disabled");
    } else {
      this.button.removeAttribute("disabled");
      this.button.innerHTML = "Отправить";
    }
  }

  getData() {
    const data = new FormData();
    const els = [
      ...this.form.querySelectorAll("input"),
      ...this.form.querySelectorAll("textarea"),
      ...this.form.querySelectorAll("select")
    ];

    els.forEach((item) => {
      if (item.type === "file") {
        data.append(item.name, item.files[0]);
      } else if (item.type === "radio" || item.type === "checkbox") {
        if (item.checked) data.append(item.name, item.value);
      } else {
        data.append(item.name, item.value);
      }
    });

    return data;
  }

  submit() {
    this.checkAgreement();
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.form.getAttribute("data-form-valid")) {
        axios
          .post(this.url, this.getData())
          .then((response) => {
            this.showSuccess();
            console.log(response);
          })
          .catch((error) => {
            this.showError();
            console.error(error);
          })
          .finally(() => {
            setTimeout(() => {
              this.form.reset();
              Fancybox.close();
              this.successMsg.classList.remove("show");
              this.errorMsg.classList.remove("show");
            }, 2000);
          });
      } else {
        this.disableSubmit(true);
        this.button.innerHTML = "Заполните обязательные поля";
      }
    });
  }

  showSuccess() {
    this.successMsg.classList.add("show");
  }

  showError() {
    this.errorMsg.classList.add("show");
  }
}
