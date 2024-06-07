import React from "react";
import "./styles.css";
import { Row, Card } from "antd";
import Button from "../Button";

function Cards({showExpenseModal,showIncomeModal}) 
{
  return (
    <div>
      <Row className="my-row">
        <Card bordered={true} className="my-card">
          <h2>Total Income</h2>
          <p>₹0</p>
          <Button text="Add Income" blue={true} onClick={showIncomeModal} />
        </Card>
        <Card bordered={true} className="my-card">
          <h2>Total Expense</h2>
          <p>₹0</p>
          <Button text="Add Expense" blue={true} onClick={showExpenseModal} />
        </Card>
        <Card bordered={true} className="my-card">
          <h2>Current Balance</h2>
          <p>₹0</p>
          <Button text="Reset Balance" blue={true}  />
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
