This is a simple banking application that allows users to manage their bank accounts, view account balances, make transfers, take out loans, and more. It uses JavaScript to implement the functionality and is designed for users to easily interact with their bank details.

Features
User Authentication: Users log in using their username and PIN.
Account Movements: Users can view all deposits and withdrawals in their account.
Balance Display: The current account balance is dynamically updated based on movements.
Transfer Money: Users can transfer money to other accounts.
Loan Application: Users can request a loan if they meet specific conditions.
Close Account: Users can delete their account.
Sort Movements: The account's transaction history can be sorted by amount.
Session Timer: A timer logs the user out after inactivity.
How It Works
User Login:

Users enter their username and PIN to log into the application.
The username is automatically created based on the first letter of each name in the owner's name.
Upon successful login, a welcome message is displayed, and the account details are shown.
Viewing Movements:

Users can view all their transactions (deposits and withdrawals) in their account history.
The transactions are formatted by date and amount.
Transactions are displayed in reverse chronological order and can be sorted by amount.
Making Transfers:

Users can transfer money to other users by specifying the recipient and the amount.
Transfers are validated to ensure the amount is positive, the recipient exists, and the user has sufficient funds.
Transfer dates are recorded and displayed.
Requesting Loans:

Users can request loans if they have made enough deposits to qualify (at least 10% of the loan amount).
Loans are added to the user’s balance, and the transaction is logged.
Closing an Account:

Users can close their account by providing their username and PIN.
The account is removed from the system.
Session Timer:

The app automatically logs users out after 5 minutes of inactivity.
The timer resets whenever a user interacts with the app (e.g., making a transfer or taking out a loan).
Technologies Used
HTML: For the structure of the app including the form inputs, buttons, and account details.
CSS: For styling the app, ensuring the interface is clean and user-friendly.
JavaScript: For implementing the app's core functionality, including user authentication, account management, and transactions.
Key Functions
createUsername(accs): Creates usernames for all accounts by extracting the first letter of each name in the owner's name.
formatMovementDate(date, locale): Formats the transaction date based on how recently it occurred.
formatCur(value, locale, currency): Formats currency values according to the user's locale and currency.
displayMovements(acc, sort = false): Displays the account movements (transactions) in reverse chronological order. It can also sort the movements by amount.
calcDisplayBalance(acc): Calculates and displays the total balance of the account.
calcDisplaySummary(acc): Displays the summary of deposits, withdrawals, and interest earned.
startLogoutTimer(): Starts a timer that logs the user out after a certain period of inactivity.
User Interface
Login Form: Where the user enters their username and PIN to access their account.
Account Dashboard: Displays the user's balance, movements, and account summary (income, expenses, interest).
Transfer Form: Allows the user to transfer money to another account.
Loan Form: Allows the user to request a loan.
Close Account Form: Allows the user to close their account.
This project serves as a great example of how to manage and interact with data in JavaScript while providing a functional and user-friendly banking interface.
