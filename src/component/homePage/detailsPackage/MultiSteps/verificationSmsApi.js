import axios from "axios";


export async function verificationCheck({nameAndPhone,value}) {

// console.log(token);

    const url = `proj/pogo_connect/lw_pogo_connect/basic/server/web/tracks/is_valid_sms`

    // const fetchData = async () => {
      
           
        const data = {
            phone: nameAndPhone?.phoneNumber,
            code: value
        }

        try {

            const result = await axios.post(url, data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            });
            return result.data.status
           
            
          

        } catch (error) {
            console.log(error);
         
            // setIsError(true);
        }


}