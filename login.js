// ======================================================
// ZenitCU LOGIN
// ======================================================

const BANKING_API_URL =
  "https://api.justdoks.com/api";

const loginForm =
  document.querySelector(".login-form");


// ======================================================
// LOGIN FORM
// ======================================================

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();


      // ================================================
      // GET FORM VALUES
      // ================================================

      const accountNumber =
        document
          .getElementById("account-number")
          .value
          .trim();


      const accountPin =
        document
          .getElementById("password")
          .value
          .trim();


      // ================================================
      // VALIDATION
      // ================================================

      if (
        !accountNumber ||
        !accountPin
      ) {

        alert(
          "Please enter your account number and PIN."
        );

        return;

      }


      // ================================================
      // SEND LOGIN REQUEST
      // ================================================

      try {

        const response =
          await fetch(
            `${BANKING_API_URL}/banking/login`,
            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                accountNumber:
                  accountNumber,

                accountPin:
                  accountPin

              })

            }
          );


        const data =
          await response.json();


        console.log(
          "Bank login response:",
          data
        );


        // ============================================
        // LOGIN ERROR
        // ============================================

        if (!response.ok) {

          alert(
            data.message ||
              "Invalid account number or PIN."
          );

          return;

        }


        // ============================================
        // LOGIN SUCCESS
        // ============================================

        sessionStorage.setItem(
          "brightBankAccount",
          JSON.stringify(
            data.account
          )
        );


        // ============================================
        // GO TO DASHBOARD
        // ============================================

        window.location.href =
          "dashboard.html";

    }

      catch (error) {

        console.error(
          "BrightBank login error:",
          error
        );


        alert(
          "Unable to connect to the banking server."
        );

      }

    }
  );

}