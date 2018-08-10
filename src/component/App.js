import React, { Component } from "react";
import { InputItem, WingBlank, Button, WhiteSpace, Modal } from "antd-mobile";
import { connect } from "dva";
import queryString from 'query-string';
import Cookies from 'universal-cookie';
import css from "./App.less";

class App extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
  }
  componentDidMount() {

    const {code, state} = queryString.parse(window.location.search);

    const cookies = new Cookies();

    this.dispatch({
      type: "paymentModel/updateState",
      payload: {
        code, state,
        openinfo: cookies.get('openinfo') || '',
      }
    });
  }

  onChange = (input, type) => {
    this.dispatch({
      type: "paymentModel/updateState",
      payload: {
        [type]: input
      }
    });
  };
  onConfirm = () => {
    this.dispatch({
      type: "paymentModel/initializeState",
      payload: ["showModal"]
    });
  };
  onSubmit = value => {
    const { username, amount } = this.props;

    let modalText = "";
    if (!username) {
      modalText = "会员帐号只能由数字、大小写字母组成!";
    } else {
      if (isNaN(amount)) {
        modalText = "[提示]金额非有效数字！";
      } else {
        const valAmount = isNaN(parseInt(amount, 10))
          ? 0
          : parseInt(amount, 10);
        if (valAmount < 1) {
          modalText = "[提示]1元以上才能充值！";
        } else 
        if (valAmount > 100000) {
          modalText = "[提示]充值金额不能超过100000！";
        }
      }
    }

    if (modalText !== "") {
      this.dispatch({
        type: "paymentModel/updateState",
        payload: {
          modalText,
          showModal: true
        }
      });
    } else {
      this.dispatch({
        type: "paymentModel/submitPayment"
      });
    }
  };
  render() {
    const { modalText, showModal } = this.props;
    return (
      <div className={css.App}>
        <div className={css.App_Header}>
          <div className={css.App_HeaderInner}>在线充值</div>
        </div>
        <WingBlank>
          <WhiteSpace />
          <div className={css.App_Notice}>充值信息</div>
          <WhiteSpace />
        </WingBlank>
        <InputItem
          placeholder="请输入您的会员账号"
          onChange={input => this.onChange(input, "username")}
        >
          账号
        </InputItem>
        <InputItem
          placeholder="请输入充值金额，单位元"
          onChange={input => this.onChange(input, "amount")}
        >
          金额
        </InputItem>
        <WingBlank>
          <WhiteSpace />
          <div className={css.App_Notice}>单笔最低金额10元， 最高100000元</div>
          <WhiteSpace size="xl" />
          <Button className={css.App_SubmitBtn} onClick={this.onSubmit}>
            确定
          </Button>
        </WingBlank>
        <Modal
          visible={showModal}
          transparent
          maskClosable={false}
          title=""
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div className={css.App_Modal}>
            <div className={css.App_ModalValidationText}>{modalText}</div>
            <WhiteSpace />
            <div className={css.App_ModalConfirm}>
              <button
                className={css.App_ModalConfirmBtn}
                onClick={this.onConfirm}
              >
                确定
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStatesToProps = ({ paymentModel }) => {
  return { ...paymentModel };
};

export default connect(mapStatesToProps)(App);
