import React from 'react';
import { Container, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseDispatchHook, UseSelectorHook } from '../_hook/HangulMakerHook';
import { getFisrt, getMiddle, getLast, getConsonant, consonantCountAction, vowelCountAction } from '../_slice/ComposeHangulSlice';

import HangulMaker from '../commons/HangulMaker/HangulMaker';
import AreaTranslate from '../components/composeHangul/AreaTranslate';
import AreaDiscompose from '../components/composeHangul/AreaDiscompose';
import AreaSyllable from '../components/composeHangul/AreaSyllable';
import AreaSentence from '../components/composeHangul/AreaSentence';
import { BlackWhite, GradientBlueToPink } from '../_css/ReactCSSProperties';
import HangulName from '../commons/HangulName';

export default function ComposeHangul() {
  const walletAddress = UseSelectorHook(state => state.user.currentUser.wallet_address);
  const dispatch = UseDispatchHook();
  React.useEffect(()=>{
    if(walletAddress.charAt(0)==='0'){
      dispatch(getConsonant(walletAddress));
      dispatch(getMiddle(walletAddress));
    }
  }, [walletAddress]);
  
  return (
    <Container style={{ ...BlackWhite, padding:0, borderRadius:10, border:"none" }}>
      <div style={{margin:30, fontSize:50}}>Make Your Own Words</div>
      <Grid container alignItems="flex-end">
        <Grid container item xs={6} style={{ minWidth:580, paddingTop: 20, paddingLeft: 10, paddingRight:10, paddingBottom: 20 }}>
          <Grid item xs={12}><AreaTranslate/></Grid>
          <Grid item xs={12}><AreaDiscompose/></Grid>
        </Grid>
        <Grid container item xs={6} style={{ minWidth:580, minHeight:560, padding : 10}}>
          <Grid item xs={12}><HangulMaker test={false}/></Grid>
        </Grid>
        <Container style={{padding:10}}><Grid item xs={12}><AreaSyllable/></Grid></Container>
        <Grid item xs={12}><AreaSentence/></Grid>
      </Grid>
    </Container>
  );
}