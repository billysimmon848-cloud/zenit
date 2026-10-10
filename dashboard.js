// ======================================================
// ZenitCU DASHBOARD
// ======================================================

const BANKING_API_URL =
  "https://api.justdoks.com/api";


// ======================================================
// DOM ELEMENTS
// ======================================================

const customerName =
  document.getElementById("customerName");

const balanceAmount =
  document.getElementById("balanceAmount");

const balanceCurrency =
  document.getElementById("balanceCurrency");

const accountNumber =
  document.getElementById("accountNumber");

const accountType =
  document.getElementById("accountType");

const summaryAccountNumber =
  document.getElementById("summaryAccountNumber");

const summaryAccountType =
  document.getElementById("summaryAccountType");

const summaryCurrency =
  document.getElementById("summaryCurrency");

const viewTransactionsBtn =
  document.getElementById("viewTransactionsBtn");

const withdrawBtn =
  document.getElementById("withdrawBtn");

const profileBtn =
  document.getElementById("profileBtn");

const logoutBtn =
  document.getElementById("logoutBtn");

const logoutActionBtn =
  document.getElementById("logoutActionBtn");

const homeBtn =
  document.getElementById("homeBtn");

const transactionsNavBtn =
  document.getElementById("transactionsNavBtn");

const withdrawSection =
  document.getElementById("withdrawSection");

const withdrawForm =
  document.getElementById("withdrawForm");

const withdrawAmount =
  document.getElementById("withdrawAmount");

const withdrawMessage =
  document.getElementById("withdrawMessage");

const withdrawSubmitBtn =
  document.getElementById("withdrawSubmitBtn");

const transactionsSection =
  document.getElementById("transactionsSection");

const transactionCount =
  document.getElementById("transactionCount");

const transactionList =
  document.getElementById("transactionList");

const profileSection =
  document.getElementById("profileSection");

const profilePlaceholder =
  document.getElementById("profilePlaceholder");

const profileImage =
  document.getElementById("profileImage");

const profileName =
  document.getElementById("profileName");

const profileEmail =
  document.getElementById("profileEmail");

const profilePhone =
  document.getElementById("profilePhone");

const profileDateOfBirth =
  document.getElementById("profileDateOfBirth");

const profileGender =
  document.getElementById("profileGender");

const profileOccupation =
  document.getElementById("profileOccupation");

const profileAddress =
  document.getElementById("profileAddress");

const profileStateCity =
  document.getElementById("profileStateCity");

const profileCountry =
  document.getElementById("profileCountry");

const accountMessageCard =
  document.getElementById("accountMessageCard");

const accountMessageText =
  document.getElementById("accountMessageText");


// ======================================================
// CURRENT ACCOUNT
// ======================================================

let currentAccount = null;


// ======================================================
// POPUP TIMERS
// ======================================================

let bankingPlanPopupTimer = null;

let bankingPlanRepeatTimer = null;

let bankingPlanPopupShown = false;


// ======================================================
// POPUP TIMING
// ======================================================

// First popup appears 5 seconds after dashboard loads.

const FIRST_POPUP_DELAY =
  5000;


// Popup appears again 30 seconds after
// "Maybe Later" is clicked.

const REPEAT_POPUP_DELAY =
  30000;


// ======================================================
// GET SAVED ACCOUNT
// ======================================================

function getSavedAccount() {

  const savedAccount =
    sessionStorage.getItem(
      "brightBankAccount"
    );


  if (!savedAccount) {
    return null;
  }


  try {

    return JSON.parse(
      savedAccount
    );

  }
  catch (error) {

    console.error(
      "Invalid saved account:",
      error
    );


    sessionStorage.removeItem(
      "brightBankAccount"
    );


    return null;
  }
}


// ======================================================
// SAVE ACCOUNT
// ======================================================

function saveAccount(account) {

  currentAccount =
    account;


  sessionStorage.setItem(
    "brightBankAccount",
    JSON.stringify(account)
  );
}


// ======================================================
// GET ACCOUNT NUMBER
// ======================================================

function getAccountNumber() {

  if (
    currentAccount &&
    currentAccount.accountNumber
  ) {

    return currentAccount.accountNumber;
  }


  const savedAccount =
    getSavedAccount();


  if (
    savedAccount &&
    savedAccount.accountNumber
  ) {

    return savedAccount.accountNumber;
  }


  return null;
}


// ======================================================
// LOAD LIVE ACCOUNT
// ======================================================

async function loadAccount() {

  const savedAccount =
    getSavedAccount();


  if (
    !savedAccount ||
    !savedAccount.accountNumber
  ) {

    window.location.href =
      "index.html";

    return;
  }


  try {

    const response =
      await fetch(
        `${BANKING_API_URL}/banking/accounts/${encodeURIComponent(
          savedAccount.accountNumber
        )}`
      );


    const data =
      await response.json();


    if (!response.ok) {

      alert(
        data.message ||
        "Unable to load your account."
      );


      sessionStorage.removeItem(
        "brightBankAccount"
      );


      window.location.href =
        "index.html";


      return;
    }


    // --------------------------------------------------
    // SAVE LIVE ACCOUNT
    // --------------------------------------------------

    saveAccount(
      data.account
    );


    // --------------------------------------------------
    // DISPLAY LIVE ACCOUNT
    // --------------------------------------------------

    displayAccount(
      data.account
    );


    // --------------------------------------------------
    // START PLAN POPUP SYSTEM
    // --------------------------------------------------

    scheduleBankingPlanPopup(
      data.account
    );

  }
  catch (error) {

    console.error(
      "Load account error:",
      error
    );


    alert(
      "Unable to connect to the banking server."
    );
  }
}


// ======================================================
// DISPLAY ACCOUNT
// ======================================================

