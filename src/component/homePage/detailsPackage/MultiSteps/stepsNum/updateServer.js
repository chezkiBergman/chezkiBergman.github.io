
import axios from "axios";
;



export async function updateServer({ checkboxValue, detailsOfPackage, getDataFromServer, setGetDataFromServer, exitAddress
  , nameAndPhone, time, token }) {


  // console.log(nameAndPhone,getDataFromServer);

  const url = `proj/pogo_connect/lw_pogo_connect/basic/server/web/tracks/post_update_track`

  const arrayPickUpTime = time?.pickUpTime?.split("T")
  const arrayDdLine = time?.ddLine?.split("T")

  const start_time = [arrayPickUpTime[0], arrayPickUpTime[1]]?.join(" ")
  const end_time = [arrayDdLine[0], arrayDdLine[1]]?.join(" ")


  getDataFromServer.isLoading = "start"
  setGetDataFromServer({ ...getDataFromServer })
  const ordersAddress = detailsOfPackage?.map((order, i) => {
    return {
      address: {
        lat: order.lat,
        lng: order.lng,
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


  // const fetchData = async () => {
  //  console.log(getDataFromServer?.new_price)
  const data = {
    exit_address: {
      cityName: exitAddress?.cityName || "",
      streetName: exitAddress?.streetName || "",
      streetNum: exitAddress?.streetNum || "",
    },
    start_time: start_time,
    end_time: end_time,
    vehicles_car: checkboxValue ? checkboxValue?.CarChecked : "1",
    vehicles_truck: checkboxValue ? checkboxValue?.TruckChecked : "0",
    vehicles_motorcycle: checkboxValue ? checkboxValue?.TruckChecked : "0",
    orders:

      ordersAddress,

    price: getDataFromServer?.new_price,
    currency_symbol: getDataFromServer?.currency_symbol,
    customer_name: nameAndPhone ? nameAndPhone?.fullName : "",
    phone: nameAndPhone ? nameAndPhone?.phoneNumber : "",
    erea_code: nameAndPhone?.erea_code,
    driver_app: "pogo connect",
    track_id: getDataFromServer?.track_id ? getDataFromServer?.track_id : token ? token : null
  }

  try {
  

    const result = await axios.post(url, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    });
    console.log(result);
    // setResponseUpdate(result.data)
    const getDataFromServer = {
      track_id: result.data.track_id,
      new_price: result.data.price,
      price_min: Math.round(result.data.price_min),
      track_minutes: result.data.track_minutes,
      track_distance: result.data.track_distance,
      count_orders: result.data.count_orders,
      currency_symbol: result.data.currency_symbol,
      isLoading: false
    }
    setGetDataFromServer({ ...getDataFromServer })
    // console.log(getDataFromServer);
    return result.data.status

  } catch (error) {

  }
};


