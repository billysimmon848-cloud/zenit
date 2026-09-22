// ======================================================
// NAVIGATION
// ======================================================

const navMenu = document.getElementById("navMenu");
const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {

    const isOpen =
      navMenu.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });

}


// ======================================================
// ACCORDION CARDS
// ======================================================

const accordionCards =
  document.querySelectorAll(".accordion-card");

accordionCards.forEach((card) => {

  const trigger =
    card.querySelector(".feature-trigger");

  if (!trigger) return;

  trigger.addEventListener("click", () => {

    const isOpen =
      card.classList.contains("is-open");

    accordionCards.forEach((item) => {

      const itemTrigger =
        item.querySelector(".feature-trigger");

      item.classList.remove("is-open");

      if (itemTrigger) {
        itemTrigger.setAttribute(
          "aria-expanded",
          "false"
        );
      }

    });

    if (!isOpen) {

      card.classList.add("is-open");

      trigger.setAttribute(
        "aria-expanded",
        "true"
      );

    }

  });

});


// ======================================================
// DROPDOWN MENUS
// ======================================================

const menuParents =
  document.querySelectorAll(".has-menu");

menuParents.forEach((menuItem) => {

  const subMenu =
    menuItem.querySelector(
      ":scope > .dropdown-menu"
    );

  if (!subMenu) return;

  menuItem.addEventListener(
    "mouseenter",
    () => {
      menuItem.classList.add("open");
    }
  );

  menuItem.addEventListener(
    "mouseleave",
    () => {
      menuItem.classList.remove("open");
    }
  );

  menuItem.addEventListener(
    "focusin",
    () => {
      menuItem.classList.add("open");
    }
  );

  menuItem.addEventListener(
    "focusout",
    (event) => {

      if (
        !menuItem.contains(event.relatedTarget)
      ) {

        menuItem.classList.remove("open");

      }

    }
  );

});


// ======================================================
// LOAN CALCULATOR
// ======================================================

const loanAmountInput =
  document.getElementById("loanAmount");

const interestRateInput =
  document.getElementById("interestRate");

const loanTermInput =
  document.getElementById("loanTerm");

const calculateBtn =
  document.getElementById("calculateBtn");

const monthlyPaymentEl =
  document.getElementById("monthlyPayment");


if (
  calculateBtn &&
  monthlyPaymentEl
) {

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);


  const calculateMonthlyPayment = () => {

    const principal =
      Number(loanAmountInput.value) || 0;

    const annualRate =
      Number(interestRateInput.value) || 0;

    const months =
      Number(loanTermInput.value) || 0;


    if (
      principal <= 0 ||
      months <= 0
    ) {

      monthlyPaymentEl.textContent =
        "$0.00";

      return;

    }


    const monthlyRate =
      annualRate / 100 / 12;


    if (monthlyRate === 0) {

      monthlyPaymentEl.textContent =
        formatCurrency(
          principal / months
        );

      return;

    }


    const payment =
      (
        principal *
        monthlyRate *
        Math.pow(
          1 + monthlyRate,
          months
        )
      ) /
      (
        Math.pow(
          1 + monthlyRate,
          months
        ) - 1
      );


    monthlyPaymentEl.textContent =
      formatCurrency(payment);

  };


  calculateBtn.addEventListener(
    "click",
    calculateMonthlyPayment
  );

  calculateMonthlyPayment();

}


// ======================================================
// FAQ
// ======================================================

const faqItems =
  document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

  const button =
    item.querySelector(".faq-question");

  if (!button) return;

  button.addEventListener("click", () => {

    const isOpen =
      item.classList.contains("active");

    faqItems.forEach((faqItem) => {

      faqItem.classList.remove("active");

    });

    if (!isOpen) {

      item.classList.add("active");

    }

  });

});


// ======================================================
// YEAR
// ======================================================

const yearEl =
  document.getElementById("year");

if (yearEl) {

  yearEl.textContent =
    new Date().getFullYear();

}


// ======================================================
// BANKING CONTROLLER
// ======================================================