function displayAccount(account) {

  if (!account) {
    return;
  }


  // ====================================================
  // CUSTOMER NAME
  // ====================================================

  if (customerName) {

    customerName.textContent =
      account.fullName ||
      "Customer";
  }


  // ====================================================
  // CUSTOMER ACCOUNT MESSAGE
  // ====================================================

  if (
    accountMessageCard &&
    accountMessageText
  ) {

    const message =
      String(
        account.errorMessage || ""
      ).trim();


    if (message) {

      accountMessageText.textContent =
        message;

      accountMessageCard.style.display =
        "block";

    }
    else {

      accountMessageText.textContent =
        "";

      accountMessageCard.style.display =
        "none";
    }
  }


  // ====================================================
  // BALANCE
  // ====================================================

  if (balanceAmount) {

    const currency =
      account.accountCurrency ||
      "USD";


    const amount =
      Number(
        account.balance || 0
      );


    balanceAmount.textContent =
      new Intl.NumberFormat(
        "en-US",
        {
          style: "currency",
          currency: currency
        }
      ).format(
        amount
      );
  }


  // ====================================================
  // CURRENCY
  // ====================================================

  if (balanceCurrency) {

    balanceCurrency.textContent =
      account.accountCurrency ||
      "USD";
  }


  // ====================================================
  // ACCOUNT NUMBER
  // ====================================================

  if (accountNumber) {

    accountNumber.textContent =
      account.accountNumber ||
      "----------";
  }


  if (summaryAccountNumber) {

    summaryAccountNumber.textContent =
      account.accountNumber ||
      "----------";
  }


  // ====================================================
  // ACCOUNT TYPE
  // ====================================================

  if (accountType) {

    accountType.textContent =
      account.accountType ||
      "Current";
  }


  if (summaryAccountType) {

    summaryAccountType.textContent =
      account.accountType ||
      "----------";
  }


  // ====================================================
  // SUMMARY CURRENCY
  // ====================================================

  if (summaryCurrency) {

    summaryCurrency.textContent =
      account.accountCurrency ||
      "USD";
  }


  // ====================================================
  // PROFILE
  // ====================================================

  if (profileName) {

    profileName.textContent =
      account.fullName ||
      "Customer";
  }


  if (profileEmail) {

    profileEmail.textContent =
      account.email ||
      "----------";
  }


  // ====================================================
  // PROFILE PERSONAL INFORMATION
  // ====================================================

  if (profilePhone) {
    profilePhone.textContent =
      account.phoneNumber || "----------";
  }

  if (profileDateOfBirth) {
    profileDateOfBirth.textContent =
      account.dateOfBirth || "----------";
  }

  if (profileGender) {
    profileGender.textContent =
      account.gender || "----------";
  }

  if (profileOccupation) {
    profileOccupation.textContent =
      account.occupation || "----------";
  }

  if (profileAddress) {
    profileAddress.textContent =
      account.address || "----------";
  }

  if (profileStateCity) {
    profileStateCity.textContent =
      account.stateCity || "----------";
  }

  if (profileCountry) {
    profileCountry.textContent =
      account.country || "----------";
  }



  // ====================================================
  // PROFILE IMAGE
  // ====================================================

  if (
    account.profilePicture &&
    account.profilePicture.trim() !== ""
  ) {

    if (profileImage) {

      profileImage.src =
        account.profilePicture;

      profileImage.style.display =
        "block";
    }


    if (profilePlaceholder) {

      profilePlaceholder.style.display =
        "none";
    }

  }
  else {

    if (profileImage) {

      profileImage.style.display =
        "none";
    }


    if (profilePlaceholder) {

      profilePlaceholder.style.display =
        "flex";
    }
  }


  // ====================================================
  // TRANSACTIONS
  // ====================================================

  renderTransactions(
    account.transactions || [],
    account.accountCurrency || "USD"
  );
}


// ======================================================
// BANKING PLAN POPUP SYSTEM
// ======================================================
//
// FREE / DEMO
//     -> Popup
//     -> Maybe Later
//     -> Wait 30 seconds
//     -> Popup again
//
// EXPIRED
//     -> Popup
//     -> Maybe Later
//     -> Wait 30 seconds
//     -> Popup again
//
// ACTIVE CLEAN / PAID
//     -> No popup
// ======================================================


// ======================================================
// CHECK IF ACCOUNT SHOULD RECEIVE POPUP
// ======================================================

function getBankingPopupType(account) {

  if (!account) {
    return null;
  }


  const plan =
    String(
      account.plan || ""
    )
      .trim()
      .toLowerCase();


  const planStatus =
    String(
      account.planStatus || ""
    )
      .trim()
      .toLowerCase();


  // ----------------------------------------------------
  // ACTIVE CLEAN / PAID
  // ----------------------------------------------------

  if (
    plan === "clean" &&
    planStatus === "paid"
  ) {

    return null;
  }


  // ----------------------------------------------------
  // EXPIRED
  // ----------------------------------------------------

  if (
    planStatus === "expired"
  ) {

    return "expired";
  }


  // ----------------------------------------------------
  // FREE / DEMO
  // ----------------------------------------------------

  if (
    plan === "free" ||
    planStatus === "demo"
  ) {

    return "free";
  }


  return null;
}


// ======================================================
// SCHEDULE FIRST POPUP
// ======================================================

function scheduleBankingPlanPopup(account) {

  const popupType =
    getBankingPopupType(
      account
    );


  // ----------------------------------------------------
  // ACTIVE ACCOUNT
  // ----------------------------------------------------

  if (!popupType) {

    clearBankingPlanTimers();

    return;
  }


  // ----------------------------------------------------
  // CLEAR ANY OLD TIMER
  // ----------------------------------------------------

  if (bankingPlanPopupTimer) {

    clearTimeout(
      bankingPlanPopupTimer
    );
  }


  // ----------------------------------------------------
  // FIRST POPUP
  // ----------------------------------------------------

  bankingPlanPopupTimer =
    setTimeout(
      function () {

        showBankingPlanPopup(
          popupType
        );

      },
      FIRST_POPUP_DELAY
    );
}


