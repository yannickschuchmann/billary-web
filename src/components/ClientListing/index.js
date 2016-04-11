import React, {PropTypes} from 'react';
import { moment } from '../../businessLogic/calendarHelper';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

const ClientListing = ({clients, onSelect, selected}) => {
  const items = clients.map((item, i) => (
    <TableRow key={i} selected={i === selected}>
      <TableRowColumn>{item.number}</TableRowColumn>
      <TableRowColumn>{item.name}</TableRowColumn>
      <TableRowColumn>{moment(item.created_at).format("L")}</TableRowColumn>
    </TableRow>
  ));

  return (
    <Table multiSelectable={false} onRowSelection={onSelect} className="client-listing">
      <TableHeader displaySelectAll={false} adjustForCheckbox={true}>
        <TableRow>
          <TableHeaderColumn tooltip="Client number">#</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Created At</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        deselectOnClickaway={false}
        displayRowCheckbox={true}
        showRowHover={true}>
        {items}
      </TableBody>
    </Table>
  )
};

ClientListing.propTypes = {
  clients: PropTypes.array,
  selected: PropTypes.number
};

export default ClientListing;
