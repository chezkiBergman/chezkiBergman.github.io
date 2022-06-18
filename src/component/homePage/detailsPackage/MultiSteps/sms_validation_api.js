
import axios from "axios";


export async function smsValidationApi({getDataFromServer, nameAndPhone, token,setResponseSmsValid }) {

// console.log(token);

    const url = `proj/pogo_connect/lw_pogo_connect/basic/server/web/tracks/post_sms_validation`

    
    // const fetchData = async () => {
      
           
        const data = {
            track_id: getDataFromServer.track_id ? getDataFromServer.track_id : token ,
            phone: nameAndPhone?.phoneNumber,
            customer_name: nameAndPhone?.fullName
        }

        try {

            const result = await axios.post(url, data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            });
            // console.log(result.data.status);
            return result.data.status
           
            
          

        } catch (error) {
            console.log(error);
         
            // setIsError(true);
        }


}