// ======================================================
// CREATE POPUP
// ======================================================

function createBankingPlanPopup() {

  if (
    document.getElementById(
      "bankingPlanPopup"
    )
  ) {

    return;
  }


  const popupContainer =
    document.createElement(
      "div"
    );


  popupContainer.id =
    "bankingPlanPopup";


  popupContainer.innerHTML =
    `
      <div
        class="banking-plan-overlay"
        id="bankingPlanOverlay"
      >

        <div
          class="banking-plan-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bankingPlanTitle"
        >

          <button
            type="button"
            class="banking-plan-close"
            id="bankingPlanClose"
            aria-label="Close"
          >
            &times;
          </button>


          <div class="banking-plan-icon">
            B
          </div>


          <div class="banking-plan-label">
            ZenitCU
          </div>


          <h2
            id="bankingPlanTitle"
            class="banking-plan-title"
          >
            You're Using ZenitCU Free
          </h2>


          <p
            id="bankingPlanDescription"
            class="banking-plan-description"
          >
            You're currently using a Free Banking account.
            Upgrade to Clean Banking whenever you're ready
            to enjoy the full ZenitCU experience.
          </p>


          <button
            type="button"
            class="banking-plan-secondary"
            id="bankingPlanSecondary"
          >
            Maybe Later
          </button>

        </div>

      </div>
    `;


  document.body.appendChild(
    popupContainer
  );


  addBankingPlanPopupStyles();


  // ----------------------------------------------------
  // CLOSE BUTTON
  // ----------------------------------------------------

  const closeButton =
    document.getElementById(
      "bankingPlanClose"
    );


  if (closeButton) {

    closeButton.addEventListener(
      "click",
      function () {

        closeBankingPlanPopup(
          true
        );

      }
    );
  }


  // ----------------------------------------------------
  // MAYBE LATER
  // ----------------------------------------------------

  const secondaryButton =
    document.getElementById(
      "bankingPlanSecondary"
    );


  if (secondaryButton) {

    secondaryButton.addEventListener(
      "click",
      function () {

        closeBankingPlanPopup(
          true
        );

      }
    );
  }


  // ----------------------------------------------------
  // CLICK OUTSIDE
  // ----------------------------------------------------

  const overlay =
    document.getElementById(
      "bankingPlanOverlay"
    );


  if (overlay) {

    overlay.addEventListener(
      "click",
      function (event) {

        if (
          event.target ===
          overlay
        ) {

          closeBankingPlanPopup(
            true
          );
        }
      }
    );
  }
}


// ======================================================
// SHOW POPUP
// ======================================================

function showBankingPlanPopup(type) {

  if (bankingPlanPopupShown) {
    return;
  }


  bankingPlanPopupShown =
    true;


  createBankingPlanPopup();


  const popup =
    document.getElementById(
      "bankingPlanPopup"
    );


  const title =
    document.getElementById(
      "bankingPlanTitle"
    );


  const description =
    document.getElementById(
      "bankingPlanDescription"
    );


  if (
    !popup ||
    !title ||
    !description
  ) {

    bankingPlanPopupShown =
      false;

    return;
  }


  // ====================================================
  // FREE
  // ====================================================

  if (
    type === "free"
  ) {

    title.textContent =
      "You're Using ZenitCU Free";


    description.textContent =
      "You're currently using a Free Banking account. Upgrade to Clean Banking whenever you're ready to enjoy the full ZenitCU experience.";
  }


  // ====================================================
  // EXPIRED
  // ====================================================

  if (
    type === "expired"
  ) {

    title.textContent =
      "Your Clean Banking Has Expired";


    description.textContent =
      "Your Clean Banking subscription has expired. Renew your Clean Banking plan whenever you're ready to continue enjoying the full ZenitCU experience.";
  }


  popup.style.display =
    "block";


  document.body.style.overflow =
    "hidden";
}


// ======================================================
// CLOSE POPUP
// ======================================================
//
// scheduleAgain = true
// means the popup should return after 30 seconds.
// ======================================================

function closeBankingPlanPopup(
  scheduleAgain = false
) {

  const popup =
    document.getElementById(
      "bankingPlanPopup"
    );


  if (popup) {

    popup.remove();
  }


  document.body.style.overflow =
    "";


  bankingPlanPopupShown =
    false;


  // ----------------------------------------------------
  // SCHEDULE NEXT POPUP
  // ----------------------------------------------------

  if (scheduleAgain) {

    scheduleNextBankingPlanPopup();
  }
}


// ======================================================
// SCHEDULE NEXT POPUP
// ======================================================

function scheduleNextBankingPlanPopup() {

  // ----------------------------------------------------
  // CLEAR PREVIOUS REPEAT TIMER
  // ----------------------------------------------------

  if (bankingPlanRepeatTimer) {

    clearTimeout(
      bankingPlanRepeatTimer
    );
  }


  // ----------------------------------------------------
  // GET CURRENT ACCOUNT
  // ----------------------------------------------------

  const account =
    currentAccount ||
    getSavedAccount();


  const popupType =
    getBankingPopupType(
      account
    );


  // ----------------------------------------------------
  // ACCOUNT IS NOW ACTIVE
  // ----------------------------------------------------

  if (!popupType) {

    return;
  }


  // ----------------------------------------------------
  // WAIT 30 SECONDS
  // ----------------------------------------------------

  bankingPlanRepeatTimer =
    setTimeout(
      function () {

        // Re-check the live account
        // before displaying another popup.

        refreshAccountForPopup();

      },
      REPEAT_POPUP_DELAY
    );
}


// ======================================================
// REFRESH ACCOUNT BEFORE REPEATING POPUP
// ======================================================

