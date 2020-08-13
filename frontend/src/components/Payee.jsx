import React from "react";
import { connect } from "react-redux";
import { deletePayee } from "../redux/actions/payeeActions";

const Payee = ({ payee, deletePayee }) => {
  return (
    <div>
      <p>
        {payee.id} {payee.fullname} {payee.nickname} {payee.accnumber} {payee.ifsccode}
        <input class="btn btn-primary btn-sm" type="button" value="Delete Payee" onClick={() => deletePayee(payee.id)}></input>
      </p>
    </div>
  );
};

export default connect(null, { deletePayee })(Payee);
