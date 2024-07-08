import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, styled, InputLabel, FormControl, InputBase } from '@mui/material';
import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IRootState, AppDispatch } from '../store/index';
import { useSelector, useDispatch } from 'react-redux';
import InputMask from 'react-input-mask';
import * as yup from 'yup';
import axios from 'axios';
import { Formik, Form } from 'formik';
import IconComp from '../utils/IconComp';
import { Base_URL } from '../customFunctions/customFunctions';

interface ReservationProps {}

interface InputBaseProps {
  haserror?: any;
}

const InputLabelCustom = styled(InputLabel)<InputBaseProps>(({ haserror }) => ({
  fontSize: '15px',
  fontWeight: '400',
  color: `${haserror ? 'red' : '#5D717A'}`,
  transform: 'none',
  '&.Mui-focused': { color: `${haserror ? 'red' : '#5D717A'}` },
}));

const BootstrapInput = styled(InputBase)<InputBaseProps>(({ theme, haserror }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '&.MuiInputBase-root': {
    width: '100%',
  },
  '& .MuiInputBase-input': {
    borderRadius: '8px',
    position: 'relative',
    backgroundColor: '#FFF',
    border: `1px solid ${haserror ? 'red' : '#E9EEF0'}`,
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&:focus': {
      borderColor: `${haserror ? 'red' : 'rgba(145, 161, 169, 1)'}`,
    },
  },
}));

const Reservation: React.FC<ReservationProps> = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const { t } = useTranslation();
  const navigateProps = useLocation();

  const schema = yup.object().shape({
    user_name: yup.string().required(t('required-field')),
    user_lastName: yup.string().required(t('required-field')),
    user_email: yup
      .string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, t('invalid-email'))
      .required(t('required-field')),
    user_phone: yup
      .string()
      .matches(/^(05)[0-9][0-9][\s]([0-9]){3}[\s]([0-9]){2}[\s]([0-9]){2}/, t('invalid-phone-example'))
      .required(t('required-field')),
  });

  useEffect(() => {
    if (timeLeft === 0) {
      navigate('/home');
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, navigate]);

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const dummyData = [
    { eventId: '1', eventName: 'Su Sporları', location: 'Antalya', startDate: '17/7/2024', quota: 33, totalParticipant: 14, price: 35, isFull: false },
    { eventId: '2', eventName: 'Plaj Voleybolu', location: 'Muğla', startDate: '14/7/2024', quota: 10, totalParticipant: 10, price: 25, isFull: true },
    { eventId: '3', eventName: 'Plaj Futbolu', location: 'Bodrum', startDate: '15/7/2024', quota: 14, totalParticipant: 8, price: 20, isFull: false },
  ];

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1 style={{ fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, margin: 0 }}>Event - {navigateProps.state.title}</h1>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h4 style={{ padding: '0', margin: '0' }}>{t('redirect-message')}</h4>
          <p style={{ padding: '0', margin: '0', fontWeight: '600', color: 'red' }}>
            {formatTime(timeLeft)}
            {t('left-minute')}
          </p>
        </Box>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <Formik
          initialValues={{ user_name: '', user_lastName: '', user_phone: '', user_email: '' }}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            navigate('/payment');
            // try {
            //   axios.post(`${Base_URL}/payment`, values).then((res) => {
            //     if (res.status === 200) {
            //       resetForm();
            //     }
            //   });

            //   return;
            // } catch (error: any) {
            //   console.log('error', error);
            // }
          }}
        >
          {({ values, errors, dirty, handleChange, handleBlur, resetForm }) => (
            <Form>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#1f1f1d' }}>{t('reservation-form')}</span>
                  <IconComp icon="card-setting" size="14" />
                </Box>
                <Box>
                  <Button variant="text" onClick={() => resetForm()} sx={{ background: 'transparent', color: '#1f1f1d', boxShadow: 'none', textTransform: 'none', textDecoration: 'underline' }}>
                    {t('clear-form')}
                  </Button>
                </Box>
              </Box>
              <Grid item xs={12}>
                <FormControl variant="standard" sx={{ width: '100%', marginBottom: '12px' }}>
                  <InputLabelCustom shrink htmlFor="user_name" haserror={errors.user_name}>
                    {t('name')}
                  </InputLabelCustom>
                  <BootstrapInput id="user_name" name="user_name" value={values.user_name} haserror={errors.user_name} placeholder={t('name')} onChange={handleChange} onBlur={handleBlur} />
                </FormControl>
                {errors.user_name && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <IconComp icon="info-high" size="14" />
                    <span style={{ color: 'red', fontSize: '11px', fontWeight: '500' }}>{errors.user_name}</span>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard" sx={{ width: '100%', marginBottom: '12px' }}>
                  <InputLabelCustom shrink htmlFor="user_lastName" haserror={errors.user_lastName}>
                    {t('lastName')}
                  </InputLabelCustom>
                  <BootstrapInput id="user_lastName" name="user_lastName" value={values.user_lastName} haserror={errors.user_lastName} placeholder={t('lastName')} onChange={handleChange} onBlur={handleBlur} />
                </FormControl>
                {errors.user_lastName && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <IconComp icon="info-high" size="14" />
                    <span style={{ color: 'red', fontSize: '11px', fontWeight: '500' }}>{errors.user_lastName}</span>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard" sx={{ width: '100%', marginBottom: '12px' }}>
                  <InputLabelCustom shrink htmlFor="user_phone" haserror={errors.user_phone}>
                    {t('phone-number')}
                  </InputLabelCustom>
                  <BootstrapInput id="user_phone" name="user_phone" value={values.user_phone} haserror={errors.user_phone} placeholder={t('phone-number')} onChange={handleChange} onBlur={handleBlur} />
                </FormControl>
                {errors.user_phone && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <IconComp icon="info-high" size="14" />
                    <span style={{ color: 'red', fontSize: '11px', fontWeight: '500' }}>{errors.user_phone}</span>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard" sx={{ width: '100%', marginBottom: '12px' }}>
                  <InputLabelCustom shrink htmlFor="user_email" haserror={errors.user_email}>
                    {t('email')}
                  </InputLabelCustom>
                  <BootstrapInput id="user_email" name="user_email" value={values.user_email} haserror={errors.user_email} placeholder={t('email')} onChange={handleChange} onBlur={handleBlur} />
                </FormControl>
                {errors.user_email && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <IconComp icon="info-high" size="14" />
                    <span style={{ color: 'red', fontSize: '11px', fontWeight: '500' }}>{errors.user_email}</span>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      background: '#8ACD2F',
                      padding: '12px 16px',
                      maxHeight: '50px',
                      borderRadius: '6px',
                      border: 'none',
                      boxShadow: 'none',
                    }}
                  >
                    $35 {t('pay')}
                  </Button>
                </Box>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default Reservation;