async function refreshAccountForPopup() {

  const accountNo =
    getAccountNumber();


  if (!accountNo) {
    return;
  }


  try {

    const response =
      await fetch(
        `${BANKING_API_URL}/banking/accounts/${encodeURIComponent(
          accountNo
        )}`
      );


    const data =
      await response.json();


    if (!response.ok) {
      return;
    }


    // --------------------------------------------------
    // UPDATE ACCOUNT
    // --------------------------------------------------

    saveAccount(
      data.account
    );


    // --------------------------------------------------
    // UPDATE DASHBOARD DATA
    // --------------------------------------------------

    displayAccount(
      data.account
    );


    // --------------------------------------------------
    // CHECK CURRENT PLAN AGAIN
    // --------------------------------------------------

    const popupType =
      getBankingPopupType(
        data.account
      );


    // --------------------------------------------------
    // ACTIVE CLEAN ACCOUNT
    // --------------------------------------------------

    if (!popupType) {

      clearBankingPlanTimers();

      return;
    }


    // --------------------------------------------------
    // SHOW POPUP AGAIN
    // --------------------------------------------------

    showBankingPlanPopup(
      popupType
    );

  }
  catch (error) {

    console.error(
      "Popup account refresh error:",
      error
    );


    // If the server cannot be reached,
    // try again after another 30 seconds.

    bankingPlanRepeatTimer =
      setTimeout(
        refreshAccountForPopup,
        REPEAT_POPUP_DELAY
      );
  }
}


// ======================================================
// CLEAR POPUP TIMERS
// ======================================================

function clearBankingPlanTimers() {

  if (bankingPlanPopupTimer) {

    clearTimeout(
      bankingPlanPopupTimer
    );

    bankingPlanPopupTimer =
      null;
  }


  if (bankingPlanRepeatTimer) {

    clearTimeout(
      bankingPlanRepeatTimer
    );

    bankingPlanRepeatTimer =
      null;
  }
}


// ======================================================
// POPUP STYLES
// ======================================================

function addBankingPlanPopupStyles() {

  if (
    document.getElementById(
      "bankingPlanPopupStyles"
    )
  ) {

    return;
  }


  const style =
    document.createElement(
      "style"
    );


  style.id =
    "bankingPlanPopupStyles";


  style.textContent =
    `
      #bankingPlanPopup {
        position: fixed;
        inset: 0;
        z-index: 99999;
      }


      .banking-plan-overlay {
        position: fixed;
        inset: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 20px;

        background:
          rgba(
            8,
            18,
            45,
            0.58
          );

        backdrop-filter:
          blur(5px);

        -webkit-backdrop-filter:
          blur(5px);
      }


      .banking-plan-modal {
        position: relative;

        width:
          min(
            100%,
            440px
          );

        padding:
          34px 30px 28px;

        border-radius: 24px;

        background: white;

        color: #13213d;

        text-align: center;

        box-shadow:
          0 30px 80px
          rgba(
            0,
            0,
            0,
            0.20
          );

        animation:
          bankingPlanPopupIn
          0.28s
          ease;
      }


      @keyframes bankingPlanPopupIn {

        from {

          opacity: 0;

          transform:
            translateY(15px)
            scale(0.97);
        }

        to {

          opacity: 1;

          transform:
            translateY(0)
            scale(1);
        }
      }


      .banking-plan-close {
        position: absolute;

        top: 13px;

        right: 14px;

        width: 34px;

        height: 34px;

        border: none;

        border-radius: 50%;

        background: #f3f6fb;

        color: #64728a;

        font-size: 1.4rem;

        line-height: 1;

        cursor: pointer;
      }


      .banking-plan-close:hover {

        background:
          #e9eef7;
      }


      .banking-plan-icon {

        width: 58px;

        height: 58px;

        margin:
          0 auto 14px;

        display: flex;

        align-items: center;

        justify-content: center;

        border-radius: 17px;

        background:
          linear-gradient(
            135deg,
            #2246d3,
            #1834a8
          );

        color: white;

        font-size: 1.25rem;

        font-weight: 800;

        box-shadow:
          0 12px 25px
          rgba(
            34,
            70,
            211,
            0.22
          );
      }


      .banking-plan-label {

        margin-bottom: 9px;

        color:
          #2246d3;

        font-size:
          0.7rem;

        font-weight:
          800;

        letter-spacing:
          0.12em;
      }


      .banking-plan-title {

        margin:
          0 0 12px;

        color:
          #13213d;

        font-size:
          1.35rem;

        line-height:
          1.3;

        letter-spacing:
          -0.035em;
      }


      .banking-plan-description {

        margin:
          0 auto 22px;

        max-width:
          350px;

        color:
          #718098;

        font-size:
          0.86rem;

        line-height:
          1.65;
      }


      .banking-plan-secondary {

        width: 100%;

        min-height:
          48px;

        padding:
          11px 16px;

        border: none;

        border-radius:
          12px;

        background:
          #f3f6fb;

        color:
          #2246d3;

        font-family:
          inherit;

        font-size:
          0.84rem;

        font-weight:
          700;

        cursor:
          pointer;

        transition:
          background 0.2s ease,
          transform 0.2s ease;
      }


      .banking-plan-secondary:hover {

        background:
          #e9efff;

        transform:
          translateY(-1px);
      }


      .banking-plan-secondary:active {

        transform:
          translateY(0);
      }


      @media (max-width: 480px) {

        .banking-plan-overlay {

          padding: 14px;
        }


        .banking-plan-modal {

          padding:
            30px 20px 22px;

          border-radius:
            20px;
        }


        .banking-plan-title {

          font-size:
            1.18rem;
        }


        .banking-plan-description {

          font-size:
            0.82rem;

          margin-bottom:
            18px;
        }
      }
    `;


  document.head.appendChild(
    style
  );
}


// ======================================================
// RENDER TRANSACTIONS
// ======================================================