const BANK_ACCOUNTS_KEY =
  "myCargoLaneBankAccounts";

const bankingForm =
  document.getElementById("bankingForm");

const createdAccounts =
  document.getElementById("createdAccounts");

const createAccountView =
  document.getElementById("createAccountView");

const selectedAccountView =
  document.getElementById("selectedAccountView");

const newAccountBtn =
  document.getElementById("newAccountBtn");

const bankingMessage =
  document.getElementById("bankingMessage");


const profilePicture =
  document.getElementById("profilePicture");

const profilePreview =
  document.getElementById("profilePreview");

const profilePlaceholder =
  document.getElementById("profilePlaceholder");


const selectedAccountName =
  document.getElementById(
    "selectedAccountName"
  );

const selectedAccountNumber =
  document.getElementById(
    "selectedAccountNumber"
  );


const accountSettingsForm =
  document.getElementById(
    "accountSettingsForm"
  );

const accountSettingsBtn =
  document.getElementById(
    "accountSettingsBtn"
  );

const transactionsBtn =
  document.getElementById(
    "transactionsBtn"
  );


const settingsContent =
  document.getElementById(
    "settingsContent"
  );

const transactionsContent =
  document.getElementById(
    "transactionsContent"
  );


const settingsProfilePicture =
  document.getElementById(
    "settingsProfilePicture"
  );

const settingsProfilePreview =
  document.getElementById(
    "settingsProfilePreview"
  );

const settingsProfilePlaceholder =
  document.getElementById(
    "settingsProfilePlaceholder"
  );


const settingsFullName =
  document.getElementById(
    "settingsFullName"
  );

const settingsEmail =
  document.getElementById(
    "settingsEmail"
  );

const settingsAccountType =
  document.getElementById(
    "settingsAccountType"
  );

const settingsAccountCurrency =
  document.getElementById(
    "settingsAccountCurrency"
  );

const settingsTransactionProcessingTime =
  document.getElementById(
    "settingsTransactionProcessingTime"
  );

const settingsAccountPin =
  document.getElementById(
    "settingsAccountPin"
  );


const accountBalance =
  document.getElementById(
    "accountBalance"
  );

const transactionForm =
  document.getElementById(
    "transactionForm"
  );

const transactionType =
  document.getElementById(
    "transactionType"
  );

const transactionAmount =
  document.getElementById(
    "transactionAmount"
  );

const transactionNarration =
  document.getElementById(
    "transactionNarration"
  );

const transactionDate =
  document.getElementById(
    "transactionDate"
  );

const transactionHistory =
  document.getElementById(
    "transactionHistory"
  );


let selectedAccountId = null;

let settingsProfileImageData = "";


// ======================================================
// LOCAL CONTROLLER CACHE
// ======================================================

function getAccounts() {

  try {

    return (
      JSON.parse(
        localStorage.getItem(
          BANK_ACCOUNTS_KEY
        )
      ) || []
    );

  }

  catch (error) {

    return [];

  }

}


function saveAccounts(accounts) {

  localStorage.setItem(
    BANK_ACCOUNTS_KEY,
    JSON.stringify(accounts)
  );

}


// ======================================================
// MESSAGE
// ======================================================

function showMessage(
  message,
  type = "success"
) {

  if (!bankingMessage) {
    return;
  }

  bankingMessage.textContent =
    message;

  bankingMessage.className =
    "banking-message " + type;


  setTimeout(() => {

    bankingMessage.textContent =
      "";

    bankingMessage.className =
      "banking-message";

  }, 3000);

}


// ======================================================
// CURRENCY
// ======================================================

const currencySymbols = {

  USD: "$",

  NGN: "₦",

  GBP: "£",

  EUR: "€",

  CAD: "CA$",

  AUD: "AU$",

  GHS: "GH₵",

  KES: "KSh",

  ZAR: "R",

  INR: "₹",

  AED: "د.إ",

  JPY: "¥",

  CNY: "¥",

  CHF: "CHF"

};


function formatMoney(
  amount,
  currency
) {

  const symbol =
    currencySymbols[currency] || "$";


  return (

    symbol +

    Number(
      amount || 0
    ).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    )

  );

}


