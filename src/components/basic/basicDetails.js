import { useEffect, useState } from 'react';
import API from '@aws-amplify/api';
import Form from '../formUI/form';
import { _Basic } from '../formUI/formProps';
import { useDispatch,useSelector } from 'react-redux'
import { Grid } from '@mui/material';


let rating = {
    rating: "",
    ratingSource: ""
}
let basic = {
    providerName: "",
    language: "",
    rating: rating,
    lastUpdated: ""
}
const select_basic = (state) => state._basic;


function BasicDetails() {
    useEffect(()=>{
        debugger;
    callgetAPI();
  })
    const _basicInBD = useSelector(select_basic);
    const [_basic, setbasic] = useState(_basicInBD!=undefined?_basicInBD: basic);
    const dispatch = useDispatch()
    let tempbasic = _basic;
    const handleChange = (event) => {
        switch (event.target.name) {
            case "rating": setbasic({ ..._basic, rating: { ..._basic.rating, [event.target.name]: event.target.value } });
                tempbasic.rating[event.target.name] = event.target.value
                break;
            case "ratingSource": setbasic({ ..._basic, rating: {..._basic.rating, [event.target.name]: event.target.value } });
                tempbasic.rating[event.target.name] = event.target.value
                break;
            default: setbasic({ ..._basic, [event.target.name]: event.target.value });
                tempbasic[event.target.name] = event.target.value
                break;
        }
        dispatch({ type: '_basic/_basicChanged', payload: tempbasic })
    }
    const callpostAPI = async () => {
        const itemObject = _basic;
        let reqBody = {
            body: itemObject,
            isBase64Encoded: false
        }
        await API.post("jsonfile", "/create", reqBody).then((data) => {
            debugger;
        }).catch((error) => {
            console.log(`ERROR: ${error}`)
        })
    }
    const callgetAPI = async () => {
        
        await API.get("jsonfile", "/get").then((data) => {
            debugger;
        }).catch((error) => {
            console.log(`ERROR: ${error}`)
        })
    }
    return (
        <div className="Basic">
            <Grid item xs={10} md={8} lg={8}>
                <Form tabname="" formprops={_Basic} handleChange={(e) => handleChange(e)} />
                <button type='button' onClick={() => callpostAPI()}>Submit</button>
            </Grid>
            <Grid item xs={12} md={2} lg={2}>
                <p>{JSON.stringify(_basic)}</p>
            </Grid>

            {/* <form>
                <label>
                    providerName:
                    <input type="text" name="providerName" value={_basic.providerName} onChange={(e) => handleChange(e)} />
                </label>
                <label>
                    language:
                    <input type="text" name="language" value={_basic.language} onChange={(e) => handleChange(e)} />
                </label>
                <div>
                    <label>
                        rating:
                    </label>
                    <label>
                        rating:
                        <input type="text" name="rating" value={_basic.rating.rating} onChange={(e) => handleChange(e)} />
                    </label>
                    <label>
                        rating:
                        <input type="text" name="ratingSource" value={_basic.rating.ratingSource} onChange={(e) => handleChange(e)} />
                    </label>
                </div>

            </form> */}
        </div>
    );
}

export default BasicDetails;