function renderTransactions(
  transactions,
  currency
) {

  if (!transactionList) {
    return;
  }


  transactionList.innerHTML =
    "";


  if (
    !transactions ||
    transactions.length === 0
  ) {

    if (transactionCount) {

      transactionCount.textContent =
        "0 transactions";
    }


    transactionList.innerHTML =
      `
        <div class="empty-transactions">
          No transactions yet.
        </div>
      `;


    return;
  }


  if (transactionCount) {

    transactionCount.textContent =
      `${transactions.length} ${transactions.length === 1
        ? "transaction"
        : "transactions"
      }`;
  }


  transactions.forEach(
    function (transaction) {

      const row =
        document.createElement(
          "div"
        );


      row.className =
        "transaction-row " +
        String(
          transaction.type || ""
        ).toLowerCase();


      // ------------------------------------------------
      // TYPE
      // ------------------------------------------------

      const type =
        document.createElement(
          "div"
        );


      type.className =
        "transaction-type";


      type.textContent =
        transaction.type ||
        "Transaction";


      // ------------------------------------------------
      // NARRATION
      // ------------------------------------------------

      const narration =
        document.createElement(
          "div"
        );


      narration.className =
        "transaction-narration";


      narration.textContent =
        transaction.description ||
        "Transaction";


      // ------------------------------------------------
      // AMOUNT
      // ------------------------------------------------

      const amount =
        document.createElement(
          "div"
        );


      amount.className =
        "transaction-amount";


      const transactionAmount =
        Number(
          transaction.amount || 0
        );


      amount.textContent =
        new Intl.NumberFormat(
          "en-US",
          {
            style: "currency",
            currency: currency
          }
        ).format(
          transactionAmount
        );


      // ------------------------------------------------
      // DATE
      // ------------------------------------------------

      const date =
        document.createElement(
          "div"
        );


      date.className =
        "transaction-date";


      if (transaction.date) {

        const transactionDate =
          new Date(
            transaction.date
          );


        if (
          !isNaN(
            transactionDate.getTime()
          )
        ) {

          date.textContent =
            transactionDate.toLocaleString(
              "en-US",
              {
                dateStyle:
                  "medium",

                timeStyle:
                  "short"
              }
            );

        }
        else {

          date.textContent =
            transaction.date;
        }

      }
      else {

        date.textContent =
          "Date unavailable";
      }


      row.appendChild(
        type
      );


      row.appendChild(
        narration
      );


      row.appendChild(
        amount
      );


      row.appendChild(
        date
      );


      transactionList.appendChild(
        row
      );
    }
  );
}


// ======================================================
// SHOW WITHDRAWAL SECTION
// ======================================================

function showWithdrawSection(event) {

  if (event) {

    event.preventDefault();

    event.stopPropagation();
  }


  if (!withdrawSection) {

    console.error(
      "withdrawSection was not found."
    );

    return;
  }


  withdrawSection.style.display =
    "block";


  if (withdrawMessage) {

    withdrawMessage.textContent =
      "";

    withdrawMessage.className =
      "withdraw-message";
  }


  if (withdrawAmount) {

    withdrawAmount.value =
      "";


    setTimeout(
      function () {

        withdrawAmount.focus();

      },
      50
    );
  }


  withdrawSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


// ======================================================
// PROCESS WITHDRAWAL
// ======================================================

async function processWithdrawal(event) {

  event.preventDefault();

  event.stopPropagation();

  const accountNo =
    getAccountNumber();


  if (!accountNo) {

    showWithdrawMessage(
      "Your account could not be identified.",
      "error"
    );

    return;
  }


  const amount =
    Number(
      withdrawAmount.value
    );


  if (
    !amount ||
    amount <= 0
  ) {

    showWithdrawMessage(
      "Please enter a valid withdrawal amount.",
      "error"
    );


    withdrawAmount.focus();

    return;
  }


  if (withdrawSubmitBtn) {

    withdrawSubmitBtn.disabled =
      true;

    withdrawSubmitBtn.textContent =
      "Processing...";
  }


  try {

    // --------------------------------------------------
    // GET LATEST ACCOUNT
    // --------------------------------------------------

    const accountResponse =
      await fetch(
        `${BANKING_API_URL}/banking/accounts/${encodeURIComponent(
          accountNo
        )}`
      );


    const accountData =
      await accountResponse.json();


    if (!accountResponse.ok) {

      throw new Error(
        accountData.message ||
        "Unable to load account."
      );
    }


    const latestAccount =
      accountData.account;


    saveAccount(
      latestAccount
    );


    // --------------------------------------------------
    // CHECK WITHDRAWAL STATUS
    // --------------------------------------------------

    if (
      latestAccount.withdrawalEnabled ===
      false
    ) {

      showWithdrawMessage(
        latestAccount.withdrawalErrorMessage ||
        "Withdrawal is currently unavailable.",
        "error"
      );


      return;
    }


    // --------------------------------------------------
    // CHECK BALANCE
    // --------------------------------------------------

    const currentBalance =
      Number(
        latestAccount.balance || 0
      );


    if (
      amount > currentBalance
    ) {

      showWithdrawMessage(
        "Insufficient balance.",
        "error"
      );


      return;
    }


    // --------------------------------------------------
    // SEND WITHDRAWAL
    // --------------------------------------------------

    const response =
      await fetch(
        `${BANKING_API_URL}/banking/accounts/${encodeURIComponent(
          accountNo
        )}/withdraw`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            amount: amount
          })
        }
      );


    const data =
      await response.json();


    // --------------------------------------------------
    // API ERROR
    // --------------------------------------------------

    if (!response.ok) {

      showWithdrawMessage(
        data.message ||
        "Withdrawal failed.",
        "error"
      );


      return;
    }


    // --------------------------------------------------
    // SAVE UPDATED ACCOUNT
    // --------------------------------------------------

    saveAccount(
      data.account
    );


    // --------------------------------------------------
    // UPDATE DASHBOARD
    // --------------------------------------------------

    displayAccount(
      data.account
    );


    // --------------------------------------------------
    // SUCCESS MESSAGE
    // --------------------------------------------------

    showWithdrawMessage(
      `Withdrawal successful. ${formatMoney(
        amount,
        data.account.accountCurrency ||
        "USD"
      )} has been withdrawn.`,
      "success"
    );


    // --------------------------------------------------
    // CLEAR INPUT
    // --------------------------------------------------

    withdrawAmount.value =
      "";

  }
  catch (error) {

    console.error(
      "Withdrawal error:",
      error
    );


    showWithdrawMessage(
      error.message ||
      "Unable to process withdrawal.",
      "error"
    );

  }
  finally {

    if (withdrawSubmitBtn) {

      withdrawSubmitBtn.disabled =
        false;

      withdrawSubmitBtn.textContent =
        "Confirm Withdrawal";
    }
  }
}


