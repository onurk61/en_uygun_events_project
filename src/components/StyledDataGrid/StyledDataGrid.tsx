import React, { ReactNode, useEffect, useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { Box, CircularProgress } from '@mui/material';
import { IRootState } from '../../store/index';
import { useSelector } from 'react-redux';

const StyledDataGridTable = styled(DataGrid)(({ theme }) => ({
  border: '1px solid #E9EEF0',
  borderRadius: '8px',
  color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
  },
  '& .MuiDataGrid-cell': {
    color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
}));

interface StyledDataGridProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  isLoading: boolean;
  getRowId: (row: any) => any;
  hiddenColumns?: { [key: string]: boolean };
  groupColumns?: boolean;
  groupColumnsModel?: any;
  checkboxSelection?: boolean;
  slots?: any;
  field?: any;
  sort?: any;
}

const StyledDataGrid: React.FC<StyledDataGridProps> = ({ field, sort, getRowId, rows, slots, columns, isLoading, hiddenColumns, groupColumns, groupColumnsModel, checkboxSelection }) => {
  const errorMessage = useSelector((state: IRootState) => state.events.errorMessage);
  const [content, setContent] = useState<ReactNode>(errorMessage);

  useEffect(() => {
    if (errorMessage !== '') {
      setContent(<h1>{errorMessage}</h1>);
    } else {
      setContent(
        <StyledDataGridTable
          experimentalFeatures={{ warnIfFocusStateIsNotSynced: groupColumns }}
          columnGroupingModel={groupColumnsModel}
          getRowId={getRowId}
          rows={rows}
          columns={columns}
          checkboxSelection={checkboxSelection}
          initialState={{
            columns: {
              columnVisibilityModel: hiddenColumns,
            },
            sorting: {
              sortModel: [{ field: field, sort: sort }],
            },
          }}
          autoHeight={true}
          slots={slots}
        />
      );
    }
  }, [errorMessage, getRowId, rows, columns]);

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!isLoading && content}
    </>
  );
};

export default StyledDataGrid;