// ======================================================
// PROFILE PREVIEW
// ======================================================

function showProfilePreview(
  input,
  preview,
  placeholder
) {

  if (
    !input ||
    !preview ||
    !placeholder
  ) {

    return;

  }


  if (
    input.files &&
    input.files[0]
  ) {

    const reader =
      new FileReader();


    reader.onload =
      function (event) {

        preview.src =
          event.target.result;

        preview.style.display =
          "block";

        placeholder.style.display =
          "none";

      };


    reader.readAsDataURL(
      input.files[0]
    );

  }

}


if (profilePicture) {

  profilePicture.addEventListener(
    "change",
    function () {

      showProfilePreview(
        profilePicture,
        profilePreview,
        profilePlaceholder
      );

    }
  );

}


if (settingsProfilePicture) {

  settingsProfilePicture.addEventListener(
    "change",
    function () {

      showProfilePreview(
        settingsProfilePicture,
        settingsProfilePreview,
        settingsProfilePlaceholder
      );

    }
  );

}


// ======================================================
// CREATE BANK ACCOUNT
// ======================================================

if (bankingForm) {

  bankingForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();


      const fullName =
        document.getElementById(
          "fullName"
        ).value.trim();


      const email =
        document.getElementById(
          "email"
        ).value.trim();


      const accountType =
        document.getElementById(
          "accountType"
        ).value;


      const accountCurrency =
        document.getElementById(
          "accountCurrency"
        ).value;


      const transactionProcessingTime =
        document.getElementById(
          "transactionProcessingTime"
        ).value;


      const accountPin =
        document.getElementById(
          "accountPin"
        ).value.trim();


      // ==========================================
      // VALIDATION
      // ==========================================

      if (
        !fullName ||
        !email ||
        !accountType ||
        !accountCurrency ||
        !transactionProcessingTime ||
        !accountPin
      ) {

        showMessage(
          "Please complete all required fields.",
          "error"
        );

        return;

      }


      if (
        !/^\d{4,6}$/.test(accountPin)
      ) {

        showMessage(
          "Account PIN must contain 4 to 6 digits.",
          "error"
        );

        return;

      }


      // ==========================================
      // PROFILE IMAGE
      // ==========================================

      const profilePictureData =
        profilePreview &&
        profilePreview.src
          ? profilePreview.src
          : "";


      // ==========================================
      // SEND ACCOUNT TO BACKEND
      // ==========================================

      try {

        const response =
          await fetch(
            "https://api.justdoks.com/api/banking/accounts",
            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                fullName:
                  fullName,

                email:
                  email,

                accountType:
                  accountType,

                accountCurrency:
                  accountCurrency,

                transactionProcessingTime:
                  transactionProcessingTime,

                accountPin:
                  accountPin,

                profilePicture:
                  profilePictureData

              })

            }
          );


        const data =
          await response.json();


        // ========================================
        // BACKEND ERROR
        // ========================================

        if (!response.ok) {

          showMessage(
            data.message ||
              "Failed to create bank account.",
            "error"
          );

          return;

        }


        // ========================================
        // ACCOUNT FROM DATABASE
        // ========================================

        const account = {

          id:
            data.account.id,

          accountNumber:
            data.account.accountNumber,

          fullName:
            data.account.fullName,

          email:
            data.account.email,

          accountType:
            data.account.accountType,

          accountCurrency:
            data.account.accountCurrency,

          transactionProcessingTime:
            transactionProcessingTime,

          accountPin:
            accountPin,

          profilePicture:
            profilePictureData,

          balance: 0,

          transactions: [],

          createdAt:
            new Date().toISOString()

        };


        // ========================================
        // KEEP CONTROLLER DISPLAY WORKING
        // ========================================

        const accounts =
          getAccounts();


        accounts.push(account);


        saveAccounts(accounts);


        // ========================================
        // REFRESH ACCOUNT LIST
        // ========================================

        renderAccounts();


        bankingForm.reset();


        if (profilePreview) {

          profilePreview.src =
            "";

          profilePreview.style.display =
            "none";

        }


        if (profilePlaceholder) {

          profilePlaceholder.style.display =
            "flex";

        }


        showMessage(
          "Bank account created successfully. Account Number: " +
            account.accountNumber,
          "success"
        );


        selectedAccountId =
          null;


        if (createAccountView) {

          createAccountView.style.display =
            "block";

        }


        if (selectedAccountView) {

          selectedAccountView.style.display =
            "none";

        }

      }

      catch (error) {

        console.error(
          "Bank account creation error:",
          error
        );


        showMessage(
          "Unable to connect to the banking server.",
          "error"
        );

      }

    }
  );

}


