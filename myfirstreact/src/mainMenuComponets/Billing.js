import React from "react";

import { Link } from "react-router-dom";
import "./BillingPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
//arrow images
import up from "./images/up.png";
import Down from "./images/down.png";

//copy images
import black_coffee from "./images/copy/black_cofee_04.jpg";
import black_tea from "./images/copy/black_tea_05.jpg";
import cholate_milk from "./images/copy/cholate_milk_15.jpg";
import cold_coffee from "./images/copy/cold-coffee_06.jpg";
import furite_juice from "./images/copy/furite-juice_16.png";
import green_tea from "./images/copy/green_tea_13.jpg";
import hot_cholocate from "./images/copy/hot cholocate_10.jpg";
import iced_tea from "./images/copy/iced_tea_03.jpg";
import juice from "./images/copy/juice_07.jpg";
import lemado from "./images/copy/lemado_09.jpg";
import millk from "./images/copy/milk_01.jpg";
import milkshake from "./images/copy/milkshake_08.jpg";
import mixed_drinks from "./images/copy/mixed_drinks_11.png";
import soda from "./images/copy/mixed_drinks_11.png";
//import soya_milk from './images/copy/mixed_drinks_11.png';
import tea_bag from "./images/copy/tea_bag-14.jpg";
import tomato_juice from "./images/copy/tomato_juice_16.jpg";
import cofee from "./images/copy/04.png";
import Tea from "./images/copy/11.png";
import DefautlIamge from "./images/copy/tea-16.jpg";

//  import reducer
import { connect } from "react-redux";

import BillingButton from "./BillingButton";
import { updateTotalPrice, storeTableData } from "./actions";

const mapStateToProps = (state) => ({
  items: state.items,
  totalPrice: state.totalPrice,
  tableData: state.tableData,
  selectedItems: state.selectedItems,
});

const mapDispatchToProps = (dispatch) => ({
  updateTotalPrice: (totalPrice) => dispatch(updateTotalPrice(totalPrice)),
  storeTableData: (tableData) => dispatch(storeTableData(tableData)),
});

