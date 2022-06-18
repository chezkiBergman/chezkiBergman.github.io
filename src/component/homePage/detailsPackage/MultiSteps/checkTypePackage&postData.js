import { useTranslation } from "react-i18next";
import "./stepsNum/stepsNumCss/checkTypePackage&postData.css"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "react-responsive"
import _ from "lodash";
import { useState, useEffect } from "react";
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import RadioButtonUncheckedSharpIcon from '@mui/icons-material/RadioButtonUncheckedSharp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import { updateServer } from "./stepsNum/updateServer";

const url = `proj/pogo_connect/lw_pogo_connect/basic/server/web/tracks/post_new_track`


export default function SetDataToServer({ getDataFromServer, setGetDataFromServer,
  switchEditBtnSummary,
  checkboxValue, setCheckboxValue,
  exitAddress, time, detailsOfPackage, nameAndPhone }) {


  const { token } = useParams()
  const [response, setResponse] = useState(null)
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 650px)' })

  const arrayPickUpTime = time?.pickUpTime?.split("T")
  const arrayDdLine = time?.ddLine?.split("T")

  const start_time = [arrayPickUpTime[0], arrayPickUpTime[1]]?.join(" ")
  const end_time = [arrayDdLine[0], arrayDdLine[1]]?.join(" ")

  // 
  const { t, i18n } = useTranslation();
  // console.log(detailsOfPackage);
  const ordersAddress = detailsOfPackage.map((order, i) => {
    return {
      address: {

        lat: order.lat.toString(),
        lng: order.lng.toString(),
        cityName: order.cityName,
        streetName: order.streetName,
        streetNum: order.streetNum
      },
      order_price: order.payForStation,
      note: order.comment,
      contactName: order.contactName,
      contactPhone: order.contactPhone
    }
  })


  const data = {
    exit_address: {
      cityName: exitAddress?.cityName || "",
      streetName: exitAddress?.streetName || "",
      streetNum: exitAddress?.streetNum || "",
    },
    start_time: start_time,
    end_time: end_time,
    orders:

      ordersAddress,
    price: getDataFromServer.new_price ? getDataFromServer.new_price : "",
    currency_symbol: "₪",
    customer_name: nameAndPhone?.fullName,
    phone: nameAndPhone?.phoneNumber,
    erea_code: nameAndPhone?.erea_code,
    driver_app: "pogo connect",
    track_id: getDataFromServer?.track_id ? getDataFromServer.track_id : ""
  }




  useEffect(() => {


    switchUpdateOrNew()

  }, []);



  const fetchData = async () => {
    getDataFromServer.isLoading = "start"
    setGetDataFromServer({ ...getDataFromServer })


    try {

      const result = await axios.post(url, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
     
     
      if (result.status !== 200) {

        getDataFromServer.isLoading = 'error'
        setGetDataFromServer({ ...getDataFromServer })

        // clearTimeout(timer);
      }

      else {
        
        const getDataFromServer = {
          track_id: result.data.track_id,
          new_price: 250,
          price_min: Math.round(result.data.price_min * 1),
          track_minutes: result.data.track_minutes,
          track_distance: result.data.track_distance,
          count_orders: result.data.count_orders,
          currency_symbol: result.data.currency_symbol,
          isLoading: false
        }

        setGetDataFromServer({ ...getDataFromServer })

        // console.log(result);
      }

      

    } catch (error) {
      getDataFromServer.isLoading = 'error'
      setGetDataFromServer({ ...getDataFromServer })
    }
  };


  async function switchUpdateOrNew() {
    let cloneResultData;

    if (!getDataFromServer.track_id && !token) {

      cloneResultData = _.cloneDeep(data);

    }

    if (exitAddress && detailsOfPackage.length) {
      console.log(getDataFromServer.track_id);
      if (getDataFromServer.track_id || token) {

        if (cloneResultData !== data || token) {
          console.log('update');

          const result = await updateServer({
            nameAndPhone,
            checkboxValue, detailsOfPackage,
            getDataFromServer, setGetDataFromServer,
            exitAddress, time, token
          })
          console.log(result);
        } {
          console.log('return');
          return
        }

      } else {
        // console.log('new');
        fetchData()
      }
    }
  }




  const checkboxHandlerTruck = (e) => {

    e.target.checked ?
      checkboxValue.TruckChecked = '1'
      : checkboxValue.TruckChecked = '0'
    setCheckboxValue({ ...checkboxValue })

  }
  const checkboxHandlerMotorcycle = (e) => {
    e.target.checked ?
      checkboxValue.MotorcycleChecked = '1'
      : checkboxValue.MotorcycleChecked = '0'
    setCheckboxValue({ ...checkboxValue })
  }
  const checkboxHandlerCar = (e) => {
    e.target.checked ?
      checkboxValue.CarChecked = '1'
      : checkboxValue.CarChecked = '0'
    setCheckboxValue({ ...checkboxValue })
  }


  // console.log(checkboxValue.CarChecked);


  const styleLabelCheckBox = (check) => {

    if (check !== '1') {
      return {
        fontFamily: 'Heebo',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '17px',
        lineHeight: '25px',
        color: '#81838C'
      }

    } else {
      return {
        fontFamily: 'Heebo',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '17px',
        lineHeight: '25px',
        color: '#0D152E'
      }

    }
  }




  return (
    <div className="infoSteps">

      <div className="full_width_checkboxFlex">
        <div style={{
          marginBottom: "69px", paddingRight: !isTabletOrMobile && '1rem', display: 'flex',
          flexDirection: 'column',
          alignItems: isTabletOrMobile && 'center'
        }}>
          <h2 className="h1Step">{t('STEPS_NUM_2_TYPE_PACKAGE_HEADER_LINE_1')}</h2>
          <p className="pStep2" >{t("STEPS_NUM_2_TYPE_PACKAGE_HEADER_LINE_2")}</p>
        </div>
        <div>
          <FormGroup className="checkboxFlex">



            <FormControlLabel sx={{
              "& .MuiTypography-root": styleLabelCheckBox(checkboxValue.MotorcycleChecked)
            }}
              style={{ width: !isMobile && "33%", border: checkboxValue.MotorcycleChecked == '1' && '1px solid #583DFF' }}
              className="FormLabelCheckBox"
              control={<Checkbox
                icon={<CheckCircleIcon />}
                sx={{
                  "& .MuiSvgIcon-root": {
                    width: 20,
                    height: 20,
                    color: checkboxValue.MotorcycleChecked == '1' ? '#583DFF' : '#81838C',
                    borderRadius: 20,

                  }
                }}
                checkedIcon={<CheckCircleSharpIcon />}
                checked={checkboxValue.MotorcycleChecked == '1' && true}
                onChange={checkboxHandlerMotorcycle}
              />} label={t("STEPS_NUM_2_TYPE_PACKAGE_SELECT_1")} />



            <FormControlLabel sx={{
              "& .MuiTypography-root": styleLabelCheckBox(checkboxValue.CarChecked)
            }}
              className="FormLabelCheckBox"
              style={{ width: !isMobile && '27%', gap: isTabletOrMobile && "21px", border: checkboxValue.CarChecked == '1' && '1px solid #583DFF' }}
              control={<Checkbox
                icon={<CheckCircleIcon />}
                sx={{
                  "& .Mui-checked": {

                    color: '#583DFF',

                  }, "& .MuiSvgIcon-root": {
                    width: 20,
                    height: 20,
                    color: checkboxValue.CarChecked == '1' ? '#583DFF' : '#81838C',
                    borderRadius: 20,

                  }
                }}
                checkedIcon={<CheckCircleSharpIcon />}
                checked={checkboxValue.CarChecked == '1' && true}
                onChange={checkboxHandlerCar}
              />} label={t("STEPS_NUM_2_TYPE_PACKAGE_SELECT_2")} />



            <FormControlLabel sx={{
              "& .MuiTypography-root": styleLabelCheckBox(checkboxValue.TruckChecked)
            }} className="FormLabelCheckBox"
              style={{ border: checkboxValue.TruckChecked == '1' && '1px solid #583DFF' }}
              control={<Checkbox

                icon={<CheckCircleIcon />}
                sx={{
                  "& .Mui-checked": {

                    color: '#583DFF',

                  }, "& .MuiSvgIcon-root": {
                    width: 20,
                    height: 20,
                    color: checkboxValue.TruckChecked == '1' ? '#583DFF' : '#81838C',

                    borderRadius: 20,

                  }
                }}
                checkedIcon={<CheckCircleSharpIcon />}

                checked={checkboxValue.TruckChecked == '1' && true}


                onChange={checkboxHandlerTruck}


              />} label={t("STEPS_NUM_2_TYPE_PACKAGE_SELECT_3")} />
          </FormGroup>

        </div>
      </div>
    </div>

  )

}