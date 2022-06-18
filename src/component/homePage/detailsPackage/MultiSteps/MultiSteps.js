
import { useState, Fragment, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useMediaQuery } from "react-responsive"
import Button from '@mui/material/Button';
import { styled, makeStyles } from '@mui/material/styles';
import { useTranslation } from "react-i18next";
import "../MultiSteps/stepsModule.css"
import Arrow from "../../images/Arrow.png"
import check from "../../images/check.png"
import Address_point from './stepsNum/address_step';
import SetDataToServer from './checkTypePackage&postData';
import SliderPrice from './stepsNum/sliderPrice';
import FullNameAndPhone from "./stepsNum/fullNameAndPhone"
import Summary from "./stepsNum/summary";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PopUpValidPhone from './popUPValidPhone';

import ShipmentTracking from './stepsNum/shipment_tracking';
import { updateServer } from "././stepsNum/updateServer"
import { useParams } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import { Dialog, Alert } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { smsValidationApi } from './sms_validation_api';





const steps = [1, 2, 3, 4, 5];

export default function MultiSteps({
  activeStep,
  setActiveStep,
  val,
  setVal,
  nameAndPhone,
  setNameAndPhone,
  getDataFromServer,
  setGetDataFromServer,
  responseGetById,
  setResponseGetById,
  detailsOfPackage,
  setDetailsOfPackage,
  setShowSteps,
  errorAutoComplet,
  setErrorAutoComplet,
  checkboxValue,
  setCheckboxValue,
  setExitaddress, exitAddress, time, setTime }) {



  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 650px)' })
  const { t, i18n } = useTranslation();
  const { token } = useParams()
  const [openMoreDetailsPopUp, setOpenMoreDetailsPopUp] = useState(false)
  const [loadingTakesTime, setLoadingTakesTime] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateServer, setIsUpdateServer] = useState(false);
  const [errorsPhoneName, setErrorsPhoneName] = useState({ name: false, phone: false });
  const [responseSmsValid, setResponseSmsValid] = useState(null);
  const [verificationCheck, setVerificationCheck] = useState(null);






  // console.log(getDataFromServer);


  useEffect(() => {

    if (token) {
      !responseGetById && setActiveStep(5)
      setIsUpdateServer(true)
    }
  }, [])


  useEffect(() => {

    setTimeout(() => {
      getDataFromServer.isLoading == true && setLoadingTakesTime(true)
    }, 5000)

  }, [getDataFromServer])




  //   useEffect(() => {
  //     // console.log(getDataFromServer);
  //     if (getDataFromServer.isLoading == 'error') {
  //         setTimeout(function(){
  //           window.location.reload()
  //           },3000)

  //     }

  // }, [getDataFromServer])






  const switchEditBtnSummary = (key) => {
    switch (key) {
      case "locationAndDateOfPackage":
        setShowSteps(false)

      case "detailsOfPackage":
        setActiveStep((prevActiveStep) => prevActiveStep - 4);
        break;
      case "checked":
        setActiveStep((prevActiveStep) => prevActiveStep - 3);
        break;
      case "payAmount":
        getDataFromServer.isLoading = false
        setGetDataFromServer({ ...getDataFromServer })
        setActiveStep((prevActiveStep) => prevActiveStep - 2);
        break;
      case "fullNameAndPhone":

        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        break;
      default:
        break;
    }

  }




  const totalSteps = () => {
    return steps.length;
  };


  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };


  const phone = 'phone';
  const bool = true;
  const name = 'name';

  const handleNext = async () => {

    if (activeStep === 0 && !detailsOfPackage.length) {
      setErrorAutoComplet("הכנס כתובת מסירה")
      return
    }


    if (activeStep >= 0) {
      getDataFromServer.new_price = val
      setGetDataFromServer({ ...getDataFromServer })
    }



    if (activeStep == 1 && getDataFromServer.isLoading == 'start') {
      getDataFromServer.isLoading = true
      setGetDataFromServer({ ...getDataFromServer })

    }



    if (activeStep === 3) {
      console.log('eha');
      if (!nameAndPhone.phoneNumber && nameAndPhone.fullName) {

        return setErrorsPhoneName(prevState => ({
          ...prevState,
          [phone]: bool,

        }));


      }
      if (!nameAndPhone.fullName && nameAndPhone.phoneNumber) {

        return setErrorsPhoneName(prevState => ({
          ...prevState,
          [name]: bool
        }));

      }
      if (!nameAndPhone.fullName && !nameAndPhone.phoneNumber) {

        return setErrorsPhoneName(prevState => ({
          ...prevState,
          [phone]: bool,
          [name]: bool
        }));
      }


      const result = await smsValidationApi({ getDataFromServer, nameAndPhone, token })
      if (result !== 'phone not verified') {
        setResponseSmsValid(result)
      } else {
        setResponseSmsValid(null)
      }

    }

    if (activeStep === 4 && !isUpdateServer) {
      setIsLoading(true)
      // console.log(getDataFromServer, 'hjgjkgkjti');
      const result = await updateServer({
        checkboxValue, detailsOfPackage,
        getDataFromServer,
        setGetDataFromServer,
        exitAddress
        , nameAndPhone,
        time
      })
      result === 'ok' && setIsUpdateServer(true)
      setIsLoading(false)

    }
    const newActiveStep =
      activeStep + 1;
    setActiveStep(newActiveStep);
  }



  const handleBack = () => {
    if (activeStep === 0) {
      return setShowSteps(false)
    }


    if (activeStep === 2) {

      getDataFromServer.new_price = val
      setGetDataFromServer({ ...getDataFromServer })
    }

    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };


  let height = ''
  const heightResponsive = () => {

    if (isMobile) {

      return height = '62px'
    }
    if (isTabletOrMobile) {

      return height = '62px'
    }
    return height = '62px'
  }



  const showBtnActionOrNot = () => {
    let bool;
    if (isMobile && openMoreDetailsPopUp || isMobile && showInput) {
      return bool = false
    }

    if (activeStep === 4 && !responseSmsValid) {

      return bool = false
    }

    if (isMobile && !openMoreDetailsPopUp) {

      return bool = true
    }

    if (!isMobile && !openMoreDetailsPopUp) {

      return bool = true
    }
    // if (isMobile && showInput) {

    //   return bool = false
    // }
    // return true
  }

  const btnLabel = () => {
    if (activeStep < 3 && !isMobile) {
      return t('STEPS_NEXT')
    }
    if (activeStep < 3 && isMobile) {
      return t("DETAILS_OF_PACKAGE_CONTINUE")
    }

    if (activeStep == 3) {
      return t("STEPS_NUM_4_ABOUT_YOU_BTN")
    }

    if (activeStep == 4) {
      return t("SUMMARY_BTN")
    }
  }


  return (


    <Box sx={{ width: '100%' }}>

      {activeStep < 5 ? (<div className='MuiStepper' >
        <div className='stepper' >



          <div id={1} className='flex_stepper'  >
            <div className='step_completed'><img src={check} alt='check' /></div>
            <div><span className='step_line_completed'></span></div></div>




          <div id={2} className='flex_stepper'  >
            <div className={activeStep > 0 ? 'step_completed' : "step_active"}>
              {activeStep > 0 ? <img src={check} alt='check' /> :
                <span className={activeStep > 0 ? 'circle_steps_completed' : "circle_steps"}>2</span>}  </div>
            <span className={activeStep == 0 ? 'step_line_active' : 'step_line_completed'}></span></div>




          <div id={3} className='flex_stepper'  >
            <div className={activeStep == 1 ? 'step_active' : activeStep < 1 ? 'step' : "step_completed"}>
              {activeStep < 2 ? (
                <span className={activeStep > 1 ? 'circle_steps_completed' : "circle_steps"}>3</span>
              ) : <img src={check} alt='check' />}
            </div>
            <div><span className={activeStep == 1 ? 'step_line_active' : activeStep > 1 ? 'step_line_completed' : 'step_line'}></span></div></div>




          <div id={4} className='flex_stepper'  >
            < div className={activeStep == 2 ? 'step_active' : activeStep < 2 ? 'step' : "step_completed"}>
              {activeStep < 3 ? (<span className={activeStep > 2 ? 'circle_steps_completed' : "circle_steps"}>4</span>
              ) : <img src={check} alt='check' />}
            </div>
            <div>
              <span className={activeStep == 2 ? 'step_line_active' : activeStep > 2 ? 'step_line_completed' : 'step_line'}></span></div></div>




          <div id={5} className='flex_stepper'  >
            <div className={activeStep == 3 || activeStep == 4 && !responseSmsValid ? 'step_active' : activeStep < 3 ? 'step' : "step_completed"}>
              {activeStep < 4 || !responseSmsValid ? (<span className={activeStep > 4 ? 'circle_steps_completed' : "circle_steps"}>5</span>
              ) : <img src={check} alt='check' />}
            </div>
            <div>
              {/* <span className={activeStep === 3 ? 'step_line_active' : activeStep > 3 ? 'step_line_completed' : 'step_line'}></span> */}
            </div></div>

        </div>
      </div>) : null}



      <div className='StepperDisplay'>
        <Fragment>
          {activeStep === 0 && <Address_point

            showInput={showInput}
            setShowInput={setShowInput}
            openMoreDetailsPopUp={openMoreDetailsPopUp}
            setOpenMoreDetailsPopUp={setOpenMoreDetailsPopUp}
            errorAutoComplet={errorAutoComplet}
            setErrorAutoComplet={setErrorAutoComplet}
            setDetailsOfPackage={setDetailsOfPackage}
            detailsOfPackage={detailsOfPackage} />}



          {activeStep === 1 || activeStep === 2 && getDataFromServer.isLoading !== false ? <SetDataToServer
            nameAndPhone={nameAndPhone}
            switchEditBtnSummary={switchEditBtnSummary}
            getDataFromServer={getDataFromServer}
            setGetDataFromServer={setGetDataFromServer}
            detailsOfPackage={detailsOfPackage}
            time={time}
            exitAddress={exitAddress}
            checkboxValue={checkboxValue}
            setCheckboxValue={setCheckboxValue} /> :




            activeStep === 2 && getDataFromServer.isLoading == false ? (<SliderPrice
              setGetDataFromServer={setGetDataFromServer}
              getDataFromServer={getDataFromServer}
              val={val}
              setVal={setVal}

            />) : null}



          {activeStep === 3 && <FullNameAndPhone
            selectNameAndPhone={setNameAndPhone}
            nameAndPhone={nameAndPhone}
            errorsPhoneName={errorsPhoneName}
            setErrorsPhoneName={setErrorsPhoneName}
          />}



          {activeStep === 4 && !responseSmsValid ? (
            <PopUpValidPhone
              responseSmsValid={responseSmsValid}
              setResponseSmsValid={setResponseSmsValid}
              getDataFromServer={getDataFromServer}
              switchEditBtnSummary={switchEditBtnSummary}
              nameAndPhone={nameAndPhone}
            />
          ) :

            activeStep === 4 && responseSmsValid ? (
              <Summary
                setResponseSmsValid={setResponseSmsValid}
                setIsUpdateServer={setIsUpdateServer}
                switchEditBtnSummary={switchEditBtnSummary}
                nameAndPhone={nameAndPhone}
                getDataFromServer={getDataFromServer}
                checkboxValue={checkboxValue}
                exitAddress={exitAddress}
                time={time}
                detailsOfPackage={detailsOfPackage} />

            ) : null}






          {activeStep === 5 && isUpdateServer ? (

            <ShipmentTracking

              responseGetById={responseGetById}
              setResponseGetById={setResponseGetById}
              detailsOfPackage={detailsOfPackage}
              setNameAndPhone={setNameAndPhone}
              setCheckboxValue={setCheckboxValue}
              checkboxValue={checkboxValue}
              setDetailsOfPackage={setDetailsOfPackage}
              setExitaddress={setExitaddress}
              setActiveStep={setActiveStep}
              getDataFromServer={getDataFromServer}
              setResponseSmsValid={setResponseSmsValid}
              setGetDataFromServer={setGetDataFromServer}
              nameAndPhone={nameAndPhone}
              setTime={setTime}
              time={time}
              setVal={setVal}

            />

          ) : null}


          {isLoading ? <Dialog open={isLoading}><Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}

          >
            <CircularProgress color="inherit" />
          </Backdrop></Dialog> : null}



          {getDataFromServer.isLoading == 'error' &&
            <Alert style={{width:"75%"}}  severity="error" color="error" sx={{
              '& .MuiAlert-icon': { margin: "auto", marginLeft: "15px", fontSize: "35px" },
              '& .MuiAlert-message': { margin: "auto", fontSize: "20px" }
            }} className="alert_delete">{t("ERROR_ALERT_SET_DATA")}</Alert>}

          {getDataFromServer.isLoading == true  ? (<Dialog open={getDataFromServer.isLoading == true}><Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={getDataFromServer.isLoading == true}

          >
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <CircularProgress color="inherit" />
            {loadingTakesTime && <div>{t("MSG_LOADING")}</div>}
            </div>
          </Backdrop></Dialog>) : null}



          {activeStep <= 4 && showBtnActionOrNot() ? (<div className='nextAndBackBtn'>
            <Box sx={{ display: 'flex', flexDirection: 'row', pb: 1.2, pt: 1.2, width: 545 }}>
              <Button style={{ margin: isMobile && '',marginRight: isMobile && "0px", width: "20%", height: heightResponsive(), borderRadius: "4px", borderColor: '#583DFF' }}
                variant="outlined"
                onClick={handleBack}
                sx={{ mr: 1 }}>
                <ArrowRightAltIcon className='ArrowEN' />
                {/* <img className='Arrow' style={{background: '#583DFF',transform: 'scaleX(-1)'}} src={Arrow} alt='Arrow'/> */}
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button variant="contained" style={{ width: "75%", height: heightResponsive(), background: '#583DFF', borderRadius: '4px' }}
                onClick={handleNext} sx={{ mr: 1 }}>
                {btnLabel()}
                <img className='Arrow' color='#583DFF' src={Arrow} alt='Arrow' />
              </Button>

            </Box>
          </div>) : null}
        </Fragment>

      </div>


    </Box>

  );
}


