import React, {PropTypes} from 'react';
import { moment } from '../../businessLogic/calendarHelper';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import Pdf from 'material-ui/lib/svg-icons/image/picture-as-pdf';
import { Link } from 'react-router';
import { API_PATH } from '../../api/helpers';

const InvoiceListing = ({invoices, onSelect, selected}) => {
  const items = invoices.map((item, i) => (
    <TableRow key={i}>
      <TableRowColumn>{item.number}</TableRowColumn>
      <TableRowColumn>{item.client.name}</TableRowColumn>
      <TableRowColumn>{item.price}</TableRowColumn>
      <TableRowColumn>{moment(item.created_at).format("L")}</TableRowColumn>
      <TableRowColumn><a target="blank" href={`${API_PATH}/invoices/${item.id}.pdf`}><Pdf/></a></TableRowColumn>
    </TableRow>
  ));

  return (
    <Table multiSelectable={false} className="invoice-listing" selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn tooltip="Invoice number">#</TableHeaderColumn>
          <TableHeaderColumn>Client</TableHeaderColumn>
          <TableHeaderColumn>Price (incl. VAT)</TableHeaderColumn>
          <TableHeaderColumn>Created At</TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        deselectOnClickaway={false}
        displayRowCheckbox={false}
        showRowHover={false}>
        {items}
      </TableBody>
    </Table>
  )
};

InvoiceListing.propTypes = {
  invoices: PropTypes.array,
  selected: PropTypes.number
};

export default InvoiceListing;
