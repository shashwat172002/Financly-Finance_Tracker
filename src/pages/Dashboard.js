import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { Modal, Radio } from "antd";
import AddIncomeModal from "../components/Modals/addIncome";
import AddExpenseModal from "../components/Modals/addExpense";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable from "../components/TransactionTable";
import ChartComponent from "../components/Charts";
import { useNavigate } from "react-router-dom";
import NoTransactions from "../components/NoTransactions";

function Dashboard() {
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState(110);
  const [expense, setExpense] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, []);
  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      // console.log("Document written with ID: ", docRef.id);
      // toast.success("Transaction Added!");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (e) {
      console.error("Error adding document: ", e);

      toast.error("Couldn't add transaction");
    }
  }

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setCurrentBalance(incomeTotal - expensesTotal);
  };

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      // toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  let sortedTransaction = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  async function deleteAllTransactions() {
    try {
      const querySnapshot = await getDocs(
        collection(db, `users/${user.uid}/transactions`)
      );

      const deletePromises = querySnapshot.docs.map((document) =>
        deleteDoc(doc(db, `users/${user.uid}/transactions`, document.id))
      );

      await Promise.all(deletePromises);

      toast.success("All transactions deleted successfully");

      // Clear local state and recalculate balance
      setTransactions([]);
      calculateBalance();
      fetchTransactions();

      // toast.success("All transactions deleted successfully!");
    } catch (e) {
      console.error("Error deleting transactions: ", e);

      toast.error("Couldn't delete transactions");
    }
  }
  return (
    <div>
      <Header />
      {loading ? (
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      ) : (
        <>
          <Cards
            currentBalance={currentBalance}
            income={income}
            expense={expense}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            deleteAllTransactions={deleteAllTransactions}
          />
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          {transactions.length != 0 ? (
            <ChartComponent sortedTransaction={sortedTransaction} />
          ) : (
            <NoTransactions />
          )}

          <TransactionsTable
            transactions={transactions}
            addTransaction={addTransaction}
            fetchTransactions={fetchTransactions}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
