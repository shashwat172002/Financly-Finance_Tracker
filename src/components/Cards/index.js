import React from "react";
import "./styles.css";
import { Row, Card } from "antd";
import Button from "../Button";
import { useSelector } from "react-redux";

function Cards({
  income,
  expense,
  currentBalance,
  showExpenseModal,
  showIncomeModal,
  deleteAllTransactions,
}) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div>
      <Row
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "space-between",
        }}
        
      >
        <Card bordered={true} className={`my-card ${theme}`}>
          <h2>Total Income</h2>
          <p>₹{income}</p>
          <Button text="Add Income" blue={true} onClick={showIncomeModal} />
        </Card>
        <Card bordered={true} className={`my-card ${theme}`}>
          <h2>Total Expense</h2>
          <p>₹{expense}</p>
          <Button text="Add Expense" blue={true} onClick={showExpenseModal} />
        </Card>
        <Card bordered={true} className={`my-card ${theme}`}>
          <h2>Current Balance</h2>
          <p>₹{currentBalance}</p>
          <Button text="Reset Balance" blue={true} onClick={deleteAllTransactions} />
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