// ======================================================
// RENDER ACCOUNTS
// ======================================================

function renderAccounts() {

  if (!createdAccounts) {
    return;
  }


  const accounts =
    getAccounts();


  createdAccounts.innerHTML =
    "";


  accounts.forEach(
    (account) => {

      const card =
        document.createElement("div");


      card.className =
        "account-card";


      if (
        account.id ===
        selectedAccountId
      ) {

        card.classList.add(
          "active"
        );

      }


      let profileHTML =
        "";


      if (
        account.profilePicture
      ) {

        profileHTML = `

          <img
            src="${account.profilePicture}"
            alt="Profile"
            class="account-profile-image"
          >

        `;

      }

      else {

        const initials =
          account.fullName
            .split(" ")
            .filter(Boolean)
            .map(
              name =>
                name.charAt(0)
            )
            .slice(0, 2)
            .join("")
            .toUpperCase();


        profileHTML = `

          <div class="account-profile-placeholder">

            ${initials}

          </div>

        `;

      }


      card.innerHTML = `

        ${profileHTML}

        <div class="account-card-info">

          <div class="account-card-name">

            ${account.fullName}

          </div>

          <div class="account-card-number">

            ${account.accountNumber}

          </div>

        </div>

      `;


      card.addEventListener(
        "click",
        function () {

          openAccount(
            account.id
          );

        }
      );


      createdAccounts.appendChild(
        card
      );

    }
  );

}


// ======================================================
// OPEN ACCOUNT
// ======================================================

function openAccount(
  accountId
) {

  const accounts =
    getAccounts();


  const account =
    accounts.find(
      item =>
        item.id === accountId
    );


  if (!account) {
    return;
  }


  selectedAccountId =
    account.id;


  if (createAccountView) {

    createAccountView.style.display =
      "none";

  }


  if (selectedAccountView) {

    selectedAccountView.style.display =
      "block";

  }


  if (selectedAccountName) {

    selectedAccountName.textContent =
      account.fullName;

  }


  if (selectedAccountNumber) {

    selectedAccountNumber.textContent =
      account.accountNumber;

  }


  loadAccountSettings(
    account
  );


  if (settingsContent) {

    settingsContent.style.display =
      "block";

  }


  if (transactionsContent) {

    transactionsContent.style.display =
      "none";

  }


  if (accountSettingsBtn) {

    accountSettingsBtn.classList.add(
      "active"
    );

  }


  if (transactionsBtn) {

    transactionsBtn.classList.remove(
      "active"
    );

  }


  renderAccounts();

}


// ======================================================
// LOAD ACCOUNT SETTINGS
// ======================================================

function loadAccountSettings(
  account
) {

  if (settingsFullName) {

    settingsFullName.value =
      account.fullName || "";

  }


  if (settingsEmail) {

    settingsEmail.value =
      account.email || "";

  }


  if (settingsAccountType) {

    settingsAccountType.value =
      account.accountType || "";

  }


  if (settingsAccountCurrency) {

    settingsAccountCurrency.value =
      account.accountCurrency ||
      "USD";

  }


  if (
    settingsTransactionProcessingTime
  ) {

    settingsTransactionProcessingTime.value =
      account.transactionProcessingTime ||
      "";

  }


  if (settingsAccountPin) {

    settingsAccountPin.value =
      account.accountPin || "";

  }


  settingsProfileImageData =
    account.profilePicture || "";


  if (
    settingsProfileImageData &&
    settingsProfilePreview
  ) {

    settingsProfilePreview.src =
      settingsProfileImageData;

    settingsProfilePreview.style.display =
      "block";


    if (settingsProfilePlaceholder) {

      settingsProfilePlaceholder.style.display =
        "none";

    }

  }

  else {

    if (settingsProfilePreview) {

      settingsProfilePreview.src =
        "";

      settingsProfilePreview.style.display =
        "none";

    }


    if (settingsProfilePlaceholder) {

      settingsProfilePlaceholder.style.display =
        "flex";

    }

  }


  renderTransactions(
    account
  );

}