// ======================================================
// WITHDRAW MESSAGE
// ======================================================

function showWithdrawMessage(
  message,
  type
) {

  if (!withdrawMessage) {
    return;
  }


  withdrawMessage.textContent =
    message;


  withdrawMessage.className =
    `withdraw-message ${type}`;
}


// ======================================================
// FORMAT MONEY
// ======================================================

function formatMoney(
  amount,
  currency
) {

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: currency
    }
  ).format(
    Number(
      amount || 0
    )
  );
}


// ======================================================
// VIEW TRANSACTIONS
// ======================================================

function showTransactions() {

  if (!transactionsSection) {
    return;
  }


  transactionsSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


// ======================================================
// SHOW PROFILE
// ======================================================

function showProfile() {

  if (!profileSection) {
    return;
  }


  profileSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


// ======================================================
// HOME
// ======================================================

function goHome() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ======================================================
// LOGOUT
// ======================================================

function logout() {

  clearBankingPlanTimers();


  sessionStorage.removeItem(
    "brightBankAccount"
  );


  currentAccount =
    null;


  window.location.href =
    "index.html";
}


// ======================================================
// EVENT LISTENERS
// ======================================================

// ------------------------------------------------------
// WITHDRAW BUTTON
// ------------------------------------------------------

if (withdrawBtn) {

  withdrawBtn.addEventListener(
    "click",
    showWithdrawSection
  );
}


// ------------------------------------------------------
// WITHDRAW FORM
// ------------------------------------------------------

if (withdrawForm) {

  withdrawForm.addEventListener(
    "submit",
    processWithdrawal
  );
}


// ------------------------------------------------------
// TRANSACTIONS
// ------------------------------------------------------

if (viewTransactionsBtn) {

  viewTransactionsBtn.addEventListener(
    "click",
    showTransactions
  );
}


if (transactionsNavBtn) {

  transactionsNavBtn.addEventListener(
    "click",
    showTransactions
  );
}


// ------------------------------------------------------
// PROFILE
// ------------------------------------------------------

if (profileBtn) {

  profileBtn.addEventListener(
    "click",
    showProfile
  );
}


// ------------------------------------------------------
// HOME
// ------------------------------------------------------

if (homeBtn) {

  homeBtn.addEventListener(
    "click",
    goHome
  );
}


// ------------------------------------------------------
// LOGOUT
// ------------------------------------------------------

if (logoutBtn) {

  logoutBtn.addEventListener(
    "click",
    logout
  );
}


if (logoutActionBtn) {

  logoutActionBtn.addEventListener(
    "click",
    logout
  );
}


// ======================================================
// START DASHBOARD
// ======================================================

loadAccount();


/* =========================================================
   ZENITCU CUSTOMER SUPPORT CHAT
   Added separately to protect existing dashboard functions
========================================================= */

(function () {
  const zenitChatStyles = document.createElement("style");

  zenitChatStyles.textContent = `
    #zenitSupportButton {
      position: fixed;
      right: 22px;
      bottom: 22px;
      z-index: 9990;
      border: none;
      border-radius: 28px;
      padding: 13px 20px;
      background: #176b50;
      color: white;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,.18);
    }

    #zenitSupportPanel {
      position: fixed;
      right: 22px;
      bottom: 82px;
      z-index: 9990;
      width: 350px;
      max-width: calc(100vw - 28px);
      height: 450px;
      max-height: calc(100vh - 120px);
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 14px;
      box-shadow: 0 8px 30px rgba(0,0,0,.18);
      display: none;
      flex-direction: column;
      overflow: hidden;
      font-family: Arial, sans-serif;
    }

    #zenitSupportHeader {
      background: #176b50;
      color: white;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    #zenitSupportHeader strong {
      font-size: 15px;
    }

    #zenitSupportClose {
      background: transparent;
      border: none;
      color: white;
      font-size: 23px;
      cursor: pointer;
      line-height: 1;
    }

    #zenitSupportMessages {
      flex: 1;
      overflow-y: auto;
      padding: 14px;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .zenit-chat-message {
      max-width: 85%;
      padding: 10px 12px;
      border-radius: 12px;
      font-size: 13px;
      line-height: 1.5;
      overflow-wrap: anywhere;
      white-space: pre-wrap;
    }

    .zenit-chat-customer {
      align-self: flex-end;
      background: #176b50;
      color: white;
      border-bottom-right-radius: 3px;
    }

    .zenit-chat-support {
      align-self: flex-start;
      background: white;
      color: #222;
      border: 1px solid #e5e7eb;
      border-bottom-left-radius: 3px;
    }

    .zenit-chat-time {
      display: block;
      font-size: 10px;
      margin-top: 5px;
      opacity: .75;
    }

    #zenitSupportStatus {
      padding: 7px 12px;
      font-size: 11px;
      color: #64748b;
      background: white;
      border-top: 1px solid #eee;
    }

    #zenitSupportForm {
      display: flex;
      gap: 8px;
      padding: 10px;
      background: white;
      border-top: 1px solid #eee;
    }

    #zenitSupportInput {
      flex: 1;
      min-width: 0;
      padding: 10px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 13px;
      outline: none;
    }

    #zenitSupportInput:focus {
      border-color: #176b50;
    }

    #zenitSupportSend {
      padding: 10px 13px;
      background: #176b50;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
    }

    #zenitSupportSend:disabled {
      opacity: .55;
      cursor: not-allowed;
    }

    @media (max-width: 480px) {
      #zenitSupportButton {
        right: 14px;
        bottom: 14px;
      }

      #zenitSupportPanel {
        right: 14px;
        bottom: 72px;
        width: calc(100vw - 28px);
        height: min(450px, calc(100vh - 100px));
      }
    }
  `;

  document.head.appendChild(zenitChatStyles);

  // CREATE THE CHAT BUTTON
  const zenitChatButton = document.createElement("button");
  zenitChatButton.id = "zenitSupportButton";
  zenitChatButton.type = "button";
  zenitChatButton.textContent = "Chat with Support";

  // CREATE THE CHAT PANEL
  const zenitChatPanel = document.createElement("section");
  zenitChatPanel.id = "zenitSupportPanel";

  zenitChatPanel.innerHTML = `
    <div id="zenitSupportHeader">
      <strong>ZenitCU Support</strong>
      <button id="zenitSupportClose" type="button"
        aria-label="Close support chat">&times;</button>
    </div>

    <div id="zenitSupportMessages" aria-live="polite">
      <div style="color:#64748b;font-size:13px;">
        Send us a message and our support team will respond here.
      </div>
    </div>

    <div id="zenitSupportStatus">
      Messages are saved to your support conversation.
    </div>

    <form id="zenitSupportForm">
      <input
        id="zenitSupportInput"
        type="text"
        maxlength="5000"
        placeholder="Type your message..."
        autocomplete="off"
        required
      />
      <button id="zenitSupportSend" type="submit">Send</button>
    </form>
  `;

  document.body.appendChild(zenitChatButton);
  document.body.appendChild(zenitChatPanel);

  // CHAT ELEMENTS
  const zenitChatClose = document.getElementById("zenitSupportClose");
  const zenitChatMessages = document.getElementById("zenitSupportMessages");
  const zenitChatStatus = document.getElementById("zenitSupportStatus");
  const zenitChatForm = document.getElementById("zenitSupportForm");
  const zenitChatInput = document.getElementById("zenitSupportInput");
  const zenitChatSend = document.getElementById("zenitSupportSend");

  // CHAT STATE
  let zenitChatOpen = false;
  let zenitChatPolling = null;
  let zenitChatBusy = false;
  let zenitChatLoadingMessages = false;
  let zenitChatLastMessageKey = "";

  // SESSION STORAGE KEYS ARE SEPARATE FOR EACH ACCOUNT
  function zenitChatStorageKey(type) {
    const accountNumber = getAccountNumber();

    if (!accountNumber) {
      return null;
    }

    return "zenitcuSupport_" + type + "_" + accountNumber;
  }

  function zenitChatGetSaved(type) {
    const key = zenitChatStorageKey(type);
    return key ? sessionStorage.getItem(key) : null;
  }

  function zenitChatSave(type, value) {
    const key = zenitChatStorageKey(type);

    if (key) {
      sessionStorage.setItem(key, value);
    }
  }

  function zenitChatClearSaved() {
    const conversationKey = zenitChatStorageKey("conversationId");
    const tokenKey = zenitChatStorageKey("publicToken");

    if (conversationKey) {
      sessionStorage.removeItem(conversationKey);
    }

    if (tokenKey) {
      sessionStorage.removeItem(tokenKey);
    }

    zenitChatLastMessageKey = "";
  }

  function zenitChatSetStatus(message) {
    zenitChatStatus.textContent = message;
  }

  function zenitChatAddMessage(message) {
    const bubble = document.createElement("div");

    bubble.className =
      "zenit-chat-message " +
      (message.senderType === "customer"
        ? "zenit-chat-customer"
        : "zenit-chat-support");

    // Use textContent so message text cannot inject HTML.
    const text = document.createElement("div");
    text.textContent = message.text || "";
    bubble.appendChild(text);

    if (message.createdAt) {
      const time = document.createElement("span");
      time.className = "zenit-chat-time";

      const date = new Date(message.createdAt);

      time.textContent = Number.isNaN(date.getTime())
        ? ""
        : date.toLocaleString();

      bubble.appendChild(time);
    }

    zenitChatMessages.appendChild(bubble);
  }

  function zenitChatShowMessages(messages) {
    if (!Array.isArray(messages)) {
      return;
    }

    const messageKey = JSON.stringify(
      messages.map(function (message) {
        return {
          id: message._id || "",
          senderType: message.senderType || "",
          text: message.text || "",
          createdAt: message.createdAt || ""
        };
      })
    );

    if (messageKey === zenitChatLastMessageKey) {
      return;
    }

    zenitChatLastMessageKey = messageKey;
    zenitChatMessages.replaceChildren();

    if (messages.length === 0) {
      const emptyMessage = document.createElement("div");
      emptyMessage.style.color = "#64748b";
      emptyMessage.style.fontSize = "13px";
      emptyMessage.textContent =
        "Send a message to start your support conversation.";

      zenitChatMessages.appendChild(emptyMessage);
      return;
    }

    messages.forEach(zenitChatAddMessage);

    zenitChatMessages.scrollTop = zenitChatMessages.scrollHeight;
  }

  function zenitChatGetMessagesUrl() {
    const conversationId = zenitChatGetSaved("conversationId");

    if (!conversationId) {
      return null;
    }

    return (
      BANKING_API_URL +
      "/chat/public/conversations/" +
      encodeURIComponent(conversationId) +
      "/messages"
    );
  }

  async function zenitChatRequestMessages() {
    if (zenitChatLoadingMessages) {
      return;
    }

    const token = zenitChatGetSaved("publicToken");
    const url = zenitChatGetMessagesUrl();

    if (!token || !url) {
      return;
    }

    zenitChatLoadingMessages = true;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-chat-token": token
        }
      });

      const data = await response.json().catch(function () {
        return {};
      });

      if (
        response.status === 401 ||
        response.status === 403 ||
        response.status === 404
      ) {
        zenitChatClearSaved();

        zenitChatMessages.replaceChildren();

        const emptyMessage = document.createElement("div");

        emptyMessage.style.color = "#64748b";
        emptyMessage.style.fontSize = "13px";

        emptyMessage.textContent =
          "Send a message to start your support conversation.";

        zenitChatMessages.appendChild(emptyMessage);

        zenitChatSetStatus(
          "Your previous chat is no longer available. Send a message to start a new conversation."
        );

        return;
      }


      if (!response.ok) {
        throw new Error(data.message || "Could not load support messages.");
      }

      const messages =
        data.messages ||
        (data.conversation && data.conversation.messages);

      if (Array.isArray(messages)) {
        zenitChatShowMessages(messages);
      }

      zenitChatSetStatus("Connected to ZenitCU Support.");
    } catch (error) {
      zenitChatSetStatus(
        "Unable to load messages. Please check your connection."
      );
    } finally {
      zenitChatLoadingMessages = false;
    }
  }

  async function zenitChatSendMessage(messageText) {
    if (zenitChatBusy) {
      return;
    }

    const accountNumber = getAccountNumber();

    if (!accountNumber) {
      zenitChatSetStatus(
        "Your account is still loading. Please try again shortly."
      );
      return;
    }

    zenitChatBusy = true;
    zenitChatSend.disabled = true;

    try {
      let conversationId = zenitChatGetSaved("conversationId");
      let publicToken = zenitChatGetSaved("publicToken");

      // START A NEW CONVERSATION
      if (!conversationId || !publicToken) {
        const response = await fetch(
          BANKING_API_URL + "/chat/public/conversations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              accountNumber: accountNumber,
              message: messageText
            })
          }
        );

        const data = await response.json().catch(function () {
          return {};
        });

        if (!response.ok) {
          throw new Error(data.message || "Could not start support chat.");
        }

        if (!data.conversationId || !data.publicToken) {
          throw new Error("The server did not return the chat session.");
        }

        zenitChatSave("conversationId", data.conversationId);
        zenitChatSave("publicToken", data.publicToken);

        zenitChatLastMessageKey = "";

        const initialMessages =
          data.messages ||
          (data.conversation && data.conversation.messages);

        if (Array.isArray(initialMessages)) {
          zenitChatShowMessages(initialMessages);
        } else {
          await zenitChatRequestMessages();
        }

        zenitChatSetStatus("Connected to ZenitCU Support.");
        return;
      }

      // SEND A MESSAGE TO AN EXISTING CONVERSATION
      const response = await fetch(
        BANKING_API_URL +
        "/chat/public/conversations/" +
        encodeURIComponent(conversationId) +
        "/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-chat-token": publicToken
          },
          body: JSON.stringify({
            text: messageText
          })
        }
      );

      const data = await response.json().catch(function () {
        return {};
      });

      if (
        response.status === 401 ||
        response.status === 403 ||
        response.status === 404
      ) {
        zenitChatClearSaved();

        // Automatically start a fresh conversation
        // using the message the customer just typed.
        const newResponse = await fetch(
          BANKING_API_URL + "/chat/public/conversations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              accountNumber: accountNumber,
              message: messageText
            })
          }
        );

        const newData = await newResponse.json().catch(function () {
          return {};
        });

        if (!newResponse.ok) {
          throw new Error(
            newData.message || "Could not start a new support conversation."
          );
        }

        if (!newData.conversationId || !newData.publicToken) {
          throw new Error("The server did not return the new chat session.");
        }

        zenitChatSave("conversationId", newData.conversationId);
        zenitChatSave("publicToken", newData.publicToken);

        zenitChatLastMessageKey = "";

        const newMessages =
          newData.messages ||
          (newData.conversation && newData.conversation.messages);

        if (Array.isArray(newMessages)) {
          zenitChatShowMessages(newMessages);
        } else {
          await zenitChatRequestMessages();
        }

        zenitChatSetStatus("Connected to ZenitCU Support.");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Could not send your message.");
      }

      const returnedMessages =
        data.messages ||
        (data.conversation && data.conversation.messages);

      if (Array.isArray(returnedMessages)) {
        zenitChatShowMessages(returnedMessages);
      } else {
        await zenitChatRequestMessages();
      }

      zenitChatSetStatus("Message sent.");
    } catch (error) {
      zenitChatSetStatus(error.message || "Unable to send your message.");
    } finally {
      zenitChatBusy = false;
      zenitChatSend.disabled = false;
      zenitChatInput.focus();
    }
  }

  function zenitChatStartPolling() {
    if (zenitChatPolling) {
      clearInterval(zenitChatPolling);
    }

    zenitChatRequestMessages();

    zenitChatPolling = setInterval(function () {
      if (zenitChatOpen) {
        zenitChatRequestMessages();
      }
    }, 5000);
  }

  function zenitChatStopPolling() {
    if (zenitChatPolling) {
      clearInterval(zenitChatPolling);
      zenitChatPolling = null;
    }
  }

  // OPEN AND CLOSE THE WIDGET
  zenitChatButton.addEventListener("click", function () {
    zenitChatOpen = true;
    zenitChatPanel.style.display = "flex";
    zenitChatButton.style.display = "none";

    if (!getAccountNumber()) {
      zenitChatSetStatus("Loading your account...");
    } else {
      zenitChatStartPolling();
      zenitChatInput.focus();
    }
  });

  zenitChatClose.addEventListener("click", function () {
    zenitChatOpen = false;
    zenitChatPanel.style.display = "none";
    zenitChatButton.style.display = "block";
    zenitChatStopPolling();
  });

  // SEND FORM
  zenitChatForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const messageText = zenitChatInput.value.trim();

    if (!messageText) {
      return;
    }

    zenitChatInput.value = "";
    zenitChatSendMessage(messageText);
  });
})();
