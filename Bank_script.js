'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2023-11-18T21:31:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2024-01-28T09:15:04.904Z',
    '2024-04-01T10:17:24.185Z',
    '2024-05-08T14:11:59.604Z',
    '2024-07-26T17:01:17.194Z',
    '2024-07-28T23:36:17.929Z',
    '2024-12-20T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2023-11-01T13:15:33.035Z',
    '2023-11-30T09:48:16.867Z',
    '2023-12-25T06:04:23.907Z',
    '2024-01-25T14:18:46.235Z',
    '2024-02-05T16:33:06.386Z',
    '2024-04-10T14:43:26.374Z',
    '2024-06-25T18:49:59.371Z',
    '2024-11-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatmovementdate = function (date, locale) {
  const calcdayspassed = (day1, day2) =>
    Math.trunc(Math.abs(day2 - day1) / (1000 * 60 * 60 * 24));

  const dayspassed = calcdayspassed(new Date(), date);
  if (dayspassed === 0) return 'Today';
  if (dayspassed === 1) return 'Yesterday';
  if (dayspassed <= 7) return `${dayspassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // const hours = `${date.getHours()}`.padStart(2, 0);
  // const minutes = `${date.getMinutes()}`.padStart(2, 0);
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatcur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
const displaymovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displaydate = formatmovementdate(date, acc.locale);

    const formattedmov = formatcur(mov, acc.local, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
        <div class="movements__date">${displaydate}</div>
        <div class="movements__value">${formattedmov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displaymovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatcur(acc.balance, acc.local, acc.currency);
};
calcDisplayBalance(account1);

const calcdisplaysummary = function (acc) {
  const incoms = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatcur(incoms, acc.local, acc.currency);

  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatcur(
    Math.abs(outcome),
    acc.local,
    acc.currency
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, dep) => acc + dep, 0);
  labelSumInterest.textContent = formatcur(interest, acc.local, acc.currency);
};

// calcdisplaysummary(account1.movements);

const creatusername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
creatusername(accounts); // stw

const updateUI = function (acc) {
  //display movements
  displaymovements(acc);
  //display balanc
  calcDisplayBalance(acc);
  //display summary
  calcdisplaysummary(acc);
};
const startlogouttimer = function () {
  const tick = function () {
    const min = String(Math.trunc(timer / 60)).padStart(2, 0);
    const sec = String(timer % 60).padStart(2, 0);
    //in each call print the remaining time out
    labelTimer.textContent = `${min}:${sec}`;

    //when 0 second stop timer and log out
    if (timer === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get start';
      containerApp.style.opacity = 0;
    }
    //decrease one second
    timer--;
  };
  //set time to 5 min
  let time = 65;
  tick();
  //call the time every second
  const timer = setInterval(tick, 1000);
  return timer;
};

//event handel
let currentaccount, timer;

// fake login
// currentaccount = account1;
// updateUI(currentaccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  startlogouttimer();
  currentaccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentaccount);

  if (currentaccount?.pin === Number(inputLoginPin.value)) {
    // display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentaccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //create current date and time
    const now = new Date();
    const option = {
      hour: 'numeric',
      minut: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentaccount.locale,
      option
    ).format(now);

    //clear input field
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startlogouttimer();
    updateUI(currentaccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiveracount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // console.log(amount, receiveracount);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiveracount &&
    currentaccount.balance >= amount &&
    receiveracount?.user !== currentaccount.username
  ) {
    //doing the transfer
    currentaccount.movements.push(-amount);
    receiveracount.movements.push(amount);

    //add transfer date
    currentaccount.movementsDates.push(new Date().toISOString());
    receiveracount.movementsDates.push(new Date().toISOString());

    //update UI
    updateUI(currentaccount);

    //reset timer
    clearInterval(timer);
    timer = startlogouttimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentaccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      //add movement
      currentaccount.movements.push(amount);
      //add loan date
      currentaccount.movementsDates.push(new Date().toISOString());
      //update UI
      updateUI(currentaccount);
      //reset timer
      clearInterval(timer);
      timer = startlogouttimer();
    }, 3000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentaccount.username === inputCloseUsername.value &&
    currentaccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentaccount.username
    );
    // console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displaymovements(currentaccount.movements, !sorted);
  sorted = !sorted;
});
