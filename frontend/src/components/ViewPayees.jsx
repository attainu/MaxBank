import React from "react";
import { connect } from "react-redux";
import Payee from "../components/Payee";

class ViewPayees extends React.Component {
  render() {
    if (this.props.payees.length > 0) {
      return (
        <>
          {this.props.payees.map((payee) => (
            <Payee key={payee.id} payee={payee} />
          ))}
        </>
      );
    } else {
      return <h4 className="text-danger">No payees registered yet!</h4>;
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    payees: storeState.payeeState.payees,
  };
};

export default connect(mapStateToProps)(ViewPayees);
