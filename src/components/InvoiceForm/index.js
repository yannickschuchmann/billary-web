import React, { Component, PropTypes } from 'react';
import ui from 'redux-ui';
import { Divider, MenuItem, FlatButton, IconButton, RaisedButton } from 'material-ui/lib';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import RemoveIcon from 'material-ui/lib/svg-icons/content/remove-circle-outline';
import RemoveActiveIcon from 'material-ui/lib/svg-icons/content/remove-circle';
import { Form } from 'formsy-react';
import { SelectField, DateField, TextField, HiddenField } from '../FormFields';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import objectAssign from 'object-assign';


class InvoiceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      line_items: this.setLineItemPrices(props.item.line_items),
      canSubmit: false
    };
  }
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    item: PropTypes.object,
    clients: PropTypes.array
  };

  calculatePrice(item) {
    return Math.round((item.quantity * item.rate) * 100) / 100;
  }

  setLineItemPrices(lineItems) {
    return lineItems.map((item) => {
      item.price = this.calculatePrice(item);
      return item
    })
  };

  enableSubmit() {
    this.setState({
      canSubmit: true
    });
  };

  disableSubmit() {
    this.setState({
      canSubmit: false
    });
  };

  submit(model) {
    model.id = this.props.item.id;
    this.props.onSubmit(model);
    this.props.onRequestClose();
  };

  reset() {
    this.refs.form.reset();
  };

  addLineItem() {
    let items = this.state.line_items;
    items.push({});
    this.setState({lineItems: items});
  };

  handlePrice(index, field, e) {
    const lineItems = this.state.line_items;
    let item = lineItems[index]
    item[field] = e.target.value;
    item.price = this.calculatePrice(item);
    lineItems[index] = item;
    this.setState({
      line_items: lineItems
    });
  };

  handleDestroy(index, e) {
    const lineItems = this.state.line_items;
    lineItems[index]._destroy = !lineItems[index]._destroy;
    this.setState({
      line_items: lineItems
    });
  };

  render() {
    const { id, number, terms, client_id, invoiced_at } = this.props.item;
    const isEditing = !!id;
    const submitButton = (
      <RaisedButton
        type="submit"
        label={isEditing ? "update" : "create"}
        primary={true}
        disabled={!this.state.canSubmit}/>
    );
    const cancelButton = (
      <FlatButton
        label="cancel"
        secondary={true}
        onClick={this.props.onRequestClose}
        />
    );

    const indexStyle = {
      width: 10
    };

    const lineItemTextFieldStyle = {
      marginBottom: 10,
      marginTop: 10
    }

    const lineItems = this.state.line_items.map((item, i) => {
      const { id, number, label, quantity, rate, _destroy } = item;
      return (
        <TableRow key={i}>
          <TableRowColumn style={indexStyle}>
            {i + 1}
            <HiddenField name={`line_items_attributes[${i}].id`} value={id} />
          </TableRowColumn>
          <TableRowColumn>
            <TextField
              style={lineItemTextFieldStyle}
              name={`line_items_attributes[${i}].label`}
              value={label}
              hintText="Position Label"
              required={!_destroy} />
          </TableRowColumn>
          <TableRowColumn>
            <TextField
              style={lineItemTextFieldStyle}
              onChange={this.handlePrice.bind(this, i, "quantity")}
              name={`line_items_attributes[${i}].quantity`}
              value={quantity}
              hintText="Quantity"
              required={!_destroy}
              validations={{
                isNumeric: true
              }}
              validationError={{
                isNumeric: "Must be numeric (e.g. 2.4)"
              }} />
          </TableRowColumn>
          <TableRowColumn>
            <TextField
              style={lineItemTextFieldStyle}
              onChange={this.handlePrice.bind(this, i, "rate")}
              name={`line_items_attributes[${i}].rate`}
              value={rate}
              hintText="Unit price"
              required={!_destroy}
              validations={{
                isNumeric: true
              }}
              validationError={{
                isNumeric: "Must be numeric (e.g. 2.44)"
              }} />
          </TableRowColumn>
          <TableRowColumn>
            {item.price}
          </TableRowColumn>
          <TableRowColumn>
            <IconButton onClick={this.handleDestroy.bind(this, i)}>
              { item._destroy ? <RemoveActiveIcon color="#ff0000" /> : <RemoveIcon/> }
            </IconButton>
            <HiddenField name={`line_items_attributes[${i}]._destroy`} value={_destroy} />
          </TableRowColumn>
        </TableRow>
      )
    });
    lineItems.push((
      <TableRow key={"new-line-item"}>
        <TableRowColumn colSpan="6" style={{textAlign: 'center'}}>
          <FlatButton
            label="Add new line item"
            labelPosition="after"
            style={{}}
            onClick={this.addLineItem.bind(this)}
            icon={<AddIcon />}/>
        </TableRowColumn>
      </TableRow>
    ));

    const clientOptions = this.props.clients.map((item, i) => (
      <MenuItem
        key={i}
        value={item.id}
        primaryText={item.name} />
    ));

    return (
      <div className="invoice-form">
        <Form ref="form"
          onValidSubmit={this.submit.bind(this)}
          onValid={this.enableSubmit.bind(this)}
          onInvalid={this.disableSubmit.bind(this)}>
          <h2>Invoice details</h2>
          <div className="invoice-fields">
            <TextField name="number" value={number} floatingLabelText="Invoice Number" required />
            <TextField name="terms" type="number" value={terms || 14} floatingLabelText="Terms" placeholder="14 days" required />
            <DateField name="invoiced_at" mode="landscape" value={invoiced_at} floatingLabelText="date of invoice" required />
            <SelectField
              value={client_id}
              name="client_id"
              floatingLabelText="Client"
              required
              errorStyle={{
                top: "100%",
                bottom: "auto",
                position: "absolute"
              }}
              >
              {clientOptions}
            </SelectField>
          </div>
          <h2>Invoice line items</h2>
          <div className="line-items-fields">
            <Table
              multiSelectable={false}
              selectable={false}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn style={indexStyle}>#</TableHeaderColumn>
                  <TableHeaderColumn>Label</TableHeaderColumn>
                  <TableHeaderColumn>Quantity</TableHeaderColumn>
                  <TableHeaderColumn>Unit price</TableHeaderColumn>
                  <TableHeaderColumn>Price</TableHeaderColumn>
                  <TableHeaderColumn>Delete</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                deselectOnClickaway={false}
                displayRowCheckbox={false}
                showRowHover={false}>
                {lineItems}
              </TableBody>
            </Table>
          </div>
          <div className="buttons">
            {cancelButton}
            {submitButton}
          </div>
        </Form>
      </div>
    )
  }
}

export default ui({
  state: {
  }
})(InvoiceForm)
