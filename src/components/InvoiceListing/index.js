import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import { moment } from '../../businessLogic/calendarHelper';
import { API_PATH } from '../../api/helpers';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import Pdf from 'material-ui/lib/svg-icons/image/picture-as-pdf';
import IconButton from 'material-ui/lib/icon-button';
import EditIcon from 'material-ui/lib/svg-icons/image/edit';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';

const InvoiceListing = ({invoices, onSelect, selected, onEdit, onDelete}) => {
  const items = invoices.map((item, i) => (
    <TableRow key={i}>
      <TableRowColumn>{item.number}</TableRowColumn>
      <TableRowColumn>{item.client.name}</TableRowColumn>
      <TableRowColumn>{item.price}</TableRowColumn>
      <TableRowColumn>{moment(item.created_at).format("L")}</TableRowColumn>
      <TableRowColumn>
        <a
          style={{
            height: 48,
            width: 48,
            padding: 12,
            display: "inline-block",
            boxSizing: "border-box"
          }}
          target="_blank"
          href={`${API_PATH}/invoices/${item.id}.pdf`}><Pdf/></a>
        <IconButton onClick={(e) => onEdit(item)}>
          <EditIcon/>
        </IconButton>
        <IconButton onClick={(e) => onDelete(item)}>
          <DeleteIcon/>
        </IconButton>
      </TableRowColumn>
    </TableRow>
  ));

  return (
    <div className="invoice-listing">
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
    </div>
  )
};

InvoiceListing.propTypes = {
  invoices: PropTypes.array,
  selected: PropTypes.number,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default InvoiceListing;