class Billing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: [],
      itemNumber: "",
      quantity: "",
      activeInput: "",
      showFirstBill: false,
    };
    this.handleNewBillClick = this.handleNewBillClick.bind(this);
  }

  // show the BillingButton div box
  handleGenerateBillClick = () => {
    this.props.storeTableData(this.state.selectedItems);
    this.setState({ showFirstBill: true });
  };

  // hide the BillingButton div box and clear the table rows
  handleNewBillClick = () => {
    this.setState({ showFirstBill: false }); // Set hideFirstBill to true to hide the div
    this.setState({ selectedItems: [] });
  };

  // handler event in buttons- click the button to added the row in tables and click the same button increase the quantity:

  handleFilter = (name) => {
    const { selectedItems, showFirstBill } = this.state;
    const selectedItem = selectedItems.find((item) => item.itemName === name);

    if (selectedItem && !showFirstBill) {
      const updatedSelectedItems = selectedItems.map((item) =>
        item.itemName === name
          ? {
              ...item,
              quantity: item.quantity + 1,
              TotalPrice: item.Price * (item.quantity + 1),
            }
          : item
      );

      this.setState({
        selectedItems: updatedSelectedItems,
      });
      this.props.storeTableData(updatedSelectedItems);
    } else {
      const newSelectedItem = this.props.items.find(
        (item) => item.itemName === name
      );
      newSelectedItem.quantity = 1;
      newSelectedItem.TotalPrice = newSelectedItem.Price;

      this.setState((prevState) => ({
        selectedItems: [...prevState.selectedItems, newSelectedItem],
      }));
    }
  };

  // handle event in images- click the images to added the row in the tables and same time again click the image increase the qunatity:
  handleFilterImge = (name) => {
    const { selectedItems, showFirstBill } = this.state;

    if (!showFirstBill) {
      const selectedItem = selectedItems.find((item) => item.itemName === name);

      if (selectedItem) {
        const updatedSelectedItems = selectedItems.map((item) =>
          item.itemName === name
            ? {
                ...item,
                quantity: item.quantity + 1,
                TotalPrice: item.Price * (item.quantity + 1),
              }
            : item
        );

        this.setState({
          selectedItems: updatedSelectedItems,
        });
        this.props.storeTableData(updatedSelectedItems);
      } else {
        const newSelectedItem = this.props.items.find(
          (item) => item.itemName === name
        );
        newSelectedItem.quantity = 1;
        newSelectedItem.TotalPrice = newSelectedItem.Price * 1;

        this.setState((prevState) => ({
          selectedItems: [...prevState.selectedItems, newSelectedItem],
        }));
      }
    }
  };

  // handleInputfields click the Add Button to added the row in tables

  handleAddItem = () => {
    const { selectedItems, itemNumber, quantity, showFirstBill } = this.state;
    const selectedItem = this.props.items.find(
      (item) => item.itemNumber === itemNumber
    );

    if (selectedItem && !showFirstBill && quantity) {
      const itemIndex = selectedItems.findIndex(
        (item) => item.itemNumber === itemNumber
      );

      if (itemIndex === -1) {
        const newItem = {
          ...selectedItem,
          quantity: parseInt(quantity),
          TotalPrice: selectedItem.Price * parseInt(quantity),
        };

        const updatedSelectedItems = [...selectedItems, newItem];

        this.setState({
          selectedItems: updatedSelectedItems,
          itemNumber: "",
          quantity: "",
        });
      } else {
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems[itemIndex].quantity += parseInt(quantity);
        updatedSelectedItems[itemIndex].TotalPrice +=
          selectedItem.Price * parseInt(quantity);

        this.setState({
          selectedItems: updatedSelectedItems,
          itemNumber: "",
          quantity: "",
        });

        this.props.storeTableData(updatedSelectedItems);
      }
    }
  };

  // handleItemNumber actions

  handleItemNumberChange = (event) => {
    this.setState({
      itemNumber: event.target.value,
    });
  };

  handleQuantityChange = (event) => {
    this.setState({
      quantity: event.target.value,
    });
  };

  // Ac button-clcik the button and clear the input fields

  handleAcInput = () => {
    this.setState({
      itemNumber: "",
      quantity: "",
    });
  };

  // Clear button to clear the current button details
  handleClear = () => {
    const { activeInput } = this.state;

    if (activeInput === "itemNumber") {
      this.setState({ itemNumber: "" });
    } else if (activeInput === "quantity") {
      this.setState({ quantity: "" });
    }
  };

  handleButtonClick = (buttonValue) => {
    const { activeInput } = this.state;

    if (activeInput === "itemNumber") {
      this.setState((prevState) => ({
        itemNumber: prevState.itemNumber + buttonValue,
      }));
    } else if (activeInput === "quantity") {
      this.setState((prevState) => ({
        quantity: prevState.quantity + buttonValue,
      }));
    }
  };

  handleItemNumberFocus = () => {
    this.setState({ activeInput: "itemNumber" });
  };

  handleQuantityFocus = () => {
    this.setState({ activeInput: "quantity" });
  };
  // handle ValueButtons

  // delete the rows in the tables
  handleDeleterows = () => {
    this.setState({ selectedItems: [] });
  };

  // cancle add item

  handleCancleItem = () => {
    this.setState((prevState) => ({
      selectedItems: prevState.selectedItems.slice(0, -1),
    }));
  };
  render() {
    const { selectedItems, itemNumber, quantity, showFirstBill } = this.state;

    const totalPrice = selectedItems.reduce(
      (acc, item) => acc + item.Price * item.quantity,
      0
    );
    this.props.updateTotalPrice(totalPrice);

    //filter the image functionality in Drinks:
    const filteredItems = this.props.items.filter(
      (item) => item.Type !== "Snacks"
    );
    const imagePaths = [
      cofee,
      Tea,
      iced_tea,
      black_coffee,
      millk,
      cholate_milk,
      tomato_juice,
      furite_juice,
      black_tea,
      cold_coffee,
      green_tea,
      tea_bag,
      hot_cholocate,
      lemado,
      juice,
      milkshake,
      mixed_drinks,
      soda,
      DefautlIamge,
      DefautlIamge,
      DefautlIamge,
    ];

    // filter the Button functionality in Snacks:
    const filteredItem = this.props.items.filter(
      (item) => item.Type !== "Drinks"
    );

    // const totalPrice = selectedItems.reduce((acc, item) => acc + item.TotalPrice, 0);
    return (
      <div id="billing-div">
        <div id="first-row-bill" className="input-group mb-3">
          <div id="inpu-total">
            <p>
              Total Price:{" "}
              <span id="total-price">
                ${parseFloat(totalPrice).toFixed(2) || "00.00"}
              </span>
            </p>
          </div>

          <div id="tab-divbx">
            <table className="table">
              <thead className="tableHead">
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedItems.map((item) => (
                  <tr key={item.itemNumber}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>${item.Price}</td>
                    <td>${item.TotalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div id="itemmInput">
            <div id="inputRows">
              <div id="itemNumbers">
                <label className="lab">Item Number:</label>
                <input
                  type="text"
                  id="itemNumber"
                  onFocus={this.handleItemNumberFocus}
                  value={itemNumber}
                  onChange={this.handleItemNumberChange}
                />
              </div>

              <div id="qunatityRow">
                <label className="lab">Quantity:</label>
                <input
                  type="text"
                  id="quantityInput"
                  onFocus={this.handleQuantityFocus}
                  value={quantity}
                  onChange={this.handleQuantityChange}
                />
              </div>

              <button
                className="btn btn-primary"
                id="added"
                type="button"
                onClick={this.handleAddItem}
              >
                Add
              </button>
            </div>

            <div id="lastrow">
              <div id="fisrstCol">
                <button className="btn btn-primary" type="button" id="lang">
                  Language
                </button>

                <label id="numberLable" className="lab">
                  TableNo:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="numberInput"
                  aria-label="Enter text"
                  aria-describedby="basic-addon2"
                />

                <label id="numberLable" className="lab">
                  NoofCover:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="numberInput"
                  aria-label="Enter text"
                  aria-describedby="basic-addon2"
                />
              </div>

              <div id="secondCol">
                <div className="calculateNumbers">
                  <div id="buttons">
                    <button onClick={() => this.handleButtonClick("9")}>
                      9
                    </button>
                    <button onClick={() => this.handleButtonClick("8")}>
                      8
                    </button>
                    <button onClick={() => this.handleButtonClick("7")}>
                      7
                    </button>
                    <button onClick={() => this.handleButtonClick("6")}>
                      6
                    </button>
                    <button onClick={() => this.handleButtonClick("5")}>
                      5
                    </button>
                    <button onClick={() => this.handleButtonClick("4")}>
                      4
                    </button>
                    <button onClick={() => this.handleButtonClick("3")}>
                      3
                    </button>
                    <button onClick={() => this.handleButtonClick("2")}>
                      2
                    </button>
                    <button onClick={() => this.handleButtonClick("1")}>
                      1
                    </button>
                    <button onClick={() => this.handleButtonClick("0")}>
                      0
                    </button>
                    <button onClick={() => this.handleButtonClick(".")}>
                      .
                    </button>
                    <button onClick={() => this.handleButtonClick("-")}>
                      -
                    </button>
                  </div>
                </div>
              </div>

              <div id="thirdCol">
                <div className="btNumbersAc">
                  <button id="Ac" onClick={this.handleAcInput}>
                    Ac
                  </button>
                  <button id="clear" onClick={this.handleClear}>
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="second-row-bill">
          <div className="imae-row">
            <div id="erroButtons">
              <div className="arrows">
                <img src={up} alt="Not visible" className="arrow" />
              </div>

              <div className="scroll">
                {/* <button className="varaites"  onClick={() => this.handleFilter("Burgger")} >Burgger</button>
            
*/}
                {filteredItem.map((item, index) => (
                  <div key={index} className="varaites">
                    <button
                      className="itemButton"
                      onClick={() => this.handleFilterImge(item.itemName)}
                    >
                      {item.itemName}
                    </button>
                  </div>
                ))}
              </div>

              <div className="arrows">
                <img src={Down} alt="Not visible" className="arrow" />
              </div>
            </div>
            <div className="imagesg">
              {/*
            <img src={cofee} alt="Not visible" onClick={() => this.handleFilterImge("Coffee")}/>

            <div className="defalutImage">
             <h6>Soya Milk</h6>
             <img src={soya_milk} alt="Not visible"  onClick={() => this.handleFilterImge("soya milk")}/>
             </div>
           
            
       */}

              {filteredItems.map((item, index) => (
                <div key={index} className="defalutImage">
                  <h6>{item.itemName}</h6>
                  <img
                    src={imagePaths[index]} // Use the corresponding image path from the array
                    alt="Not visible"
                    onClick={() => this.handleFilterImge(item.itemName)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="billingButtons">
            <div class="firstbill">
              <div class="firstsizebtn">
                <button id="newbill" onClick={this.handleNewBillClick}>
                  New Bill
                </button>

                <button>Price</button>
              </div>

              <div class="billingButton">
                <BillingButton
                  isShown={showFirstBill}
                  onGenerateBillClick={this.handleGenerateBillClick}
                />
              </div>
            </div>

            <div class="secondbill">
              <div class="secondsizebtn">
                {/*<button >$2</button>
            <button >$10</button>
            <button >$5</button>
            <button >$50</button>
           */}
              </div>
            </div>
            <div class="thirdbill">
              <div class="thirdsizebtn">
                <button>New cash Box</button>
                <button>Terminate Transition</button>
              </div>
              <div class="secondsizebtn">
                <button>Gift Voucher</button>
              </div>
            </div>
            <div class="fourthbill">
              <div class="thirdsizebtn">
                <button>Goods Return</button>
                <button>Print</button>
                <button>Reversed Transaction</button>
                <button>Restore</button>
              </div>
            </div>
            <div class="fithbill">
              <div class="fithsizebtn">
                <button onClick={this.handleCancleItem}>Cancle item</button>
                <Link to="/addeditems">
                  <button>Add item</button>
                </Link>

                <button onClick={this.handleDeleterows}>Delete All</button>
                <Link to="/mainMenu">
                  <button>Main Menu</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
