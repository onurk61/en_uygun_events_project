import React, { useEffect } from 'react';
import StyledDataGrid from '../../components/StyledDataGrid/StyledDataGrid';
import { Grid, Tooltip } from '@mui/material';
import { getEventsList } from '../../features/EventsSlice';
import { useTranslation } from 'react-i18next';
import { GridColDef, GridCellParams } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, AppDispatch } from '../../store/index';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Base_URL } from '../../customFunctions/customFunctions';
import IconComp from '../../utils/IconComp';
import AddCardIcon from '@mui/icons-material/AddCard';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const listOfEvents = useSelector((state: IRootState) => state.events.eventsList);
  const isLoading = useSelector((state: IRootState) => state.events.eventsListLoading);

  const columns: GridColDef[] = [
    {
      field: 'eventName',
      headerName: t('event_name'),
      flex: 2,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'location',
      headerName: t('location'),
      flex: 2,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'startDate',
      headerName: t('start_date'),
      flex: 2,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'quota',
      headerName: t('quota'),
      flex: 2,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'totalParticipant',
      headerName: t('total_participant'),
      flex: 2,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'isFull',
      headerName: t('isFull'),
      flex: 2,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridCellParams) => {
        return (
          <Tooltip title={params.value ? t('yes') : t('no')} placement="top">
            <Box sx={{ padding: '0' }}>{params.value ? <IconComp icon="success-icon" size="22" /> : <IconComp icon="critical-error" size="22" />}</Box>
          </Tooltip>
        );
      },
    },
    {
      field: 'price',
      headerName: t('price'),
      flex: 2,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridCellParams) => {
        return <Box>${params.value as any}</Box>;
      },
    },
    {
      field: 'actions',
      headerName: t('pay-and-join'),
      flex: 2,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridCellParams) => {
        return (
          <Tooltip title={t('participate')}>
            <Button
              onClick={() => {
                navigate('/reservation/' + params.id, { state: { title: params.row.eventName } });
              }}
              variant="contained"
              color="success"
            >
              <AddCardIcon />
            </Button>
          </Tooltip>
        );
      },
    },
  ];

  const dummyData = [
    { eventId: '1', eventName: 'Su Sporları', location: 'Antalya', startDate: '17/7/2024', quota: 33, totalParticipant: 14, price: 35, isFull: false },
    { eventId: '2', eventName: 'Plaj Voleybolu', location: 'Muğla', startDate: '14/7/2024', quota: 10, totalParticipant: 10, price: 25, isFull: true },
    { eventId: '3', eventName: 'Plaj Futbolu', location: 'Bodrum', startDate: '15/7/2024', quota: 14, totalParticipant: 8, price: 20, isFull: false },
  ];

  // useEffect(() => {
  //   dispatch(getEventsList(`${Base_URL}listOfEvents`));
  // }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <StyledDataGrid getRowId={(row) => row.eventId} rows={dummyData} columns={columns} isLoading={false} checkboxSelection={true} field={'startDate'} sort={'asc'} />
      </Grid>
    </Grid>
  );
};

export default Home;