// ======================================================
// ACCOUNT SETTINGS BUTTON
// ======================================================

if (accountSettingsBtn) {

  accountSettingsBtn.addEventListener(
    "click",
    function () {

      if (settingsContent) {

        settingsContent.style.display =
          "block";

      }


      if (transactionsContent) {

        transactionsContent.style.display =
          "none";

      }


      accountSettingsBtn.classList.add(
        "active"
      );


      if (transactionsBtn) {

        transactionsBtn.classList.remove(
          "active"
        );

      }

    }
  );

}


// ======================================================
// TRANSACTIONS BUTTON
// ======================================================

if (transactionsBtn) {

  transactionsBtn.addEventListener(
    "click",
    function () {

      if (settingsContent) {

        settingsContent.style.display =
          "none";

      }


      if (transactionsContent) {

        transactionsContent.style.display =
          "block";

      }


      transactionsBtn.classList.add(
        "active"
      );


      if (accountSettingsBtn) {

        accountSettingsBtn.classList.remove(
          "active"
        );

      }


      const accounts =
        getAccounts();


      const account =
        accounts.find(
          item =>
            item.id ===
            selectedAccountId
        );


      if (account) {

        renderTransactions(
          account
        );

      }

    }
  );

}


// ======================================================
// ACCOUNT SETTINGS FORM
// ======================================================

if (accountSettingsForm) {

  accountSettingsForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      if (!selectedAccountId) {
        return;
      }


      const accounts =
        getAccounts();


      const accountIndex =
        accounts.findIndex(
          account =>
            account.id ===
            selectedAccountId
        );


      if (accountIndex === -1) {
        return;
      }


      let profilePictureData =
        settingsProfileImageData;


      if (
        settingsProfilePreview &&
        settingsProfilePreview.style.display !==
          "none" &&
        settingsProfilePreview.src
      ) {

        profilePictureData =
          settingsProfilePreview.src;

      }


      accounts[accountIndex].fullName =
        settingsFullName.value.trim();


      accounts[accountIndex].email =
        settingsEmail.value.trim();


      accounts[accountIndex].accountType =
        settingsAccountType.value;


      accounts[accountIndex].accountCurrency =
        settingsAccountCurrency.value;


      accounts[accountIndex].transactionProcessingTime =
        settingsTransactionProcessingTime.value;


      accounts[accountIndex].accountPin =
        settingsAccountPin.value.trim();


      accounts[accountIndex].profilePicture =
        profilePictureData;


      saveAccounts(
        accounts
      );


      if (selectedAccountName) {

        selectedAccountName.textContent =
          accounts[accountIndex].fullName;

      }


      renderAccounts();


      showMessage(
        "Account settings updated successfully.",
        "success"
      );

    }
  );

}


// ======================================================
// TRANSACTION DATE
// ======================================================

function setCurrentTransactionDate() {

  if (!transactionDate) {
    return;
  }


  const now =
    new Date();


  const year =
    now.getFullYear();


  const month =
    String(
      now.getMonth() + 1
    ).padStart(2, "0");


  const day =
    String(
      now.getDate()
    ).padStart(2, "0");


  const hours =
    String(
      now.getHours()
    ).padStart(2, "0");


  const minutes =
    String(
      now.getMinutes()
    ).padStart(2, "0");


  transactionDate.value =
    `${year}-${month}-${day}T${hours}:${minutes}`;

}


// ======================================================
// TRANSACTION FORM
// ======================================================

if (transactionForm) {

  transactionForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      if (!selectedAccountId) {

        showMessage(
          "Please select an account first.",
          "error"
        );

        return;

      }


      const accounts =
        getAccounts();


      const accountIndex =
        accounts.findIndex(
          account =>
            account.id ===
            selectedAccountId
        );


      if (accountIndex === -1) {
        return;
      }


      const account =
        accounts[accountIndex];


      const type =
        transactionType.value;


      const amount =
        Number(
          transactionAmount.value
        );


      const narration =
        transactionNarration.value.trim();


      const date =
        transactionDate.value;


      if (
        !type ||
        !amount ||
        amount <= 0 ||
        !narration ||
        !date
      ) {

        showMessage(
          "Please complete all transaction fields.",
          "error"
        );

        return;

      }


      if (
        type === "debit" &&
        amount >
          Number(
            account.balance || 0
          )
      ) {

        showMessage(
          "Insufficient account balance.",
          "error"
        );

        return;

      }


      if (type === "credit") {

        account.balance =
          Number(
            account.balance || 0
          ) + amount;

      }


      if (type === "debit") {

        account.balance =
          Number(
            account.balance || 0
          ) - amount;

      }


      if (
        !Array.isArray(
          account.transactions
        )
      ) {

        account.transactions =
          [];

      }


      account.transactions.unshift({

        id:
          Date.now().toString(36) +
          Math.random()
            .toString(36)
            .substring(2, 9),

        type:
          type,

        amount:
          amount,

        narration:
          narration,

        date:
          date,

        createdAt:
          new Date().toISOString()

      });


      saveAccounts(
        accounts
      );


      transactionForm.reset();


      setCurrentTransactionDate();


      renderTransactions(
        account
      );


      renderAccounts();


      showMessage(
        "Transaction added successfully.",
        "success"
      );

    }
  );

}


// ======================================================
// RENDER TRANSACTIONS
// ======================================================

function renderTransactions(
  account
) {

  if (
    !accountBalance ||
    !transactionHistory
  ) {

    return;

  }


  accountBalance.textContent =
    formatMoney(
      account.balance,
      account.accountCurrency
    );


  transactionHistory.innerHTML =
    "";


  const transactions =
    Array.isArray(
      account.transactions
    )
      ? account.transactions
      : [];


  if (
    transactions.length === 0
  ) {

    transactionHistory.innerHTML = `

      <div class="empty-transactions">

        No transactions yet.

      </div>

    `;

    return;

  }


  transactions.forEach(
    (transaction) => {

      const row =
        document.createElement(
          "div"
        );


      row.className =
        "transaction-row " +
        transaction.type;


      const sign =
        transaction.type ===
        "credit"
          ? "+"
          : "-";


      row.innerHTML = `

        <div class="transaction-type">

          ${
            transaction.type ===
            "credit"
              ? "Credit"
              : "Debit"
          }

        </div>


        <div class="transaction-narration">

          ${transaction.narration}

        </div>


        <div class="transaction-amount">

          ${sign}${formatMoney(
            transaction.amount,
            account.accountCurrency
          )}

        </div>


        <div class="transaction-date">

          ${new Date(
            transaction.date
          ).toLocaleString()}

        </div>

      `;


      transactionHistory.appendChild(
        row
      );

    }
  );

}


// ======================================================
// NEW ACCOUNT BUTTON
// ======================================================

if (newAccountBtn) {

  newAccountBtn.addEventListener(
    "click",
    function () {

      selectedAccountId =
        null;


      if (selectedAccountView) {

        selectedAccountView.style.display =
          "none";

      }


      if (createAccountView) {

        createAccountView.style.display =
          "block";

      }


      renderAccounts();

    }
  );

}


// ======================================================
// INITIALIZE BANKING CONTROLLER
// ======================================================

setCurrentTransactionDate();

renderAccounts();


if (createAccountView) {

  createAccountView.style.display =
    "block";

}


if (selectedAccountView) {

  selectedAccountView.style.display =
    "none";

}